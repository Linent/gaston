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
      <div className="grid sm:grid-cols-2 pb-6">
        <p
          className={`text-xl font-semibold ${
            totalIngresos > 0
              ? "text-green-500"
              : totalIngresos < 0
              ? "text-red-500"
              : null
          }`}
        >
          Total de ingresos: ${totalIngresos}
        </p>
        <p className="text-xl font-semibold">
          Total de productos vendidos: {totalProductosVendidos}
        </p>
      </div>
      <Table>
        <TableHeader columns={columns}>
          {(column) => (
            <TableColumn key={column.key}>{column.label}</TableColumn>
          )}
        </TableHeader>
        <TableBody emptyContent={"No hay ventas"} items={salesInfo}>
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
