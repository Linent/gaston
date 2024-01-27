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
} from "@nextui-org/react";
import { CreateProductData, productService } from "../../../services";
import { ICategory } from "../../../interfaces";
import toast from "react-hot-toast";
import { CATEGORIES } from "../../../constants";

interface Props {
  isOpen: boolean;
  onOpenChange: () => void;
}

enum FormKeys {
  DESCRIPCION = "descripcion",
  NOMBRE = "nombre",
  PRECIO = "precio",
  EXISTENCIAS = "existencias",
  CATEGORIA_ID = "categoriaId",
  CANTIDAD_INICIAL = "cantidadInicial",
}

type FormData = {
  [FormKeys.DESCRIPCION]?: string;
  [FormKeys.NOMBRE]?: string;
  [FormKeys.PRECIO]?: number;
  [FormKeys.EXISTENCIAS]?: number;
  [FormKeys.CATEGORIA_ID]?: number;
  [FormKeys.CANTIDAD_INICIAL]?: number;
};

interface Validator {
  [FormKeys.DESCRIPCION]?: RegisterOptions<FormData, FormKeys.DESCRIPCION>;
  [FormKeys.NOMBRE]?: RegisterOptions<FormData, FormKeys.NOMBRE>;
  [FormKeys.PRECIO]?: RegisterOptions<FormData, FormKeys.PRECIO>;
  [FormKeys.EXISTENCIAS]?: RegisterOptions<FormData, FormKeys.EXISTENCIAS>;
  [FormKeys.CATEGORIA_ID]?: RegisterOptions<FormData, FormKeys.CATEGORIA_ID>;
  [FormKeys.CANTIDAD_INICIAL]?: RegisterOptions<
    FormData,
    FormKeys.CANTIDAD_INICIAL
  >;
}

const validator: Validator = {
  [FormKeys.DESCRIPCION]: {
    required: { message: "La descripción es obligatoria", value: true },
  },
  [FormKeys.NOMBRE]: {
    required: { message: "El nombre es obligatorio", value: true },
  },
  [FormKeys.PRECIO]: {
    required: { message: "El precio es obligatorio", value: true },
    min: { message: "El precio debe ser mayor a 0", value: 0 },
  },
  [FormKeys.EXISTENCIAS]: {
    required: { message: "Las existencias son obligatorias", value: true },
    min: { message: "Las existencias deben ser al menos 0", value: 0 },
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
};

export const CreateProductModal: React.FC<Props> = ({
  isOpen,
  onOpenChange,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    const { categoriaId, cantidadInicial, existencias, precio } = data;
    data[FormKeys.CATEGORIA_ID] = +categoriaId!;
    data[FormKeys.CANTIDAD_INICIAL] = +cantidadInicial!;
    data[FormKeys.EXISTENCIAS] = +existencias!;
    data[FormKeys.PRECIO] = +precio!;
    try {
      const response = await productService.createProduct(
        data as CreateProductData
      );
      console.log(response);
      onOpenChange();
      toast.success("Producto creado con exito");
    } catch (error: any) {
      console.log(error);
      toast.error(error?.message ?? "Ha ocurrido un error");
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

                <div className="flex gap-4">
                  <Select
                    label="Categoría"
                    errorMessage={errors[FormKeys.CATEGORIA_ID]?.message}
                    {...register(
                      FormKeys.CATEGORIA_ID,
                      validator[FormKeys.CATEGORIA_ID]
                    )}
                  >
                    {CATEGORIES.map((category) => (
                      <SelectItem key={category.id} value={category.id}>
                        {category.nombre}
                      </SelectItem>
                    ))}
                  </Select>

                  <Input
                    isRequired
                    type="number"
                    label="Precio"
                    errorMessage={errors[FormKeys.PRECIO]?.message}
                    startContent={
                      <div className="pointer-events-none flex items-center">
                        <span className="text-default-400 text-small">$</span>
                      </div>
                    }
                    {...register(FormKeys.PRECIO, validator[FormKeys.PRECIO])}
                  />
                </div>

                <Input
                  isRequired
                  label="Descripción"
                  errorMessage={errors[FormKeys.DESCRIPCION]?.message}
                  {...register(
                    FormKeys.DESCRIPCION,
                    validator[FormKeys.DESCRIPCION]
                  )}
                />

                <div className="flex gap-4">
                  <Input
                    isRequired
                    type="number"
                    label="Existencias"
                    errorMessage={errors[FormKeys.EXISTENCIAS]?.message}
                    {...register(
                      FormKeys.EXISTENCIAS,
                      validator[FormKeys.EXISTENCIAS]
                    )}
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
