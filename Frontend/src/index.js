import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { ChatContextProvider } from "./store/ChatContext";
import { ReceiverContextProvider } from "./store/ReceiverContext";
import { AuthContextProvider } from "./store/AuthContext";
import { AuthCtxProvider } from "./store/authctx";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <AuthContextProvider>
      <AuthCtxProvider>
        <ReceiverContextProvider>
          <ChatContextProvider>
            <App />
          </ChatContextProvider>
        </ReceiverContextProvider>
      </AuthCtxProvider>
    </AuthContextProvider>
  </React.StrictMode>
);
