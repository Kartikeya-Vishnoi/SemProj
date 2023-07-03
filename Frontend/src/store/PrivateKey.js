import {
    createContext,
    useReducer,
  } from "react";
  
  export const PrivateKeyContext = createContext();
  
  export const PrivateKeyContextProvider = ({ children }) => {
    const INITIAL_STATE = {
        privateKey: null,
    };
  
    const privateKeyReducer = (state, action) => {
      switch (action.type) {
        case "CHANGE_KEY":
          return {
            privateKey:action.payload
          };
        default:
          return state;
      }
    };
  
    const [state, dispatch] = useReducer(privateKeyReducer, INITIAL_STATE);
  
    return (
      <PrivateKeyContext.Provider value={{ privateKey:state, dispatch }}>
        {children}
      </PrivateKeyContext.Provider>
    );
  };