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
import { FaShoppingBasket } from "react-icons/fa";

const navItems = [
  { name: "Manejar Productos", path: NavigateRoutes.MANAGE_PRODUCTS },
];

const menuItems = [{ name: "Cerrar Sesión", path: NavigateRoutes.LOGIN }];

export const Navbar: React.FC = () => {
  const navigate = useNavigate();

  const location = useLocation();
  const { pathname } = location;

  const handleCloseSession = () => {
    localStorage.removeItem(StorageKeys.TOKEN);
    return navigate(NavigateRoutes.LOGIN);
  };

  const handleNavigate = (path: NavigateRoutes) => {
    if (path === NavigateRoutes.LOGIN) return handleCloseSession();
    return navigate(path);
  };

  return (
    <NextUiNavbar disableAnimation isBordered>
      <NavbarContent className="sm:hidden" justify="start">
        <NavbarMenuToggle />
      </NavbarContent>

      <NavbarContent className="sm:hidden pr-3" justify="center">
        <NavbarBrand>
          {/* <AcmeLogo /> */}
          <p className="font-bold text-inherit">{Info.APP_TITLE}</p>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        <NavbarBrand>
          {/*   <AcmeLogo /> */}
          <p className="font-bold text-inherit">Gastón</p>
        </NavbarBrand>
        {navItems.map(({ path, name }, index) => {
          const isActive = path === pathname;
          return (
            <NavbarItem key={path} isActive={isActive}>
              <Link color={isActive ? "primary" : "foreground"} href={path}>
                {name}
              </Link>
            </NavbarItem>
          );
        })}
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
                  startContent={icon}
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

        {menuItems.map(({ name, path }, index) => (
          <NavbarMenuItem
            key={`${path}-${index}`}
            onClick={() => handleNavigate(path)}
          >
            <span
              className={`text-${
                index === 2
                  ? "warning"
                  : path === NavigateRoutes.LOGIN
                  ? "danger"
                  : "foreground"
              } cursor-pointer`}
            >
              {name}
            </span>
          </NavbarMenuItem>
        ))}
      </NavbarMenu>
    </NextUiNavbar>
  );
};
