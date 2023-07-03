import {
    createContext,
    useReducer,
  } from "react";
  
  export const ReceiverContext = createContext();
  
  export const ReceiverContextProvider = ({ children }) => {
    const INITIAL_STATE = {
        receiverId: null,
    };
  
    const receiverReducer = (state, action) => {
      switch (action.type) {
        case "CHANGE_ID":
          return {
            receiverId:action.payload
          };
        default:
          return state;
      }
    };
  
    const [state, dispatch] = useReducer(receiverReducer, INITIAL_STATE);
  
    return (
      <ReceiverContext.Provider value={{ receiverId:state, dispatch }}>
        {children}
      </ReceiverContext.Provider>
    );
  };