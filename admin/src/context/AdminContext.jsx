import { createContext } from "react";

export const AdminContext = createContext();

const AdminContextProvider = (props) => {
    const value = {
        // Add your context values here
    };

    return (
        <AdminContext.Provider value={value}>
            {props.children}
        </AdminContext.Provider>
    );
};

export default AdminContextProvider;