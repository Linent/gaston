import { useState } from "react";

import {
  Card,
  CardHeader,
  CardBody,
  Input,
  Button,
  Select,
  SelectItem,
} from "@nextui-org/react";

import { Link, PasswordInput } from "../../../components";

import { NavigateRoutes } from "../../../enums";

export const RegisterPage = () => {
  const [isVisible, setIsVisible] = useState(false);
  const toggleVisibility = () => setIsVisible(!isVisible);

  const [isLoading, setIsLoading] = useState(false);
  const handleButtonClick = () => {
    //const TipoDocumento = [{ value: "Cedula Civil" }];
    // Cambia el estado de isLoading a true
    setIsLoading(true);

    // Después de 3 segundos, realiza la redirección al dashboard
    setTimeout(() => {
      // Cambia el estado de isLoading a false antes de la redirección (puedes ajustar según tus necesidades)
      setIsLoading(false);

      // Realiza la redirección al dashboard
      //   router.push('/dashboard');
    }, 3000);
  };

  return (
    <div className="grid place-content-center min-h-screen">
      <Card className="w-[420px] md:w-[500px] p-5">
        <CardHeader>
          <h1 className="text-3xl font-bold text-center w-full">
            Registrar usuario
          </h1>
        </CardHeader>
        <CardBody>
          <form className="grid gap-4">
            <Input isRequired type="text" label="Nombre completo" />
            <Input isRequired label="Usuario" />
            <div className="flex max-md:flex-col gap-4">
              <Select label="Tipo de documento" className="md:max-w-[170px]">
                <SelectItem key="Cedula civil" value="Cedula Civil">
                  Cedula Civil
                </SelectItem>
              </Select>

              <Input
                isRequired
                type="text"
                inputMode="numeric"
                label="Documento de identidad"
              />
            </div>
            <PasswordInput
              label="Contraseña"
              isVisible={isVisible}
              toggleVisibility={toggleVisibility}
            />
            <PasswordInput
              label="Confirmar contraseña"
              isVisible={isVisible}
              toggleVisibility={toggleVisibility}
            />

            <Button type="submit" className="h-12">
              Acceder
            </Button>

            <div className="flex place-content-center gap-2">
              ¿Ya tienes una cuenta?{" "}
              <Link to={NavigateRoutes.LOGIN}>Iniciar sesión</Link>
            </div>
          </form>
        </CardBody>
      </Card>
    </div>
  );
};
