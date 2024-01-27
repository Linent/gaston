import React from "react";
import { useForm, SubmitHandler, RegisterOptions } from "react-hook-form";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Input,
  Select,
  SelectItem,
  Textarea,
} from "@nextui-org/react";
import toast from "react-hot-toast";

import { generalService } from "../../../services";
import { useGetCategories } from "../../../hooks";
import { CreateProductData } from "../../../interfaces";

interface Props {
  isOpen: boolean;
  onOpenChange: () => void;
  getProducts: () => void;
}

enum FormKeys {
  DESCRIPCION = "descripcion",
  NOMBRE = "nombre",
  PRECIO = "precio",
  CATEGORIA_ID = "categoriaId",
  CANTIDAD_INICIAL = "cantidadInicial",
  COSTO_UNITARIO = "costoUnitario",
  COSTO_TOTAL = "costoTotal",
}

type FormData = {
  [FormKeys.DESCRIPCION]?: string;
  [FormKeys.NOMBRE]?: string;
  [FormKeys.PRECIO]?: number;
  [FormKeys.CATEGORIA_ID]?: number;
  [FormKeys.CANTIDAD_INICIAL]?: number;
  [FormKeys.COSTO_UNITARIO]?: number | null;
  [FormKeys.COSTO_TOTAL]?: number | null;
};

interface Validator {
  [FormKeys.DESCRIPCION]?: RegisterOptions<FormData, FormKeys.DESCRIPCION>;
  [FormKeys.NOMBRE]?: RegisterOptions<FormData, FormKeys.NOMBRE>;
  [FormKeys.PRECIO]?: RegisterOptions<FormData, FormKeys.PRECIO>;
  [FormKeys.CATEGORIA_ID]?: RegisterOptions<FormData, FormKeys.CATEGORIA_ID>;
  [FormKeys.CANTIDAD_INICIAL]?: RegisterOptions<
    FormData,
    FormKeys.CANTIDAD_INICIAL
  >;
  [FormKeys.COSTO_UNITARIO]?: RegisterOptions<
    FormData,
    FormKeys.COSTO_UNITARIO
  >;
  [FormKeys.COSTO_TOTAL]?: RegisterOptions<FormData, FormKeys.COSTO_TOTAL>;
}

const validator: Validator = {
  [FormKeys.DESCRIPCION]: {
    required: { message: "La descripción es obligatoria", value: true },
  },
  [FormKeys.NOMBRE]: {
    required: { message: "El nombre es obligatorio", value: true },
  },
  [FormKeys.PRECIO]: {
    required: { message: "El precio de venta es obligatorio", value: true },
    min: { message: "El precio de venta debe ser mayor a 0", value: 0 },
  },
  [FormKeys.CATEGORIA_ID]: {
    required: { message: "La categoría es obligatoria", value: true },
  },
  [FormKeys.CANTIDAD_INICIAL]: {
    required: { message: "La cantidad inicial es obligatoria", value: true },
    min: {
      message: "La cantidad inicial debe ser mayor o igual a 0",
      value: 0,
    },
  },
  [FormKeys.COSTO_UNITARIO]: {
    min: {
      message: "El costo unitario debe ser mayor o igual a 0",
      value: 0,
    },
  },
  [FormKeys.COSTO_TOTAL]: {
    min: {
      message: "La costo total debe ser mayor o igual a 0",
      value: 0,
    },
  },
};

export const CreateProductModal: React.FC<Props> = ({
  isOpen,
  onOpenChange,
  getProducts,
}) => {


  const {categories} = useGetCategories()



  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    const { categoriaId, cantidadInicial, precio, costoTotal, costoUnitario } =
      data;
    data[FormKeys.CATEGORIA_ID] = +categoriaId!;
    data[FormKeys.CANTIDAD_INICIAL] = +cantidadInicial!;
    data[FormKeys.PRECIO] = +precio!;

    if ([costoTotal, costoUnitario].every((e) => !e)) {
      return toast.error("Llena al menos un costo");
    }

    data[FormKeys.COSTO_UNITARIO] = costoUnitario ? +costoUnitario! : null;
    data[FormKeys.COSTO_TOTAL] = costoTotal ? +costoTotal! : null;

    try {
      await generalService.createProduct(
        data as CreateProductData
      );
      onOpenChange();
      getProducts();
      toast.success("Producto creado con exito");
    } catch (error: any) {
      console.log(error);
      toast.error("Ha ocurrido un error, revisa los campos");
    }
  };

  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">
              Crear Producto
            </ModalHeader>
            <ModalBody>
              <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4">
                <Input
                  isRequired
                  label="Nombre"
                  errorMessage={errors[FormKeys.NOMBRE]?.message}
                  {...register(FormKeys.NOMBRE, validator[FormKeys.NOMBRE])}
                />

                <Select
                  label="Categoría"
                  errorMessage={errors[FormKeys.CATEGORIA_ID]?.message}
                  {...register(
                    FormKeys.CATEGORIA_ID,
                    validator[FormKeys.CATEGORIA_ID]
                  )}
                >
                  {categories.map((category) => (
                    <SelectItem key={category.id} value={category.id}>
                      {category.nombre}
                    </SelectItem>
                  ))}
                </Select>
                <div className="flex gap-4">
                  <Input
                    isRequired
                    type="number"
                    label="Precio de venta"
                    errorMessage={errors[FormKeys.PRECIO]?.message}
                    startContent={
                      <div className="pointer-events-none flex items-center">
                        <span className="text-default-400 text-small">$</span>
                      </div>
                    }
                    {...register(FormKeys.PRECIO, validator[FormKeys.PRECIO])}
                  />

                  <Input
                    isRequired
                    type="number"
                    label="Cantidad Inicial"
                    errorMessage={errors[FormKeys.CANTIDAD_INICIAL]?.message}
                    {...register(
                      FormKeys.CANTIDAD_INICIAL,
                      validator[FormKeys.CANTIDAD_INICIAL]
                    )}
                  />
                </div>

                <div className="flex gap-4">
                  <Input
                    type="number"
                    label="Costo unitario"
                    description="Llena al menos un costo"
                    errorMessage={errors[FormKeys.COSTO_UNITARIO]?.message}
                    startContent={
                      <div className="pointer-events-none flex items-center">
                        <span className="text-default-400 text-small">$</span>
                      </div>
                    }
                    {...register(
                      FormKeys.COSTO_UNITARIO,
                      validator[FormKeys.COSTO_UNITARIO]
                    )}
                  />

                  <Input
                    type="number"
                    label="Costo total"
                    errorMessage={errors[FormKeys.COSTO_TOTAL]?.message}
                    startContent={
                      <div className="pointer-events-none flex items-center">
                        <span className="text-default-400 text-small">$</span>
                      </div>
                    }
                    {...register(
                      FormKeys.COSTO_TOTAL,
                      validator[FormKeys.COSTO_TOTAL]
                    )}
                  />
                </div>

                <Textarea
                  isRequired
                  label="Descripción"
                  errorMessage={errors[FormKeys.DESCRIPCION]?.message}
                  {...register(
                    FormKeys.DESCRIPCION,
                    validator[FormKeys.DESCRIPCION]
                  )}
                />
              </form>
            </ModalBody>
            <ModalFooter>
              <Button color="danger" variant="light" onPress={onClose}>
                Cancelar
              </Button>
              <Button color="success" onPress={() => handleSubmit(onSubmit)()}>
                Crear
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};
