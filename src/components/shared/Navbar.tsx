import { useState } from "react";

import {
  Accordion,
  AccordionItem,
  Button,
  Link,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenu,
  NavbarMenuItem,
  NavbarMenuToggle,
  Navbar as NextUiNavbar,
} from "@nextui-org/react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";

import { Info, Modules, NavigateRoutes, StorageKeys } from "../../enums";
import { PLATFORM_ROUTES } from "../../routes";
import { Icon } from "@iconify/react";

export const Navbar: React.FC = () => {
  const navigate = useNavigate();

  const [navbarIsOpen, setNavbarIsOpen] = useState(false);
  const toggleNavbarIsOpen = () => setNavbarIsOpen(!navbarIsOpen);

  const location = useLocation();
  const { pathname } = location;

  const handleCloseSession = () => {
    setNavbarIsOpen(false);
    localStorage.removeItem(StorageKeys.TOKEN);
    return navigate(NavigateRoutes.LOGIN);
  };

  const handleNavigate = (path: string) => {
    setNavbarIsOpen(false);
    if (path === NavigateRoutes.LOGIN) return handleCloseSession();
    return navigate(path);
  };

  return (
    <NextUiNavbar isMenuOpen={navbarIsOpen} isBordered>
      <NavbarContent justify="start">
        <NavbarMenuToggle onClick={toggleNavbarIsOpen} />
      </NavbarContent>

      <NavbarContent className="pr-3" justify="center">
        <NavbarBrand>
          {/* <AcmeLogo /> */}
          <a
            className="font-bold text-inherit cursor-pointer md:text-xl"
            onClick={() => handleNavigate(NavigateRoutes.DASHBOARD)}
          >
            {Info.APP_TITLE}
          </a>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent justify="end">
        <NavbarItem>
          <Button
            as={Link}
            color="danger"
            href="#"
            variant="flat"
            onClick={handleCloseSession}
          >
            Cerrar sesión
          </Button>
        </NavbarItem>
      </NavbarContent>

      <NavbarMenu>
        <Accordion variant="splitted">
          {PLATFORM_ROUTES.filter((e) => e.childrenRoutes).map(
            ({ module, label, childrenRoutes, icon }) => {
              return (
                <AccordionItem
                  startContent={icon ? <Icon icon={icon} /> : null}
                  key={module}
                  aria-label={module}
                  title={label}
                >
                  {childrenRoutes?.map(({ label, name }) => (
                    <NavbarMenuItem
                      key={module}
                      className="mb-2"
                      onClick={() => handleNavigate(`${module}/${name}`)}
                    >
                      <span
                        className={`text-${
                          name === pathname ? "primary" : "foreground"
                        } cursor-pointer`}
                      >
                        {label}
                      </span>
                    </NavbarMenuItem>
                  ))}
                </AccordionItem>
              );
            }
          )}
        </Accordion>

        <NavbarMenuItem onClick={() => handleNavigate(NavigateRoutes.LOGIN)}>
          <span className={`text-danger cursor-pointer`}>Cerrar sesión</span>
        </NavbarMenuItem>
      </NavbarMenu>
    </NextUiNavbar>
  );
};
