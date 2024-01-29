import { Button, Card, CardFooter, CardHeader, Image } from "@nextui-org/react";
import React from "react";
import { NavigateRoutes } from "../enums";
import { Link } from "react-router-dom";

export const Dashboard: React.FC = () => {
  return (
    <div className="p-10">
      <div className="flex flex-col">
        <h1 className="text-3xl font-bold tracking-tight text-white-900">
          Bienvenido a Panaderia Emmanuel
        </h1>
        <div className="flex flex-col">
          <p className="text-md">tu panaderia de confianza</p>
        </div>
      </div>
      <div className="p-4">
        <div className="items-center w-[100%] gap-2 grid grid-cols-12 grid-rows-2 px-8">
         
          <Card className="col-span-12 sm:col-span-4 h-[300px]">
            <Link to={NavigateRoutes.MANAGE_PRODUCTS}>
              <CardHeader className="absolute z-10 top-1 flex-col !items-start">
                <p className="text-tiny text-white/60 uppercase font-bold">
                  Productos
                </p>
                <h4 className="text-white font-medium text-large">
                  Ver todos los productos
                </h4>
              </CardHeader>
              <Image
                isZoomed
                removeWrapper
                alt="Card background"
                className="z-0 w-full h-[300px] object-cover"
                src="https://img.freepik.com/foto-gratis/dos-barras-pan-leche-vaso-viejo-piso-madera_1150-20369.jpg?w=900&t=st=1706487841~exp=1706488441~hmac=a064d5db0eabbfb468b24f01ac358655d3705d1cbcc6518c09052556cb5c6f9c"
              />
            </Link>
          </Card>

          <Card className="col-span-12 sm:col-span-4 h-[300px]">
            <Link to={NavigateRoutes.CREATE_MOVEMENT}>
              <CardHeader className="absolute z-10 top-1 flex-col !items-start">
                <p className="text-tiny text-white/60 uppercase font-bold">
                  Movimientos
                </p>
                <h4 className="text-white font-medium text-large">
                  Ver todos los movimientos
                </h4>
              </CardHeader>
              <Image
                isZoomed
                removeWrapper
                alt="Card background"
                className="z-0 w-full h-[300] object-cover"
                src="https://img.freepik.com/foto-gratis/panes-frescos-cocidos-horno_140725-2066.jpg?w=740&t=st=1706489124~exp=1706489724~hmac=3743539f72d47f6336223b047d2289068f4a483d5c43f33fcf25e2e0c2f5a998"
              />
            </Link>
          </Card>

          <Card className="col-span-12 sm:col-span-4 h-[300px]">
            <Link to={NavigateRoutes.MANAGE_MOVEMENTS}>
            <CardHeader className="absolute z-10 top-1 flex-col !items-start">
              <p className="text-tiny text-white/60 uppercase font-bold">
                Informes
              </p>
              <h4 className="text-white font-medium text-large">
                Ver todos los informes
              </h4>
            </CardHeader>
            <Image
              isZoomed
              removeWrapper
              alt="Card background"
              className="z-0 w-full h-[300] object-cover"
              src="https://img.freepik.com/foto-gratis/cierre-panadero-hablando-cliente_23-2149039005.jpg"
            />
            </Link>
          </Card>

        </div>
      </div>
    </div>
  );
};
