import {
  Button,
  Divider,
  Input,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Select,
  SelectItem,
  Spinner,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
  Textarea,
} from "@nextui-org/react";
import { Icons, NavigateRoutes } from "../../../enums";
import React, { useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";
import Datepicker, { DateValueType } from "react-tailwindcss-datepicker";
import toast from "react-hot-toast";
import { IMovementsInform } from "../../../interfaces";
import dayjs from "dayjs";

const columns = [
  {
    key: "id",
    label: "# Factura",
  },
  {
    key: "tipoMovimiento",
    label: "Tipo de movimiento",
  },
  { key: "fecha", label: "Fecha" },
  {
    key: "product",
    label: "Producto",
  },
  { key: "cantidad", label: "Cantidad" },
  { key: "costoUnitario", label: "Costo unitario" },
  { key: "costoTotal", label: "Costo total" },
];

interface Props {
  movementReport: {
    data: IMovementsInform[];
    isLoading: boolean;
    error: string | null;
  };
}

export const MovementReport: React.FC<Props> = ({ movementReport }) => {
  const { data, error, isLoading } = movementReport;

  if (isLoading)
    return (
      <div className="w-full h-full grid place-items-center">
        <Spinner />
      </div>
    );
  if (error) return <p>Ha ocurrido un error</p>;

  const renderCell = useCallback((movement: any, columnKey: any) => {
    const cellValue = movement[columnKey];

    const { producto, tipoMovimiento } = movement as IMovementsInform;

    const nombreTipoMovimiento = tipoMovimiento.nombre;

    switch (columnKey) {
      case "tipoMovimiento":
        return (
          <span
            className={`capitalize ${
              nombreTipoMovimiento.toUpperCase() === "VENTA"
                ? "text-success"
                : nombreTipoMovimiento.toUpperCase() === "COMPRA"
                ? "text-danger"
                : ""
            }`}
          >
            {tipoMovimiento.nombre}
          </span>
        );
      case "fecha":
        return dayjs(cellValue).format("DD/MM/YYYY hh:mm A");
      case "product":
        return (
          <Popover showArrow offset={10} placement="bottom" backdrop={"opaque"}>
            <PopoverTrigger>
              <Button variant="flat" className="capitalize">
                {producto.nombre}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[240px]">
              {(titleProps) => (
                <div className="px-1 py-2 w-full">
                  <p
                    className="text-small font-bold text-foreground capitalize"
                    {...titleProps}
                  >
                    {producto.nombre}
                  </p>
                  <div className="mt-2 flex flex-col gap-2 w-full">
                    <Input
                      isDisabled
                      label="Categoria"
                      size="sm"
                      value={"" + producto.categoria.nombre}
                    />
                    <Input
                      isDisabled
                      label="Precio"
                      size="sm"
                      value={"" + producto.precio}
                      startContent="$"
                    />
                    <Textarea
                      isDisabled
                      label="Descripción"
                      value={producto.descripcion}
                      size="sm"
                    />
                  </div>
                </div>
              )}
            </PopoverContent>
          </Popover>
        );
      default:
        return cellValue;
    }
  }, []);

  return (
    <Table>
      <TableHeader columns={columns}>
        {(column) => <TableColumn key={column.key}>{column.label}</TableColumn>}
      </TableHeader>
      <TableBody emptyContent={"Productos no encontrados"} items={data}>
        {(item) => (
          <TableRow key={item.id}>
            {(columnKey) => (
              <TableCell>{renderCell(item, columnKey)}</TableCell>
            )}
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
};
