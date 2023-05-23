import { useState, useEffect, useContext } from "react";
import { getDocs, collection } from "firebase/firestore";
import { db } from "../FireBase";
import { getAuth, signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import Proposalslist from "./Proposalslist";
import { AuthContext } from "../store/AuthContext";
import classes from "./InvestorHome.module.css";
import { AuthCtx } from "../store/authctx";
import ProposalItem from "./ProposalItem";

function InvestorHome() {
  const authctx = useContext(AuthCtx);
  const navigate = useNavigate();
  //console.log(authctx.currentUser.currentUser);
  const [list, setList] = useState([]);
  function Signout() {}
  useEffect(() => {
    const fetchdata = async () => {
      let response, data;
      try {
        response = await fetch("http://localhost:8080/investor/getlist", {
          method: "POST",
          body: JSON.stringify({
            id: authctx.currentUser.currentUser.id,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        });
        data = await response.json();
        console.log(data.proposals);
        setList(data.proposals);
        if (!response.ok) {
          throw new Error(data.message);
        }
      } catch (err) {
        console.log(err);
      }
    };
    fetchdata();
  }, []);
  // console.log(proposal);

  return (
    <>
      <div className={classes.style}>
        <header>
          <nav>
            <ul>
              <li
                onClick={() => {
                  navigate("/entlist");
                }}
              >
                Explore Entrepreneurs
              </li>
              <li>Update Profile</li>
              <li onClick={Signout}>LogOut</li>
            </ul>
          </nav>
        </header>
        <div>
          {list.length === 0 ? (
            <h1>
              Hello {`${authctx.currentUser.currentUser.name}`}, You don't have
              any proposals as of now
            </h1>
          ) : (
            <>
              <h1>
                Hello {`${authctx.currentUser.currentUser.name}`}, here are your
                Proposals
              </h1>
              {/* <div><ul>{list.map((item,index) => <ProposalItem key={index} proposal={item}/>)}</ul></div> */}
              <div><Proposalslist list={list}/></div>
            </>
          )}
        </div>
        <br></br>
        {/* <img src = {"http://localhost:8080/" + `${authctx.currentUser.currentUser.imgurl}`} /> */}
      </div>
    </>
  );
}
export default InvestorHome;
