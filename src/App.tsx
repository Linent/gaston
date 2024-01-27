import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import {
  CreateMovementsPage,
  Dashboard,
  LoginPage,
  MovementsManagePage,
  ProductByIdPage,
  ProductsManagePage,
  RegisterPage,
} from "./pages";
import { ProtectedRoutes } from "./routes";

import { StoreProvider } from "./context";

import { Layout } from "./components";

import { Modules, NavigateRoutes, Pages } from "./enums";

import "./App.css";

function App() {
  return (
    <StoreProvider>
      <Toaster
        position="top-right"
        reverseOrder={false}
        containerClassName="overflow-auto"
      />
      <BrowserRouter>
        <Routes>
          {/* Rutas Fuera de la plataforma */}
          <Route path="" element={<Navigate to={NavigateRoutes.LOGIN} />} />
          <Route path={Modules.AUTH}>
            <Route path={Pages.LOGIN} element={<LoginPage />} />
            <Route path={Pages.REGISTER} element={<RegisterPage />} />
          </Route>
          {/* Guard de plataforma */}
          <Route element={<ProtectedRoutes />}>
            <Route path={Modules.PLATFORM} element={<Layout />}>
              <Route path={Modules.DASHBOARD} element={<Dashboard />} />
              <Route path={Modules.PRODUCTS}>
                <Route
                  path={Pages.MANAGE_PRODUCTS}
                  element={<ProductsManagePage />}
                />
                 <Route
                  path={Pages.PRODUCT_BY_ID}
                  element={<ProductByIdPage />}
                />
              </Route>
              <Route path={Modules.MOVEMENTS}>
                <Route
                  path={Pages.MANAGE_MOVEMENTS}
                  element={<MovementsManagePage />}
                />
                 <Route
                  path={Pages.CREATE_MOVEMENT}
                  element={<CreateMovementsPage />}
                />
              </Route>
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </StoreProvider>
  );
}

export default App;
