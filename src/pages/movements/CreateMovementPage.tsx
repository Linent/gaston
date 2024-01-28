import {
  Button,
  Divider,
  Input,
  Pagination,
  Select,
  SelectItem,
  SortDescriptor,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
  getKeyValue,
  useDisclosure,
} from "@nextui-org/react";
import { useGetMovementTypes, useGetProducts } from "../../hooks";
import { useCallback, useMemo, useState } from "react";
import { IMovementType, IProduct } from "../../interfaces";
import { Icon } from "@iconify/react";
import { Icons } from "../../enums";
import CreateMovementsModal from "./components/CreateMovementsModal";

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
  // {
  // key: "id",
  //   label: "Acciones",
  // },
];

export const CreateMovementsPage: React.FC = () => {
  const { isOpen, onClose, onOpen } = useDisclosure();

  const { movementTypes } = useGetMovementTypes();
  const { products, getProducts } = useGetProducts();

  const [selectedMovementType, setSelectedMovementType] =
    useState<IMovementType | null>(null);

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

    /*     if (statusFilter !== "all" && Array.from(statusFilter).length) {
      filteredProducts = filteredProducts.filter((product) =>
        Array.from(statusFilter).includes(product.status),
      );
    } */

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

  const handleSelectMovementType = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const value = +e.target.value;
    const selectedMovementType = movementTypes.find(({ id }) => id === value);
    setSelectedMovementType(selectedMovementType!);
  };

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

  const isContinueDisabled = !selectedMovementType || !selectedKeys.size;

  const topContent = useMemo(() => {
    return (
      <div className="flex flex-col gap-4">
        <div className="flex justify-between gap-3 items-end">
          <Input
            isClearable
            className="w-full sm:max-w-[44%]"
            placeholder="Buscar por nombre..."
            startContent={<Icon icon={Icons.SEARCH} />}
            value={filterValue}
            onClear={() => onClear()}
            onValueChange={onSearchChange}
          />

          <Select
            onChange={handleSelectMovementType}
            className="w-48"
            label="Tipo de movimiento"
          >
            {movementTypes.map((e) => (
              <SelectItem key={e.id} value={e.id}>
                {e.nombre}
              </SelectItem>
            ))}
          </Select>
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

  const selectedProducts = useCallback(
    () =>
      selectedKeys === "all"
        ? products
        : selectedKeys.size
        ? products.filter((item) => selectedKeys.has(item.id.toString()))
        : [],
    [products, selectedKeys]
  );

  const continueMovement = () => {
    onOpen();
  };

  const handleOnClose = (success?: boolean) => {
    onClose();
    if (success) {
      getProducts();
      setSelectedKeys(new Set());
    }
  };

  return (
    <div className="py-4 px-4 md:px-8 lg:px-16">
      <div className="py-4 ">
        <h1>Crear movimiento</h1>
      </div>
      <div>
        <Table
          aria-label="Example table with custom cells, pagination and sorting"
          isHeaderSticky
          bottomContent={bottomContent}
          bottomContentPlacement="outside"
          classNames={{
            wrapper: "max-h-[382px]",
          }}
          selectedKeys={selectedKeys}
          selectionMode="multiple"
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
                  <TableCell>{getKeyValue(item, columnKey)}</TableCell>
                )}
              </TableRow>
            )}
          </TableBody>
        </Table>
        <Divider className="mb-2" />
        <div className="flex justify-between items-center gap-4">
          <p className="text-foreground-400">
            {isContinueDisabled
              ? " Debes seleccionar el tipo de movimiento y los productos para continuar"
              : null}
          </p>
          <Button
            isDisabled={isContinueDisabled}
            onClick={continueMovement}
            color="success"
            size="md"
          >
            Continuar
          </Button>
        </div>
      </div>
      <CreateMovementsModal
        isOpen={isOpen}
        onClose={handleOnClose}
        movementType={selectedMovementType}
        products={selectedProducts()}
      />
    </div>
  );
};
