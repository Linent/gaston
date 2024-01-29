import {
  Button,
  Divider,
  Select,
  SelectItem,
  Spinner,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
  Tooltip,
  useDisclosure,
} from "@nextui-org/react";
import { CreateMovementsPage } from "./CreateMovementPage";
//import { useGetMovements } from "../../hooks";
import { Icon } from "@iconify/react";
import { Icons, NavigateRoutes } from "../../enums";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useGetReports } from "../../hooks";
import Datepicker, { DateValueType } from "react-tailwindcss-datepicker";
import toast from "react-hot-toast";

/*const {products,
  isLoading,
  error,
  getProducts } = useGetMovements();
*/
const columns = [
  {
    key: "id",
    label: "Número de factura",
  },
  {
    key: "productos",
    label: "productos",
  },
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

  const { movementReport, getMovementReport } = useGetReports();

  const [informType, setInformType] = useState<InformType | null>(null);

  const [generateInformIsClicked, setGenerateInformIsClicked] =
    useState<boolean>(false);

  const [date, setDate] = useState<DateValueType>({
    startDate: new Date(),
    endDate: new Date().setMonth(11).toString(),
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
    const {startDate,endDate } = date || {};
    
    switch (informType?.id) {
      case InformTypes.SALES_COST: {
        await getMovementReport(startDate,endDate );
        break;
      }
      case InformTypes.MOVEMENTS: {
        break;
      }
      case InformTypes.SALES: {
        break;
      }
      default: {
        setGenerateInformIsClicked(false);
        toast.error("No se ha seleccionado un tipo de informe");
      }
    }
  };

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
                  JSON.parse(movementReport.data)
                )}
              </>
            ) : null
          ) : null}

          {/*     <Table>
            <TableHeader>
              <TableColumn>Numero de Facturas</TableColumn>
              <TableColumn>Productos</TableColumn>
            </TableHeader>
            <TableBody>
              <TableRow key="1">
                <TableCell>#40042</TableCell>
                <TableCell>Pan de jamonn y queso </TableCell>
              </TableRow>
              <TableRow key="2">
                <TableCell> </TableCell>
                <TableCell>Pan de cascarita</TableCell>
              </TableRow>
              <TableRow key="2">
                <TableCell> </TableCell>
                <TableCell>Pan de dulce</TableCell>
              </TableRow>
            </TableBody>
          </Table> */}
        </div>
      </div>
    </div>
  );
};
