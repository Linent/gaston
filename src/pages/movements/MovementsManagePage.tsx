import { Button, Divider, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow, Tooltip, useDisclosure } from "@nextui-org/react";
import { CreateMovementsModal } from "./components";
//import { useGetMovements } from "../../hooks";
import { Icon } from "@iconify/react";
import { Icons } from "../../enums";
import React from "react";
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
  }
];
const movimientos = [
  {
    "cantidad": 10,
    "costoTotal": 15000.0,
    "costoUnitario":null,
    "productoId": 1
  },
  {
    "cantidad": 5,
    "costoTotal": null,
    "costoUnitario": 1500.0,
    "productoId": 2
  }
]


export const MovementsManagePage: React.FC = () => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <div>
    <div >

    </div>
    <Table>
      <TableHeader>
        <TableColumn>NAME</TableColumn>
        <TableColumn>ROLE</TableColumn>
        <TableColumn>STATUS</TableColumn>
      </TableHeader>
      <TableBody>
        <TableRow key="1">
          <TableCell>Tony Reichert</TableCell>
          <TableCell>CEO</TableCell>
          <TableCell>Active</TableCell>
        </TableRow>
        <TableRow key="2">
          <TableCell>Zoey Lang</TableCell>
          <TableCell>Technical Lead</TableCell>
          <TableCell>Paused</TableCell>
        </TableRow>
        <TableRow key="3">
          <TableCell>Jane Fisher</TableCell>
          <TableCell>Senior Developer</TableCell>
          <TableCell>Active</TableCell>
        </TableRow>
        <TableRow key="4">
          <TableCell>William Howard</TableCell>
          <TableCell>Community Manager</TableCell>
          <TableCell>Vacation</TableCell>
        </TableRow>
      </TableBody>
    </Table>
    </div>
  );
};
