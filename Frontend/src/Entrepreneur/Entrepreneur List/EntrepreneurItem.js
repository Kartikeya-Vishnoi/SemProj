import {
  getDoc,
  setDoc,
  doc,
  updateDoc,
  serverTimestamp,
  arrayUnion
} from "firebase/firestore";
import {db} from "../../FireBase";
import { getAuth } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import Card from "../../Event Tracker/ui/Card";
import classes from "./EntrepreneurItem.module.css";
import { AuthContext } from "../../store/AuthContext";
import { useContext } from "react";
import { connect } from "mongoose";
import Navbar from "../../components/Navbar"
import { ChatContext } from "../../store/ChatContext";

function EntrepreneurItem(props) {
  const {dispatch} = useContext(ChatContext)
  const navigate = useNavigate();
  const auth = getAuth();
  const {currentUser}=useContext(AuthContext)
  // console.log(currentUser);
  const currentuser = auth.currentUser;

  async function Connect(){
    await updateDoc(doc(db, "investor", props.id), {
      requests:arrayUnion(currentuser.uid)
    });
  }

  async function chathandler() {
    const combinedId =
      currentuser.uid > props.id
        ? currentuser.uid + props.id
        : props.id + currentuser.uid;
    console.log(combinedId);
    try {
      const res = await getDoc(doc(db, "chats", combinedId));
      if (!res.exists()) {
        await setDoc(doc(db, "chats", combinedId), { messages: [] });

        await updateDoc(doc(db, "userChats", currentuser.uid), {
          [combinedId + ".userInfo"]: {
            uid: props.id,
          },
          [combinedId + ".date"]: serverTimestamp(),
        });

        await updateDoc(doc(db, "userChats", props.id), {
          [combinedId + ".userInfo"]: {
            uid: currentuser.uid,
          },
          [combinedId + ".date"]: serverTimestamp(),
        });
      }
    } catch (error) {
      console.log(error)
    }
    dispatch({type:"CHANGE_USER",payload:props})
    navigate("/chat")
  }

  return (
    <>
    
  
    <li className={classes.item}>
      {/* <div className={classes.card}> */}
      <Card className={classes.container} style={{ width: "300px", margin: "23px", background: "white" }}>
        <div className={classes.avatar}>
        <img src={props.image} alt={props.name} className={classes.image}></img>
     </div>
     <div className={classes.details}>
        <h3 className={classes.content}>{props.name}</h3>
        <div className={classes.actions}>
          <button
            onClick={Connect}
          >
            CONNECT
          </button>
          <button
            onClick={chathandler}
          >
            Chat
          </button>
        </div>
        </div>
      </Card>
      {/* </div> */}
    </li>
    
    </>
  );
}
export default EntrepreneurItem;