import React from "react";
import { IMovementType } from "../../../interfaces";

interface Props {
  isOpen: boolean;
  onOpenChange: () => void;
  getProducts: () => void;
  movementType: IMovementType;
}

const CreateMovementsModal: React.FC<Props> = ({ movementType }) => {
  if (!movementType) return null;

  return <div>CreateMovementsModal</div>;
};

export default CreateMovementsModal;
