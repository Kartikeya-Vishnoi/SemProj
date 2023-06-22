import React, { useState,useContext } from "react";
import classes from "./InvestorLogin.module.css";
import {useNavigate } from "react-router-dom";
import { AuthContext } from "../../store/AuthContext";
import Navbar from "../../components/Navbar"
import { AuthCtx } from "../../store/authctx";
import forge from 'node-forge';

function InvestorLogIn() {
  const navigate = useNavigate();
  const authctx = useContext(AuthCtx);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, SetError] = useState(false);


  const handleLogin = (e) => {
    e.preventDefault();
    //const auth=getAuth();
    fetch("http://13.232.84.21:8080/investor/login",{
      method:"POST",
      body:JSON.stringify({
        "email":email,
        "password":password
      }),
      headers: {
        'Content-Type' : 'application/json'
      }
    }).then(response => response.json())
    .then(data => {
      console.log(data);
      // const encryptedPrivateKey = data.user.privateKey;
      // const passphrase = 'kartik3193';
      // const privateKeyAsn1 = forge.pki.decryptRsaPrivateKey(encryptedPrivateKey, passphrase);
      // const privateKeyPem = forge.pki.privateKeyToPem(privateKeyAsn1);
      const currentUser = {
        id: data.user._id,
        email: data.user.email,
        name: data.user.name,
        companyname: data.user.companyname,
        imgurl: data.user.image,
        requests: data.user.requests,
        // privateKey: privateKeyPem,
        // publicKey: data.user.publicKey
      }
      //console.log(currentUser);
      //console.log(authctx.currentUser);
      authctx.dispatch({type:"LOGIN", payload:currentUser});
      //console.log(authctx.currentUser);

      //localStorage.setItem('currentuser', JSON.stringify(data.user._id));
      navigate("/investorhome");
      // const user = localStorage.getItem('currentuser');
    })
      .catch((error) => {
        SetError(true)
      });
  };
  return (
    <React.Fragment>
    <Navbar/>
    <div className={classes.container}>
      <form >
      <div className={classes.login}>
        <input
          id="email-address"
          name="email"
          type="email"
          required
          placeholder="Email address"
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          id="password"
          name="password"
          type="password"
          required
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button type="submit" onClick={handleLogin}>
          <div className={classes.lo}>Login</div>
        </button>
        <p className="nuser">New User?</p>
        </div>
        <div className={classes.signup}>
        <button onClick={() => {navigate("/signup")}}>
          <p>Sign Up</p>
        </button>
        </div>
        {error && <p className={classes.warning}>Wrong Email or Password</p>}
      </form>
    </div>
    </React.Fragment>
  );
}
export default InvestorLogIn;