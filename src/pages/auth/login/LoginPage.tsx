import { useState } from "react";

import { Link as Linking } from "react-router-dom";

import {
  Card,
  Button,
  Input,
  CardHeader,
  CardBody,
  Link,
} from "@nextui-org/react";
import { FaEye, FaEyeSlash } from "react-icons/fa";

import { NavigateRoutes } from "../../../enums";

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

  return (
    <div className="grid place-content-center h-screen">
      <Card className="w-[420px] p-5">
        <CardHeader>
          <h1 className="text-3xl font-bold text-center w-full">Bienvenido</h1>
        </CardHeader>
        <CardBody>
          <form className="grid gap-4">
            <Input isRequired type="email" label="Email" />
            <Input
              label="Password"
              isRequired
              endContent={
                <button
                  className="focus:outline-none self-center"
                  type="button"
                  onClick={toggleVisibility}
                >
                  {isVisible ? (
                    <FaEyeSlash className="text-xl text-default-400 pointer-events-none" />
                  ) : (
                    <FaEye className="text-xl text-default-400 pointer-events-none" />
                  )}
                </button>
              }
              type={isVisible ? "text" : "password"}
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