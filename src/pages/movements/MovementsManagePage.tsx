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
import { useGetReports } from "../../hooks";
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

export const MovementsManagePage: React.FC = () => {
  const navigate = useNavigate();
  
  const handleNavigateCreateMovements = () =>
    navigate(NavigateRoutes.CREATE_MOVEMENT);

  const { movementReport, salesCostReport, salesReport } = useGetReports();

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
          </Table>
        </div>
      </div>
    </div>
  );
};
