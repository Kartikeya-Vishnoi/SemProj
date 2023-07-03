import React, { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { getAuth, signOut } from "firebase/auth";
import Card from "../Event Tracker/ui/Card";
import classes from "./ProposalItem.module.css";
import { AuthCtx } from "../store/authctx";
import { ChatContext } from "../store/ChatContext";
import { ReceiverContext } from "../store/ReceiverContext";
import { PrivateKeyContext } from "../store/PrivateKey";
import { ProposalContext } from "../store/ViewProposal";

function ProposalItem(props) {
  const [username, setUsername] = useState(null);
  const [userCompanyInfo, setUserCompanyInfo] = useState(null);
  const [userStartUpName, setUserStartUpName] = useState(null);
  const [verificationDoc, setverificationDoc] = useState(null);
  const [logo, setLogo] = useState(null);
  const [id, setUserid] = useState();
  const [pitch, setPitch] = useState();
  const auth = useContext(AuthCtx);
  const currentUserId = auth.currentUser.currentUser.id;
  const acceptedproposals = auth.currentUser.currentUser.acceptedproposals;
  const { dispatch } = useContext(ChatContext);
  const rec = useContext(ReceiverContext);
  const privatekey = useContext(PrivateKeyContext);
  const propctx = useContext(ProposalContext);
  const navigate = useNavigate();
  const accepted = acceptedproposals.includes(props.proposal);

  const explore = () => {
    const entrepreneur = {
      name:username,
      startupname:userStartUpName,
      description:userCompanyInfo,
      pitchurl:pitch,
      doc:verificationDoc,
      logo:logo
    }
    propctx.dispatch({type:"VIEW", payload:entrepreneur});
    navigate("/proposalItemHome");
  }
  const accepthandler = async () => {
    let response, data;
    try {
      response = await fetch("http://65.1.130.135:8080/investor/acceptproposal", {
        method: "POST",
        body: JSON.stringify({
          investorId:currentUserId,
          id:props.proposal
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });
  }
  catch(err){
    console.log(err);
  }
}
  const rejecthandler = async () => {
    let response;
    try {
      response = await fetch("http://65.1.130.135:8080/investor/declineproposal", {
        method: "POST",
        body: JSON.stringify({
          investorId:currentUserId,
          id:props.proposal
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });
  }
  catch(err){
    console.log(err);
  }
  props.removeproposal(props.proposal);
  console.log(props.proposal);
  }

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
      response = await fetch("http://65.1.130.135:8080/conversation/getChat", {
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
          resp = await fetch("http://65.1.130.135:8080/conversation/", {
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
    navigate("/chat");
  }

  //let users = []
  //const currentuser = auth.currentUser;
  useEffect(() => {
    const fetchdata = async () => {
      // let list = [];
      let response;
      try {
        response = await fetch(
          "http://65.1.130.135:8080/entrepreneur/getEntrepreneurbyId",
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
        setLogo(data.user.logoUrl)
        setverificationDoc(data.user.verificationdoc);
        setPitch(data.user.pitchurl)
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
        <Card style={{ width: "400px", "margin-top": "50px","margin-right": "40px", height: "700px" }}>
          <div className={classes.blue}></div>
          <div className={classes.image}>
            <img src={"http://65.1.130.135:8080/" + `${logo}`} alt={props.title}></img>
          </div>
          <div className={classes.details}>
            <h3 className={classes.entname}>{userStartUpName}</h3>
            <br/>
            <h3>by</h3>
            <h3>{username}</h3>
            <br/>
            <button  onClick={explore} className={classes.btn}>
              EXPLORE
            </button>
            <div className={classes.actions}>
              {accepted === false? 
             <div className={classes.options}> 
            <button  onClick={accepthandler} style={{"backgroundColor":"#B9F3B5", color:"#12A607"}}>
              ACCEPT PROPOSAL
            </button>
            <button  onClick={rejecthandler} style={{"backgroundColor":"#ffe2ed"}}>
              REJECT PROPOSAL
            </button>
            </div>
              :<button  onClick={chatHandler} style={{"backgroundColor":"#B9F3B5", color:"#12A607"}}>
              CHAT
            </button>
               }
            </div>
          </div>
        </Card>
      )}
    </li>
  );
}

export default ProposalItem;