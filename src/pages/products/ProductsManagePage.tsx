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

import { CreateProductModal,EditIcon,DeleteIcon, EyeIcon } from "./components";
import { IProduct } from "../../interfaces";

const columns = [
  {
    key: "nombre",
    label: "Nombre del producto",
  },
  {
    key:'descripcion',
    label:'Descripción'
  }
  ,
  {
    key: "existencias",
    label: "Cantidad disponibles",
  },
  {
    key: "precio",
    label: "Precio",
  },
  {
    key: "ACTIONS", 
    label: "actions"
  },
];

const Producto: React.FC<IProduct> = ({
  nombre,
  precio,
  existencias,
  descripcion,
}) => (
  <TableRow>
    <TableCell>{nombre}</TableCell>
    <TableCell>{descripcion}</TableCell>
    <TableCell>{precio}</TableCell>
    <TableCell>{existencias}</TableCell>
    <TableCell className="relative flex items-center gap-2">
            <Tooltip content="Details">
              <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                <EyeIcon />
              </span>
            </Tooltip>
            <Tooltip content="Edit user">
              <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                <EditIcon />
              </span>
            </Tooltip>
            <Tooltip color="danger" content="Delete user">
              <span className="text-lg text-danger cursor-pointer active:opacity-50">
                <DeleteIcon />
              </span>
            </Tooltip>
    </TableCell>
  </TableRow>
);
const data: IProduct[] = [
  {
    id: 6,
    nombre: "Pan de jamon y queso",
    descripcion: "Pan casero de jamon y queso",
    precio: 1000,
    existencias: 10,
    categoriaId: 1,
    cantidadInicial: 10,
    costoUnitario: null,
    costoTotal: null,
  },
  {
    id: 9,
    nombre: "pan de cascarita",
    descripcion: "El mejor pán de cascarita",
    precio: 300,
    existencias: 23,
    categoriaId: 1,
    cantidadInicial: 30,
    costoUnitario: null,
    costoTotal: null,
  },
  {
    id: 10,
    nombre: "torta",
    descripcion: "Exquisita torta de tres leches",
    precio: 25000,
    existencias: 1,
    categoriaId: 3,
    cantidadInicial: 1,
    costoUnitario: null,
    costoTotal: null,
  },
];

export const ProductsManagePage: React.FC = () => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

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
            <TableBody>
              {data.map((row) => (
                <TableRow key={row.id}>
                  {(columnKey) => (
                    <TableCell>{getKeyValue(row, columnKey)}</TableCell>
                  )}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </>
  );
};
