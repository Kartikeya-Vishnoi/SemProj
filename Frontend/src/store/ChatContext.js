import {
    createContext,
    useReducer,
  } from "react";
  
  export const ChatContext = createContext();
  
  export const ChatContextProvider = ({ children }) => {
    const INITIAL_STATE = {
      conversationId: null,
    };
  
    const chatReducer = (state, action) => {
      switch (action.type) {
        case "CHANGE_ID":
          return {
            conversationId:action.payload
          };
        default:
          return state;
      }
    };
  
    const [state, dispatch] = useReducer(chatReducer, INITIAL_STATE);
  
    return (
      <ChatContext.Provider value={{ conversationId:state, dispatch }}>
        {children}
      </ChatContext.Provider>
    );
  };