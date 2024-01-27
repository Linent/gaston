import React from "react";
import {
  Table,
  TableHeader,
  TableBody,
  TableColumn,
  TableRow,
  TableCell,
  getKeyValue,
  useDisclosure,
  Divider,
  Button,
  Tooltip,
} from "@nextui-org/react";

import { CreateProductModal } from "./components";
import { IProduct } from "../../interfaces";
import { useGetProducts } from "../../hooks";
import { Icon } from "@iconify/react";
import { Icons } from "../../enums";

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
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const { products, isLoading, error } = useGetProducts();

  const renderCell = React.useCallback((product: any, columnKey: any) => {
    const cellValue = product[columnKey];
    switch (columnKey) {
      case "id":
        return (
          <div className="relative flex items-center gap-2">
            <Tooltip content="Details">
              <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                <Icon icon={Icons.SHOW} />
              </span>
            </Tooltip>
            <Tooltip content="Edit user">
              <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                <Icon icon={Icons.EDIT} />
              </span>
            </Tooltip>
            <Tooltip color="danger" content="Delete user">
              <span>
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
      <CreateProductModal isOpen={isOpen} onOpenChange={onOpenChange} />
      <div className="p-4">
        <Button onPress={onOpen}>Crear producto</Button>
        <Divider className="mt-4" />
        <div className="p-10">
          <h1>Todos los producto</h1>
        </div>
        <div>
          <Table aria-label="Example static collection table">
            <TableHeader columns={columns}>
              {(column) => (
                <TableColumn key={column.key}>{column.label}</TableColumn>
              )}
            </TableHeader>
            <TableBody items={products}>
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
