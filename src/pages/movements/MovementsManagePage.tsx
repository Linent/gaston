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
    key: "productoId",
    label: "Numero de productos",
    
  },
  {
    key: "cantidad",
    label: "cantidad",
  },
  {
    key:'costoTotal',
    label: 'costo Total'
  },
  {
    key:'costoUnitario',
    label: 'Costo Unitario',
  }
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
  })

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
                  JSON.stringify(movementReport.data)
                )}
              </>
            ) : null
          ) : null}

          {/*     <Table>
            <TableHeader>
            
            {columns.map((column) => (
              <TableColumn key={column.key}>
                {column.label}
                </TableColumn>
            ))}
  
            </TableHeader>
            <TableBody>
              <TableRow >
                <TableCell>
                a
                  </TableCell>
                  <TableCell>
                a
                  </TableCell>
                  <TableCell>
                a
                  </TableCell>
                  <TableCell>
                a
                  </TableCell>
                </TableRow>
            </TableBody>
          </Table> */}
        </div>
      </div>
    </div>
  );
};
