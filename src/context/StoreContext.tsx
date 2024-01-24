import React, { createContext, useContext, useEffect, useState } from 'react';

export interface StoreContextType {
  hasSession: boolean
  setHasSession: React.Dispatch<React.SetStateAction<boolean>>
};
const defaultValue : StoreContextType = {
    hasSession: false,
    setHasSession: () => {}
}
export const StoreContext = createContext<StoreContextType>(defaultValue);

export const StoreProvider: React.FC<{children:React.ReactNode}> = ({ children }) => {
  const [hasSession, setHasSession] = useState<boolean>(false);
 return (
    <StoreContext.Provider
      value={{
         hasSession,
         setHasSession,

      }}>
      {children}
    </StoreContext.Provider>
  );
};

export const useStoreContext = (): StoreContextType => useContext(StoreContext);