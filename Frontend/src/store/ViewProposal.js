import {
    createContext,
    useReducer,
  } from "react";
  
  const INITIAL_STATE = {
    name: null,
    startupname: null,
    description: null,
    pitchurl: null,
    doc: null,
    logo: null
  };

  export const ProposalContext = createContext(INITIAL_STATE);

  const proposalReducer = (state, action) => {
    switch (action.type) {
      case "VIEW":
        return {
          state:action.payload
        };
      default:
        return state;
    }
  };

  export const ProposalContextProvider = ({ children }) => {

    const [state, dispatch] = useReducer(proposalReducer, INITIAL_STATE);

    return (
      <ProposalContext.Provider value={{ proposal:state, dispatch }}>
        {children}
      </ProposalContext.Provider>
    );
  };