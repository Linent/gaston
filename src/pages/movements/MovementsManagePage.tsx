import {
  Button,
  Divider,
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
import React from "react";
import { useNavigate } from "react-router-dom";
import { useGetMovements } from "../../hooks";
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

export const MovementsManagePage: React.FC = () => {
  const navigate = useNavigate();

  const handleNavigateCreateMovements = () =>
    navigate(NavigateRoutes.CREATE_MOVEMENT);

  const { movementReport, salesCostReport, salesReport } = useGetMovements();

  return (
    <div>
      <div className="p-4">
        <Button onPress={handleNavigateCreateMovements}>
          Crear movimiento
        </Button>
        <Divider className="mt-4" />
        <div className="p-4">
          <h1 className="text-3xl font-bold tracking-tight text-white-900">
            Lista de movimientos
          </h1>
        </div>
        <div className="p-10">
          <Table>
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
                <TableCell></TableCell>
                <TableCell>Pan de cascarita</TableCell>
              </TableRow>
              <TableRow key="2">
                <TableCell></TableCell>
                <TableCell>Pan de dulce</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
};
