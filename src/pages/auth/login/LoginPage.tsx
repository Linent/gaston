import { useState } from "react";

import { useForm, SubmitHandler, RegisterOptions } from "react-hook-form";

import { Card, Button, Input, CardHeader, CardBody } from "@nextui-org/react";

import { NavigateRoutes, StorageKeys } from "../../../enums";
import { Link, PasswordInput } from "../../../components";
import { regex } from "../../../constants";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { generalService } from "../../../services";

enum FormKeys {
  USUARIO = "usuario",
  PASSWORD = "password",
}

type FormData = {
  [FormKeys.USUARIO]: string;
  [FormKeys.PASSWORD]: string;
};

interface Validator {
  [FormKeys.USUARIO]: RegisterOptions<FormData, FormKeys.USUARIO>;
  [FormKeys.PASSWORD]: RegisterOptions<FormData, FormKeys.PASSWORD>;
}

const validator: Validator = {
  [FormKeys.USUARIO]: {
    required: { message: "El usuario es obligatorio", value: true },
  },
  [FormKeys.PASSWORD]: {
    minLength: {
      message: "Debe tener más de 3 caracteres",
      value: 3,
    },
    maxLength: {
      message: "Debe tener menos de 16 caracteres",
      value: 16,
    },
    pattern: {
      message: "Debe contener letras y símbolos",
      value: regex.password,
    },
  },
};

interface Props {}

export const LoginPage: React.FC<Props> = () => {
  const navigate = useNavigate();

  const [isVisible, setIsVisible] = useState<boolean>(false);
  const toggleVisibility = () => setIsVisible(!isVisible);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    try {
      const response: any = await generalService.login(data);
      const {token} = response?.data;
      toast.success('Sesión iniciada correctamente')
      localStorage.setItem(StorageKeys.TOKEN, token);
      navigate(NavigateRoutes.DASHBOARD);
    } catch (error: any) {
      toast.error(error?.message ?? 'Ha ocurrido un error');
    }
  };

  return (
    <div className="grid place-content-center h-screen">
      <Card className="w-[420px] p-5">
        <CardHeader>
          <h1 className="text-3xl font-bold text-center w-full">Bienvenido</h1>
        </CardHeader>
        <CardBody>
          <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4">
            <Input
              isRequired
              label="Usuario"
              errorMessage={errors[FormKeys.USUARIO]?.message}
              {...register(FormKeys.USUARIO, validator[FormKeys.USUARIO])}
            />

            <PasswordInput
              label="Contraseña"
              isVisible={isVisible}
              toggleVisibility={toggleVisibility}
              errorMessage={errors[FormKeys.PASSWORD]?.message}
              register={register(
                FormKeys.PASSWORD,
                validator[FormKeys.PASSWORD]
              )}
            />

            <Button type="submit" className="h-12">
              Acceder
            </Button>

            <div className="flex place-content-center gap-2">
              ¿No tienes una cuenta?{" "}
              <Link to={NavigateRoutes.REGISTER}>Crea una</Link>
            </div>
          </form>
        </CardBody>
      </Card>
    </div>
  );
};
