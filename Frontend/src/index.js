import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { ChatContextProvider } from "./store/ChatContext";
import { ReceiverContextProvider } from "./store/ReceiverContext";
import { AuthContextProvider } from "./store/AuthContext";
import { AuthCtxProvider } from "./store/authctx";
import { PrivateKeyContextProvider } from "./store/PrivateKey";
import { ProposalContextProvider } from "./store/ViewProposal";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <AuthContextProvider>
      <AuthCtxProvider>
        <ReceiverContextProvider>
          <ChatContextProvider>
            <PrivateKeyContextProvider>
              <ProposalContextProvider>
                <App />
              </ProposalContextProvider>
            </PrivateKeyContextProvider>
          </ChatContextProvider>
        </ReceiverContextProvider>
      </AuthCtxProvider>
    </AuthContextProvider>
  </React.StrictMode>
);
