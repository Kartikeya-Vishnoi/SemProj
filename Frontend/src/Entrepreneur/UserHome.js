import React, {useContext } from "react";
import { useNavigate } from "react-router-dom";
import classes from "./UserHome.module.css";

import { AuthCtx } from "../store/authctx";

function UserHome() {
  const authctx = useContext(AuthCtx);
  // function Signout(){
  // }
  
  const navigate = useNavigate();
  return (
    <div className={classes.style}>
      <header>
        <nav>
          <ul>
          <li onClick={() => {navigate("/vclist")}}>
              Explore VC's
            </li>
            <li>
              Update Profile
            </li>
            <li
              //onClick={Signout}
            >
              LogOut
            </li>
            <li onClick={() => {navigate("/events")}}>
              Event Tracker
            </li>
          </ul>
        </nav>
      </header>

   <div className={classes.container}>
      <div className={classes.video}>
      <video  controls autoPlay >
        <source src={"http://15.206.179.31:8080/" + `${authctx.currentUser.currentUser.pitchurl}`} type="video/mp4" />
        </video>
      </div>

      <div className={classes.details}>
        <ul>
          <h2>DETAILS REGARDING PITCH</h2>
          <br></br>
          <li><h3>ENTERPRENUER NAME:</h3>{` ${authctx.currentUser.currentUser.name}`}</li>
          <li><h3>ENTERPRENUER EMAIL:</h3>{` ${authctx.currentUser.currentUser.email}`}</li>
       <li><h3>BUSINESS TYPE:</h3>{` ${authctx.currentUser.currentUser.buisnesstype}`}</li>
     <li><h3>STARTPUP INORMATION:</h3>{`${authctx.currentUser.currentUser.description}`}</li>
     <li><h3>STARTUP NAME:</h3>{` ${authctx.currentUser.currentUser.startupname}`}</li>
     {/* <li><h3>TIME INFO:</h3>{` ${userTimeStamp}`}</li> */}
        </ul>
    
      </div>
   </div>
     

    </div>
  );
}

export default UserHome;