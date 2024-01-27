import { Button, Divider, useDisclosure } from "@nextui-org/react";
import { CreateMovementsModal } from "./components";

export const MovementsManagePage: React.FC = () => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <>
      <CreateMovementsModal isOpen={isOpen} onOpenChange={onOpenChange} />
      <div className="p-4">
        <Button onPress={onOpen}>Crear movimiento</Button>
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
