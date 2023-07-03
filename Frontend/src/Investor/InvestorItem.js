import { useNavigate } from "react-router-dom";
import classes from "./InvestorItem.module.css";
import { useContext } from "react";
import { AuthCtx } from "../store/authctx";
import { ChatContext } from "../store/ChatContext";
import { ReceiverContext } from "../store/ReceiverContext";
import {PrivateKeyContext} from "../store/PrivateKey"

function InvestorItem(props) {
  const navigate = useNavigate();
  //const auth = getAuth();
  const auth = useContext(AuthCtx);
  const privatekey = useContext(PrivateKeyContext);
  const currentuser = auth.currentUser.currentUser;
  const currentUserId = currentuser.id;
  const { dispatch } = useContext(ChatContext);
  const rec = useContext(ReceiverContext);
  console.log(auth.currentUser.currentUser.id)
  
  async function Connect() {
    // let response;
    await fetch("http://localhost:8080/investor/addproposal", {
      method: "PUT",
      body: JSON.stringify({
        entrepreneurId: currentuser.id,
        investorId: props.id,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  async function chathandler() {
    let id1, id2;
    if (currentUserId > props.id) {
      id1 = props.id;
      id2 = currentUserId;
    } else {
      id1 = currentUserId;
      id2 = props.id;
    }
    let response, data;
    try {
      response = await fetch("http://localhost:8080/conversation/getChat", {
        method: "POST",
        body: JSON.stringify({
          id1: id1,
          id2: id2,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      data = await response.json();
      console.log(data);
      if (data.length === 0) {
        let resp, Data;
        try {
          resp = await fetch("http://localhost:8080/conversation/", {
            method: "POST",
            body: JSON.stringify({
              senderId: id1,
              receiverId: id2,
            }),
            headers: {
              "Content-Type": "application/json",
            },
          });
          Data = await resp.json();
          console.log(Data);
          let conversationId = Data[0]._id.toString();
          let privateKey = Data[0].key;
          console.log(conversationId);
          dispatch({ type: "CHANGE_ID", payload: conversationId });
          privatekey.dispatch({ type: "CHANGE_KEY", payload: privateKey });
          
        } catch (error) {
          console.log(error);
        }
      } else {
        console.log(data);
        let conversationId = data[0]._id.toString();
        let privateKey = data[0].key;
        console.log(conversationId);
        dispatch({ type: "CHANGE_ID", payload: conversationId });
        privatekey.dispatch({ type: "CHANGE_KEY", payload: privateKey });
      }
      console.log(data);
    } catch (error) {
      console.log(error);
    }

    const receiverid = props.id;
    //const pkey = props.publicKey
    rec.dispatch({ type: "CHANGE_ID", payload: receiverid });
    // pubkey.dispatch({type: "CHANGE_KEY", payload: pkey})
    // console.log(pubkey.publicKey.publicKey);
    navigate("/chat");
  }

  return (
    <>
      <li className={classes.item}>
        <div className={classes.img}>
          <img
            src={"http://localhost:8080/" + `${props.image}`}
            alt={props.name}
            className={classes.image}
          ></img>
        </div>
        <h3 className={classes.content}>{props.name}</h3>
        <p className={classes.description}>{props.description}</p>
        <div className={classes.actions}>
          <button className={classes.btn} onClick={Connect}>
            Connect
          </button>
          <button className={classes.btn} onClick={chathandler}>
            Chat
          </button>
        </div>
      </li>
    </>
  );
}
export default InvestorItem;
