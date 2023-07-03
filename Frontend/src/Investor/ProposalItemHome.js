import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import classes from "./ProposalItemHome.module.css";
import { ProposalContext } from "../store/ViewProposal";


function ProposalItemHome() {
  const propctx = useContext(ProposalContext);
  console.log(propctx.proposal.state)
  const navigate = useNavigate();
  return (
    <div className={classes.style}>
      <header>
        <nav>
          <ul>
            <li>
              <img className={classes.image} src={"http://65.1.130.135:8080/" + `${propctx.proposal.state.logo}`}></img>
            </li>
            <li>
              {` ${propctx.proposal.state.startupname}`}
            </li>
          </ul>
          <button className={classes.doc} onClick={() => { window.open("http://65.1.130.135:8080/" + `${propctx.proposal.state.doc}`, '_blank') }}>Click to view official docs</button>
        </nav>
      </header>

      <div className={classes.container}>
        <div className={classes.video}>
          <video controls poster="http://65.1.130.135:8080/frontendimages/Cool Game Player Logo.png">
            <source src={"http://65.1.130.135:8080/" + `${propctx.proposal.state.pitchurl}`} type="video/mp4" />
          </video>
        </div>
        <div className={classes.details}>
          <ul>
            {/* <h2>STARTPUP DETAILS</h2> */}
            <br></br>
            <li><h3>ENTERPRENUER NAME:</h3>{` ${propctx.proposal.state.name}`}</li>
            <li><h3>STARTPUP INORMATION:</h3>{`${propctx.proposal.state.description}`}</li>

            {/* <li><h3>STARTUP NAME:</h3>{` ${propctx.proposal.state.startupname}`}</li> */}
          </ul>
        </div>
      </div>


    </div>
  )
}

export default ProposalItemHome;