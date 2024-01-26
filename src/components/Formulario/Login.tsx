import { Input } from "@nextui-org/react";
import * as React from "react";

import { Button } from "@nextui-org/react";
import { Link } from "react-router-dom";
//import { NavigateRoutes } from "../../enums";
//import { useRouter } from 'next/router';

interface Props {
  
}

export const Login: React.FC<Props> = ({}) => {
  const sizes = ["sm", "md", "lg"];
  const [isVisible, setIsVisible] = React.useState(false);

  const [isLoading, setIsLoading] = React.useState(false);
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
  };
  return (
    <div className="w-full flex flex-col gap-4">
        <div><h1>Bienvenido</h1></div>
        <div className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4">
          <Input isRequired
          size={"sm"} type="email" label="Email" />
        </div>

        <div>
          <Input
          isRequired
            label="Password"
            variant="bordered"
            type={isVisible ? "text" : "password"}
            className="max-w-xs"
          />
        </div>
        <div>
        <Button id ="login" color="default" onClick={handleButtonClick} isLoading={isLoading}>
        Acceder
      </Button> 
        </div>
        
    </div>
  );
};
