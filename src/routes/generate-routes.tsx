import { Route } from "react-router-dom";
import { IRoutes } from "../interfaces";

export const generateRoutes = ({
  isActive,
  module,
  childrenRoutes,
  Component,
}: IRoutes) => {
  if (!isActive) return null;
  return (
    <Route
      key={module}
      path={module}
      element={Component ? <Component /> : null}
    >
      {childrenRoutes?.map(({ isActive, name, Component }) =>
        isActive ? (
          <Route key={name} path={name} element={<Component />} />
        ) : null
      )}
    </Route>
  );
};
