import React, { useCallback, useMemo, useState } from "react";
import {
  Table,
  TableHeader,
  TableBody,
  TableColumn,
  TableRow,
  TableCell,
  useDisclosure,
  Divider,
  Button,
  Tooltip,
  SortDescriptor,
  Pagination,
} from "@nextui-org/react";

import { CreateProductModal, SearchProduct } from "./components";
import { IProduct } from "../../interfaces";
import { useGetProducts } from "../../hooks";
import { Icon } from "@iconify/react";
import { Icons } from "../../enums";
import { ConfirmModal } from "../../components";
import toast from "react-hot-toast";
import { generalService } from "../../services";

const columns = [
  {
    key: "nombre",
    label: "Nombre del producto",
  },
  {
    key: "descripcion",
    label: "Descripción",
  },
  {
    key: "existencias",
    label: "Cantidad disponibles",
  },
  {
    key: "precio",
    label: "Precio",
  },
  {
    key: "id",
    label: "Acciones",
  },
];

export const ProductsManagePage: React.FC = () => {
  const {
    isOpen: isOpenCreateModal,
    onOpen: onOpenCreateModal,
    onOpenChange: onOpenChangeCreateModal,
  } = useDisclosure();

  const {
    isOpen: isOpenDeleteConfirm,
    onClose: onCloseDeleteConfirm,
    onOpen: onOpenDeleteConfirm,
  } = useDisclosure();

  const [isEditing, setIsEditing] = useState<boolean>(false);

  const { products, isLoading, error, getProducts } = useGetProducts();

  const [currentProduct, setCurrentProduct] = useState<IProduct | null>(null);

  const [filterValue, setFilterValue] = useState("");

  const [selectedKeys, setSelectedKeys] = useState<any>(new Set([]));

  const [statusFilter, setStatusFilter] = useState<any>("all");

  const [page, setPage] = useState(1);

  const [rowsPerPage, setRowsPerPage] = useState(5);

  const hasSearchFilter = Boolean(filterValue);

  const [sortDescriptor, setSortDescriptor] = useState<SortDescriptor>({
    column: "name",
    direction: "ascending",
  });

  const filteredItems = useMemo(() => {
    let filteredProducts = [...products];

    if (hasSearchFilter) {
      filteredProducts = filteredProducts.filter((product) =>
        product.nombre.toLowerCase().includes(filterValue.toLowerCase())
      );
    }

    return filteredProducts;
  }, [products, filterValue]);

  const pages = Math.ceil(filteredItems.length / rowsPerPage);

  const onNextPage = useCallback(() => {
    if (page < pages) {
      setPage(page + 1);
    }
  }, [page, pages]);

  const onPreviousPage = useCallback(() => {
    if (page > 1) {
      setPage(page - 1);
    }
  }, [page]);

  const onSearchChange = useCallback((value?: string) => {
    if (value) {
      setFilterValue(value);
      setPage(1);
    } else {
      setFilterValue("");
    }
  }, []);

  const onClear = useCallback(() => {
    setFilterValue("");
    setPage(1);
  }, []);

  const onRowsPerPageChange = useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      setRowsPerPage(Number(e.target.value));
      setPage(1);
    },
    []
  );

  const items = useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    return filteredItems.slice(start, end);
  }, [page, filteredItems, rowsPerPage]);

  const sortedItems = useMemo(() => {
    return [...items].sort((a: IProduct, b: IProduct) => {
      const first = a[sortDescriptor.column as keyof IProduct] as number;
      const second = b[sortDescriptor.column as keyof IProduct] as number;
      const cmp = first < second ? -1 : first > second ? 1 : 0;

      return sortDescriptor.direction === "descending" ? -cmp : cmp;
    });
  }, [sortDescriptor, items]);

  const handleDeleteProduct = async () => {
    onCloseDeleteConfirm();
    const toastId = "deleteLoading";
    try {
      toast.loading(`Eliminando producto "${currentProduct?.nombre}"`, {
        id: toastId,
      });
      const a = await generalService.deleteProduct(currentProduct!.id);
      console.log({ a });
      toast.success("Producto eliminado con éxito");
      getProducts();
    } catch (error: any) {
      toast.error(error?.message || "Ha ocurrido un error");
    }
    toast.remove(toastId);
    setCurrentProduct(null);
  };

  const topContent = useMemo(() => {
    return (
      <div className="flex flex-col gap-4">
        <div className="flex justify-between gap-3 items-center">
          <SearchProduct
            value={filterValue}
            onClear={() => onClear()}
            onValueChange={onSearchChange}
          />
          <Button onPress={onOpenCreateModal}>Crear producto</Button>
        </div>
        <Divider />
        <div className="flex justify-between items-center">
          <span className="text-default-400 text-small">
            {products.length} productos en total
          </span>
          <label className="flex items-center text-default-400 text-small">
            Filas por página:
            <select
              className="bg-transparent outline-none text-default-400 text-small"
              onChange={onRowsPerPageChange}
            >
              <option value="5">5</option>
              <option value="10">10</option>
              <option value="15">15</option>
            </select>
          </label>
        </div>
      </div>
    );
  }, [
    filterValue,
    statusFilter,
    onSearchChange,
    onRowsPerPageChange,
    products.length,
    hasSearchFilter,
  ]);

  const bottomContent = useMemo(() => {
    return (
      <div className="py-2 px-2 flex justify-between items-center">
        <span className="w-[30%] text-small text-default-400">
          {selectedKeys === "all"
            ? "Todos los productos seleccionados"
            : `${selectedKeys.size} de ${filteredItems.length} seleccionados`}
        </span>
        <Pagination
          isCompact
          showControls
          showShadow
          color="primary"
          page={page}
          total={pages}
          onChange={setPage}
        />
        <div className="hidden sm:flex w-[30%] justify-end gap-2">
          <Button
            isDisabled={pages === 1}
            size="sm"
            variant="flat"
            onPress={onPreviousPage}
          >
            Anterior
          </Button>
          <Button
            isDisabled={pages === 1}
            size="sm"
            variant="flat"
            onPress={onNextPage}
          >
            Siguiente
          </Button>
        </div>
      </div>
    );
  }, [selectedKeys, items.length, page, pages, hasSearchFilter]);

  const renderCell = React.useCallback((product: any, columnKey: any) => {
    const cellValue = product[columnKey];
    switch (columnKey) {
      case "id":
        return (
          <div className="relative flex items-center justify-end gap-2">
            {/*         
    <Tooltip content="Details">
              <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                <Icon icon={Icons.SHOW} />
              </span>
            </Tooltip>
            <Tooltip
              content="Editar producto"
              onClick={() => {
                setCurrentProduct(product);
                onOpenCreateModal();
                setIsEditing(true);
              }}
            >
              <span
                className="text-lg text-default-400 cursor-pointer active:opacity-50"
                onClick={() => {
                  setCurrentProduct(product);
                  onOpenCreateModal();
                  setIsEditing(true);
                }}
              >
                <Icon icon={Icons.EDIT} />
              </span>
            </Tooltip> 
            */}
            <Tooltip
              color="danger"
              content="Eliminar producto"
              className="cursor-pointer"
              onClick={() => {
                setCurrentProduct(product);
                onOpenDeleteConfirm();
              }}
            >
              <span
                className="cursor-pointer"
                onClick={() => {
                  setCurrentProduct(product);
                  onOpenDeleteConfirm();
                }}
              >
                <Icon
                  icon={Icons.DELETE}
                  className="text-lg text-danger cursor-pointer active:opacity-50"
                />
              </span>
            </Tooltip>
          </div>
        );
      default:
        return cellValue;
    }
  }, []);

  return (
    <>
      <CreateProductModal
        isOpen={isOpenCreateModal}
        onOpenChange={() => {
          setIsEditing(false);
          onOpenChangeCreateModal();
        }}
        getProducts={getProducts}
        product={currentProduct}
        isEditing={isEditing}
      />
      <ConfirmModal
        isOpen={isOpenDeleteConfirm}
        onClose={() => {
          setCurrentProduct(null);
          onCloseDeleteConfirm();
        }}
        onConfirm={handleDeleteProduct}
        title="¿Estás seguro de borrar el producto?"
        description="No podrás deshacer esta acción"
      />
      <div className="p-4">
        <div>
          <Table
            aria-label="Example table with custom cells, pagination and sorting"
            isHeaderSticky
            bottomContent={bottomContent}
            bottomContentPlacement="outside"
            classNames={{
              wrapper: "max-h-[382px]",
            }}
            sortDescriptor={sortDescriptor}
            topContent={topContent}
            topContentPlacement="outside"
            onSelectionChange={setSelectedKeys}
            onSortChange={setSortDescriptor}
          >
            <TableHeader columns={columns}>
              {(column) => (
                <TableColumn key={column.key}>{column.label}</TableColumn>
              )}
            </TableHeader>
            <TableBody
              emptyContent={"Productos no encontrados"}
              items={sortedItems}
            >
              {(item) => (
                <TableRow key={item.id}>
                  {(columnKey) => (
                    <TableCell>{renderCell(item, columnKey)}</TableCell>
                  )}
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>
    </>
  );
};
