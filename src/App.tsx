import { useState } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { Login, Layout } from './components';
import { StoreProvider } from "./context";
import { Modules, NavigateRoutes, Pages } from "./enums";
import { generateRoutes, PLATFORM_ROUTES, ProtectedRoutes } from './routes';
import { Registro } from './components/Formulario/Registro';

function App() {
  const [count, setCount] = useState(0);

  return (<StoreProvider>
 <BrowserRouter>
      <Routes>
        {/* Rutas Fuera de la plataforma */}
        <Route path="" element={<Navigate to={NavigateRoutes.LOGIN} />} />
        <Route path={Modules.AUTH}>
          <Route path={Pages.LOGIN} element={<Login />} />
          <Route path={Pages.REGISTER} element={<Registro />} />
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
