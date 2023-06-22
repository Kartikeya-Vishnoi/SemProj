import React, { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { getAuth, signOut } from "firebase/auth";
import Card from "../Event Tracker/ui/Card";
import classes from "./ProposalItem.module.css";
import { AuthCtx } from "../store/authctx";
import { ChatContext } from "../store/ChatContext";
import { ReceiverContext } from "../store/ReceiverContext";
import { PrivateKeyContext } from "../store/PrivateKey";

function ProposalItem(props) {
  const [username, setUsername] = useState(null);
  const [userCompanyInfo, setUserCompanyInfo] = useState(null);
  const [userStartUpName, setUserStartUpName] = useState(null);
  const [userBuisnessType, setUserBuisnessType] = useState(null);
  //  const [pkey, setPkey] = useState(null);
  const [id, setUserid] = useState();
  const [pitch, Setpitch] = useState();
  const auth = useContext(AuthCtx);
  const currentUserId = auth.currentUser.currentUser.id;
  // console.log(currentUserId);
  const { dispatch } = useContext(ChatContext);
  const rec = useContext(ReceiverContext);
  const privatekey = useContext(PrivateKeyContext);

  async function chatHandler() {
    let id1, id2;
    if (currentUserId > props.proposal) {
      id1 = props.proposal;
      id2 = currentUserId;
    } else {
      id1 = currentUserId;
      id2 = props.proposal;
    }
    let response, data;
    try {
      response = await fetch("http://15.206.179.31:8080/conversation/getChat", {
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
      if (data.length === 0) {
        let resp, Data;
        try {
          resp = await fetch("http://15.206.179.31:8080/conversation/", {
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
    } catch (error) {
      console.log(error);
    }
    const receiverid = props.proposal;
    rec.dispatch({ type: "CHANGE_ID", payload: receiverid });
    // pubkey.dispatch({type: "CHANGE_KEY", payload: pkey})
    // console.log(pubkey.publicKey.publicKey);
    navigate("/chat");
  }

  const navigate = useNavigate();
  //let users = []
  //const currentuser = auth.currentUser;
  useEffect(() => {
    const fetchdata = async () => {
      // let list = [];
      let response;
      try {
        response = await fetch(
          "http://15.206.179.31:8080/entrepreneur/getEntrepreneurbyId",
          {
            method: "POST",
            body: JSON.stringify({
              id: props.proposal,
            }),
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        const data = await response.json();
        if (!response.ok) {
          throw new Error(data.message);
        }
        console.log(data.user);
        setUsername(data.user.name);
        setUserCompanyInfo(data.user.description);
        setUserStartUpName(data.user.startupname);
        setUserBuisnessType(data.user.buisnesstype);
        // setPkey(data.user.publicKey);
        //setUserid(name[0].uid);
      } catch (err) {
        console.log(err);
      }
    };
    fetchdata();
  }, []);

  //console.log(props.proposal);
  return (
    <li className={classes.item}>
      {username === null ? (
        ""
      ) : (
        <Card style={{ width: "800px", margin: "50px", height: "450px" }}>
          <div className={classes.blue}></div>
          <div className={classes.details}>
            <h3>ENTERPRENUER'S NAME : {username}</h3>
            <p>STARTUP NAME : {userCompanyInfo}</p>
            <h3>STARTUP INFORMATION : {userStartUpName}</h3>
            {/* <h3>BUISNESS TYPE :   {userBuisnessType}</h3> */}
            <div className={classes.btns}>
              <a href={pitch}>EXPLORE</a>
            </div>
            <button className={classes.btn} onClick={chatHandler}>
              <a href={pitch}>EXPLORE</a>
            </button>
            <button className={classes.btn} onClick={chatHandler}>
              CONTACT
            </button>
          </div>
        </Card>
      )}
    </li>
  );
}

export default ProposalItem;
