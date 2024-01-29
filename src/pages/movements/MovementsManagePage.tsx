import {
  Button,
  Divider,
  Select,
  SelectItem,
  Spinner,
  useDisclosure,
} from "@nextui-org/react";
import { Icons, NavigateRoutes } from "../../enums";
import React, { useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useGetReports } from "../../hooks";
import Datepicker, { DateValueType } from "react-tailwindcss-datepicker";
import toast from "react-hot-toast";
import { CostReportComponent, MovementReport } from "./components";
import { IProduct } from "../../interfaces";
import { ModalSelectProduct } from "./components/ModalSelectProduct";

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
    label: "Reporte ventas por producto",
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

  const { isOpen, onOpenChange, onOpen, onClose } = useDisclosure();

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

  const [currentProduct, setCurrentProduct] = useState<IProduct | null>(null);

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
        await getSalesCostReport(currentProduct?.id!);
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
      <ModalSelectProduct
        onClose={onClose}
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        setCurrentProduct={setCurrentProduct}
      />
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

          {[InformTypes.SALES, InformTypes.MOVEMENTS].includes(
            informType?.id!
          ) ? (
            <div className="w-72">
              <Datepicker
                primaryColor={"fuchsia"}
                value={date}
                onChange={handleValueChange}
                showShortcuts={true}
                maxDate={new Date()}
              />
            </div>
          ) : null}

          {informType?.id === InformTypes.SALES_COST ? (
            <Button onClick={onOpen}>Seleccionar Producto</Button>
          ) : null}

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

            {informType?.id === InformTypes.SALES_COST &&
            currentProduct?.nombre ? (
              <span className="capitalize">: {currentProduct?.nombre}</span>
            ) : null}
          </h1>
        </div>
        <div className="py-4">
          {generateInformIsClicked ? (
            informType?.id === InformTypes.MOVEMENTS ? (
              <MovementReport movementReport={movementReport} />
            ) : informType?.id === InformTypes.SALES_COST ? (
              <CostReportComponent salesCostReport={salesCostReport} />
            ) : null
          ) : null}
        </div>
      </div>
    </div>
  );
};
