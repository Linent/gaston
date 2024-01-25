import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import { LoginPage, RegisterPage } from "./pages";
import { generateRoutes, PLATFORM_ROUTES, ProtectedRoutes } from "./routes";

import { StoreProvider } from "./context";

import { Layout } from "./components";

import { Modules, NavigateRoutes, Pages } from "./enums";

import "./App.css";

function App() {

  return (
    <StoreProvider>
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
              {/* Redireccionamiento */}
              <Route path="" element={<Navigate to={Modules.DASHBOARD} />} />
              {/* Mapeo de rutas de platform */}
              {PLATFORM_ROUTES.map(generateRoutes)}
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </StoreProvider>
  );
}

export default App;
