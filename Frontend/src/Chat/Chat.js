import { AuthCtx } from "../store/authctx";
import Messages from "./Messages";
import { useContext, useEffect, useRef } from "react";
import { io } from "socket.io-client";

function Chat() {
   
  return (
    <div>
        <Messages/>
        {/* <SendMessage></SendMessage> */}
    </div>
  );
}

export default Chat;