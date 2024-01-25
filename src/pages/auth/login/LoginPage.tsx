import { useState } from "react";

import { Link as Linking } from "react-router-dom";

import { useForm, SubmitHandler, RegisterOptions } from "react-hook-form";

import {
  Card,
  Button,
  Input,
  CardHeader,
  CardBody,
  Link,
} from "@nextui-org/react";

import { NavigateRoutes } from "../../../enums";
import { PasswordInput } from "../../../components";
import { regex } from "../../../constants";

enum FormKeys {
  EMAIL = "email",
  PASSWORD = "password",
}

type FormData = {
  [FormKeys.EMAIL]: string;
  [FormKeys.PASSWORD]: string;
};

interface Validator {
  [FormKeys.EMAIL]: RegisterOptions<FormData, FormKeys.EMAIL>;
  [FormKeys.PASSWORD]: RegisterOptions<FormData, FormKeys.PASSWORD>;
}

const validator: Validator = {
  [FormKeys.EMAIL]: {
    required: {message: 'El correo es obligatorio', value: true},
    pattern: {
      message: 'El correo no es válido',
      value: regex.email
    }
  },
  [FormKeys.PASSWORD]: {
    minLength: {
      message: 'Debe tener más de 8 caracteres',
      value: 8
    },
    maxLength: {
      message: 'Debe tener menos de 16 caracteres',
      value: 16
    },
    pattern: {
      message: 'Debe contener letras y símbolos',
      value: regex.password
    }
  },
};

interface Props {}

export const LoginPage: React.FC<Props> = () => {
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const toggleVisibility = () => setIsVisible(!isVisible);

  /*
  const [isLoading, setIsLoading] = useState(false);
  // const router = useRouter();

  const handleButtonClick = () => {
    // Cambia el estado de isLoading a true
    setIsLoading(true);

    // Después de 3 segundos, realiza la redirección al dashboard
    setTimeout(() => {
      // Cambia el estado de isLoading a false antes de la redirección (puedes ajustar según tus necesidades)
      setIsLoading(false);

      // Realiza la redirección al dashboard
      //   router.push('/dashboard');
    }, 3000);
  }; */

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    const { email, password } = data;
    const userData = {
      email: email.toLowerCase(),
      password,
    };
    console.log(userData)
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
              type="email"
              label="Correo"
              errorMessage={errors[FormKeys.EMAIL]?.message}
              {...register(FormKeys.EMAIL, validator[FormKeys.EMAIL])}
            />

            <PasswordInput
              label="Contraseña"
              isVisible={isVisible}
              toggleVisibility={toggleVisibility}
              errorMessage={errors[FormKeys.PASSWORD]?.message}
              {...register(FormKeys.PASSWORD, validator[FormKeys.PASSWORD])}
            />

            <Button type="submit" className="h-12">
              Acceder
            </Button>

            <div className="flex place-content-center gap-2">
              ¿No tienes una cuenta?{" "}
              <Link>
                <Linking to={NavigateRoutes.REGISTER}>Crea una</Linking>
              </Link>
            </div>
          </form>
        </CardBody>
      </Card>
    </div>
  );
};
