import { createContext, useContext, useState } from "react";

export const AppContext = createContext();

const AppContextProvider = ({ children }) => {
  const [token, setToken] = useState(false);
  const [selectedPermissions, setSelectedPermissions] = useState([]);
  return (
    <AppContext.Provider value={{ token, setToken, selectedPermissions, setSelectedPermissions }}>
      {children}
    </AppContext.Provider>
  );
}; 
export const useStateContext = () => {
  return useContext(AppContext);
};
export default AppContextProvider;
