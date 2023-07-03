import { createContext, useReducer} from "react";
import AuthReducer from "./AuthReducer";

const INITIAL_STATE = {
  id:null,
  email: null,
  name: null,
  startupname: null,
  buisnesstype: null,
  description: null,
  password: null,
  pitchurl: null,  
};

export const AuthCtx = createContext(INITIAL_STATE);


export const AuthCtxProvider = ({ children }) => {

  const [state, dispatch] = useReducer(AuthReducer,INITIAL_STATE);
  return (
    <AuthCtx.Provider value={{currentUser: state, dispatch}}>
      {children}
    </AuthCtx.Provider>
  );
};
