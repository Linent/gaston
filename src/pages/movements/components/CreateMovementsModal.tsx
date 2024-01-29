import React, { Fragment, useCallback, useEffect, useState } from "react";
import { IMovementType, IProduct } from "../../../interfaces";
import {
  Button,
  Divider,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@nextui-org/react";
import { generalService } from "../../../services";
import toast from "react-hot-toast";

interface Props {
  isOpen: boolean;
  onClose: (success?: boolean) => void;
  movementType: IMovementType | null;
  products: IProduct[];
}

interface ModifiedProduct extends IProduct {
  cantidad: string;
}

const CreateMovementsModal: React.FC<Props> = ({
  isOpen,
  movementType,
  products,
  onClose,
}) => {
  const [productsData, setProductsData] = useState<ModifiedProduct[]>([]);

  const [successRegistered, setSuccessRegistered] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const newData: any = products.map((e) => ({ ...e, cantidad: 0 }));
    setProductsData(newData);
  }, [products]);

  const hasProductWithQuantityZero = productsData.some(
    (e: any) => e.cantidad === 0
  );

  const registerMovements = async () => {
    setIsLoading(true);
    const movimientos: any = productsData.map(({ precio, cantidad, id }) => ({
      costoUnitario: precio,
      productoId: id,
      costoTotal: null,
      cantidad,
    }));
    try {
      await generalService.createMovements({
        movimientos,
        tipoMovimientoId: movementType?.id!,
      });
      setSuccessRegistered(true);
      toast.success(`${movementType?.nombre} creado con exito`);
    } catch (error: any) {
      toast.error(error?.message);
      console.log(error);
    }
    setIsLoading(false);
  };

  const renderItem = (product: ModifiedProduct, index: number) => {
    const {
      id,
      nombre,
      existencias,
      cantidad,
      precio,
      costoUnitario,
      costoTotal,
    } = product;

    const handleChangeQuantity = (e: React.ChangeEvent<HTMLInputElement>) => {
      const newQuantity = +e.target.value;
      const newData: any = productsData.map((state) =>
        state.id === id ? { ...state, cantidad: newQuantity } : state
      );
      setProductsData(newData);
    };

    return (
      /*    <div className="flex items-center gap-4"> */
      <Fragment key={id}>
        <div className="col-span-2">{nombre}</div>
        <div>$ {precio}</div>
        {successRegistered ? (
          <div>{cantidad}</div>
        ) : (
          <Input
            onChange={handleChangeQuantity}
            type="number"
            value={cantidad}
            min={0}
            max={existencias}
            labelPlacement="outside"
            className="w-16"
            classNames={{
              inputWrapper: "p-0",
              input: "text-center",
            }}
            description={`Max: ${existencias}`}
          />
        )}

        <div>$ {precio * +cantidad}</div>
      </Fragment>
    );
  };

  const total = useCallback(() => {
    return productsData.reduce(
      (acc, product: any) => (acc += product.cantidad * product.precio),
      0
    );
  }, [productsData]);

  if (!movementType) return null;

  return (
    <Modal
      size={"4xl"}
      isOpen={isOpen}
      onClose={() => {
        onClose(successRegistered);
        setSuccessRegistered(false);
      }}
    >
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader
              className={`flex flex-col gap-1 text-2xl ${
                successRegistered ? "text-success" : ""
              }`}
            >
              Registro de {movementType.nombre}
            </ModalHeader>
            <ModalBody>
              <div className="grid grid-cols-5 gap-y-2 gap-x-4">
                <p className="font-bold col-span-2">Nombre</p>
                <p className="font-bold">Precio</p>
                <p className="font-bold">Cantidad</p>
                <p className="font-bold">Totales</p>
              </div>
              <Divider />
              <div className="grid grid-cols-5 gap-y-2 gap-x-4">
                {productsData.map(renderItem)}
              </div>
              <Divider />
              <div className="grid grid-cols-5 gap-y-2 gap-x-4">
                <span className="col-span-2" />
                <span />
                <span className="font-bold text-xl">Total:</span>
                <span className="font-bold text-xl">$ {total()}</span>
              </div>
            </ModalBody>
            <ModalFooter>
              <Button color="danger" variant="light" onPress={onClose}>
                Cerrar
              </Button>
              <Button
                isDisabled={
                  hasProductWithQuantityZero || isLoading || successRegistered
                }
                onClick={registerMovements}
                color="success"
              >
                Crear Movimiento
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};

export default CreateMovementsModal;
