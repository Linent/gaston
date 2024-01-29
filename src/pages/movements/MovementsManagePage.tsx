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
import { Icons, NavigateRoutes } from "../../enums";
import React, { useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useGetReports } from "../../hooks";
import Datepicker, { DateValueType } from "react-tailwindcss-datepicker";
import toast from "react-hot-toast";
import { IMovementsInform } from "../../interfaces";
import dayjs from "dayjs";

const columns = [
  {
    key: "id",
    label: "# Factura",
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
const movimientos = [
  {
    cantidad: 10,
    costoTotal: 15000.0,
    costoUnitario: null,
    productoId: 1,
  },
  {
    cantidad: 5,
    costoTotal: null,
    costoUnitario: 1500.0,
    productoId: 2,
  },
];

enum InformTypes {
  SALES_COST = "salesCost",
  MOVEMENTS = "movements",
  SALES = "sales",
}

interface InformType {
  id: InformTypes;
  label: string;
}

const informTypes: InformType[] = [
  {
    id: InformTypes.SALES_COST,
    label: "Reporte ventas por costo",
  },
  {
    id: InformTypes.MOVEMENTS,
    label: "Reporte de movimientos",
  },
  {
    id: InformTypes.SALES,
    label: "Reporte de ventas",
  },
];

export const MovementsManagePage: React.FC = () => {
  const navigate = useNavigate();

  const handleNavigateCreateMovements = () =>
    navigate(NavigateRoutes.CREATE_MOVEMENT);

  const {
    movementReport,
    salesCostReport,
    salesReport,
    getMovementReport,
    getSalesReport,
    getSalesCostReport,
  } = useGetReports();

  console.log({
    movementReport: movementReport.data,
    salesCostReport: salesCostReport.data,
    salesReport: salesReport.data,
  });

  const [informType, setInformType] = useState<InformType | null>(null);

  const [generateInformIsClicked, setGenerateInformIsClicked] =
    useState<boolean>(false);

  const [date, setDate] = useState<DateValueType>({
    startDate: null,
    endDate: null,
  });

  const handleValueChange = (
    newValue: DateValueType,
    e?: HTMLInputElement | null
  ) => {
    console.log("newValue:", newValue);
    setDate(newValue);
  };

  const handleSelectInformTypes = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    const selectedInformType = informTypes.find(({ id }) => id === value);
    setInformType(selectedInformType!);
    setGenerateInformIsClicked(false);
  };

  const isGenerateInformDisabled = !informType;

  const handleGenerateInform = async () => {
    setGenerateInformIsClicked(true);

    const startDate = new Date(date?.startDate!).toDateString();
    const endDate = new Date(date?.endDate!).toDateString();

    switch (informType?.id) {
      case InformTypes.SALES_COST: {
        await getSalesCostReport();
        break;
      }
      case InformTypes.MOVEMENTS: {
        await getMovementReport(startDate, endDate);
        break;
      }
      case InformTypes.SALES: {
        await getSalesReport(startDate, endDate);

        break;
      }
      default: {
        setGenerateInformIsClicked(false);
        toast.error("No se ha seleccionado un tipo de informe");
      }
    }
  };

  const renderCell = useCallback((movement: any, columnKey: any) => {
    const cellValue = movement[columnKey];

    const { producto } = movement as IMovementsInform;

    switch (columnKey) {
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
    <div>
      <div className="p-4">
        <Button onPress={handleNavigateCreateMovements}>
          Crear movimiento
        </Button>
        <Divider className="my-4" />

        <div className="flex gap-2 items-center">
          <Select
            onChange={handleSelectInformTypes}
            className="w-72"
            size="sm"
            label="Tipo de informe"
          >
            {informTypes.map((e) => (
              <SelectItem key={e.id} value={e.id}>
                {e.label}
              </SelectItem>
            ))}
          </Select>

          <div className="w-72">
            <Datepicker
              primaryColor={"fuchsia"}
              value={date}
              onChange={handleValueChange}
              showShortcuts={true}
              maxDate={new Date()}
            />
          </div>

          <Button
            isDisabled={isGenerateInformDisabled}
            color="success"
            onPress={handleGenerateInform}
          >
            Generar Informe
          </Button>
        </div>

        <div className="py-4">
          <h1 className="text-3xl font-bold tracking-tight text-white-900">
            {informType?.label}
          </h1>
        </div>
        <div className="py-4">
          {generateInformIsClicked ? (
            informType?.id === InformTypes.MOVEMENTS ? (
              <>
                {movementReport.isLoading ? (
                  <Spinner />
                ) : movementReport.error ? (
                  <p>error</p>
                ) : (
                  <Table>
                    <TableHeader columns={columns}>
                      {(column) => (
                        <TableColumn key={column.key}>
                          {column.label}
                        </TableColumn>
                      )}
                    </TableHeader>
                    <TableBody
                      emptyContent={"Productos no encontrados"}
                      items={movementReport.data}
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
                )}
              </>
            ) : null
          ) : null}
        </div>
      </div>
    </div>
  );
};
