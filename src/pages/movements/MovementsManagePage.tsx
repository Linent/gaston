import { Button, Divider, useDisclosure } from "@nextui-org/react";
import { useNavigate } from "react-router-dom";
import { NavigateRoutes } from "../../enums";

export const MovementsManagePage: React.FC = () => {

  const navigate = useNavigate();

  const handleNavigateCreateMovements = () =>
    navigate(NavigateRoutes.CREATE_MOVEMENT);

  return (
    <>
      <div className="p-4">
        <Button onPress={handleNavigateCreateMovements}>
          Crear movimiento
        </Button>
        <Divider className="mt-4" />
        <div className="p-10">
          <h1>Todos los movimientos</h1>
        </div>
        {/* <div>
        <Table aria-label="Example static collection table">
          <TableHeader columns={columns}>
            {(column) => (
              <TableColumn key={column.key}>{column.label}</TableColumn>
            )}
          </TableHeader>
          <TableBody items={data}>
            {(item) => (
              <TableRow key={item.id}>
                {(columnKey) => (
                  <TableCell>{renderCell(item, columnKey)}</TableCell>
                )}
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div> */}
      </div>
    </>
  );
};
