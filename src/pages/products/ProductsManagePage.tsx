import React from "react";
import {
  Table,
  TableHeader,
  TableBody,
  TableColumn,
  TableRow,
  TableCell,
  getKeyValue,
} from "@nextui-org/react";

const columns = [
  {
    key: "nombre",
    label: "Nombre del producto",
  },
  {
    key: "existencias",
    label: "Cantidad",
  },
  {
    key: "precio",
    label: "precio",
  },
  {
    key: "existencias",
    
    label: "Existencias"
  }
];
interface ProductoProps {
  id: number;
  descripcion: string;
  nombre: string;
  precio: number;
  existencias: number;
  categoriaId: number;
  cantidadInicial: number;
  costoUnitario: null;
  costoTotal: null;
}
const Producto: React.FC<ProductoProps> = ({ nombre, precio, existencias }) => (
  <TableRow>
    <TableCell>{nombre}</TableCell>
    <TableCell>${precio}</TableCell>
    <TableCell>{existencias}</TableCell>
  </TableRow>
);
const data: ProductoProps[] = [
  {
    id: 6,
    nombre: "Producto 1",
    descripcion: "Descripcion 1",
    precio: 1000,
    existencias: 10,
    categoriaId: 1,
    cantidadInicial: 10,
    costoUnitario: null,
    costoTotal: null,
  },
  {
    id: 9,
    nombre: "pan",
    descripcion: "Descripcion 2",
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
    descripcion: "toratatatat",
    precio: 25000,
    existencias: 1,
    categoriaId: 3,
    cantidadInicial: 1,
    costoUnitario: null,
    costoTotal: null,
  },
];

export const ProductsManagePage: React.FC = () => {
  return (
    <div>
      <h1>ProductsPage</h1>
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
  );
};
