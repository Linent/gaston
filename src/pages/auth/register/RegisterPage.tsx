import { useState } from "react";
import { Input, Button, Select, SelectItem } from "@nextui-org/react";

export const RegisterPage = () => {
  const [isVisible, setIsVisible] = useState(false);

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
    <div className="w-full flex flex-col gap-4">
      <div>
        <h1>Registrar usuario</h1>
      </div>
      <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
        <Input
          isRequired
          size={"sm"}
          type="text"
          inputMode="text"
          label="Usuario"
        />
      </div>
      <div className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4">
        <Input isRequired size={"sm"} type="text" label="Nombre completo" />
      </div>

      <div>
        <Select
          size={"sm"}
          label="Seleccione un tipo de documento"
          className="max-w-xs"
        >
          <SelectItem key="Cedula civil" value="Cedula Civil">
            Cedula Civil
          </SelectItem>
        </Select>
      </div>
      <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
        <Input
          isRequired
          type="text"
          inputMode="numeric"
          label="Documento de identidad"
        />
      </div>
      <div className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4">
        <Input
          size={"sm"}
          isRequired
          label="Contraseña"
          variant="bordered"
          type={isVisible ? "text" : "password"}
          className="max-w-xs"
        />
      </div>
      <div className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4">
        <Input
          size={"sm"}
          isRequired
          label="Confirmar Contraseña"
          variant="bordered"
          type={isVisible ? "text" : "password"}
          className="max-w-xs"
        />
      </div>
      <div>
        <Button
          id="login"
          color="default"
          onClick={handleButtonClick}
          isLoading={isLoading}
        >
          Acceder
        </Button>
      </div>
    </div>
  );
};
