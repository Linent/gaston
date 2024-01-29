import React from "react";
import { CostReport } from "../../../interfaces";
import { Spinner } from "@nextui-org/react";

interface Props {
  salesCostReport: {
    data: CostReport | null;
    error: string | null;
    isLoading: boolean;
  };
}

export const CostReportComponent: React.FC<Props> = ({ salesCostReport }) => {
  const { data, error, isLoading } = salesCostReport;

  if (isLoading)
    return (
      <div className="w-full h-full grid place-items-center">
        <Spinner />
      </div>
    );
  if (error) return <p>Ha ocurrido un error</p>;

  const { totalCostos, productosVendidos, totalVentas, totalGanancias } = data!;

  const saleProducts = Object.values(productosVendidos!);

  const {
    cantidad,
    costoPromedio,
    ganancia,
    precioVentaPromedio,
    totalCosto,
    totalVenta,
  }: any = saleProducts[0] ?? {};

  return (
    <div className="grid grid-cols-2">
      {saleProducts[0] ? (
        <div>
          <h2 className="text-2xl font-bold">Ventas:</h2>
          <ol>
            <li className="flex gap-2">
              <span>Cantidad:</span>
              <span>{cantidad}</span>
            </li>
            <li className="flex gap-2">
              <span>Total venta:</span>
              <span>{totalVenta}</span>
            </li>
            <li className="flex gap-2">
              <span>Precio venta promedio:</span>
              <span>{precioVentaPromedio}</span>
            </li>
            <li className="flex gap-2">
              <span>Costo promedio:</span>
              <span>{costoPromedio}</span>
            </li>
            <li className="flex gap-2">
              <span>Ganancia:</span>
              <span>{ganancia}</span>
            </li>
            <li className="flex gap-2">
              <span>Total costo:</span>
              <span>{totalCosto}</span>
            </li>
            <li className="flex gap-2">
              <span>Total venta:</span>
              <span>{totalVenta}</span>
            </li>
          </ol>
        </div>
      ) : null}

      <div>
        <h2 className="text-2xl font-bold">Totales:</h2>
        <li className="flex gap-2">
          <span>Total costos:</span>
          <span>{totalCostos}</span>
        </li>
        <li className="flex gap-2">
          <span>Total ventas:</span>
          <span>{totalVentas}</span>
        </li>
        <li className="flex gap-2">
          <span>Total ganancias:</span>
          <span>{totalGanancias}</span>
        </li>
      </div>
    </div>
  );
};
