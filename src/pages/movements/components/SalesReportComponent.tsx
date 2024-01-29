import React from "react";
import { SalesReport } from "../../../interfaces";
import {
  Spinner,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
  getKeyValue,
} from "@nextui-org/react";

const columns = [
  {
    key: "nombre",
    label: "Nombre del producto",
  },
  {
    key: "cantidad",
    label: "Cantidad",
  },
  {
    key: "precioVentaPromedio",
    label: "Precio de venta promedio",
  },
  {
    key: "totalVenta",
    label: "Total de venta",
  },
];

interface Props {
  salesReport: {
    data: SalesReport | null;
    error: string | null;
    isLoading: boolean;
  };
}

export const SalesReportComponent: React.FC<Props> = ({ salesReport }) => {
  const { data, error, isLoading } = salesReport;

  if (isLoading)
    return (
      <div className="w-full h-full grid place-items-center">
        <Spinner />
      </div>
    );
  if (error) return <p>Ha ocurrido un error</p>;

  const { productosVendidos, totalIngresos, totalProductosVendidos } = data!;

  const saleKeys = Object.keys(productosVendidos!) || [];

  const salesInfo = saleKeys.map((nombre) => ({
    ...productosVendidos[nombre],
    nombre,
  }));

  return (
    <div>
      <Table>
        <TableHeader columns={columns}>
          {(column) => (
            <TableColumn key={column.key}>{column.label}</TableColumn>
          )}
        </TableHeader>
        <TableBody emptyContent={"Productos no encontrados"} items={salesInfo}>
          {(item) => (
            <TableRow key={Math.random()}>
              {(columnKey) => (
                <TableCell>{getKeyValue(item, columnKey)}</TableCell>
              )}
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};
