import React, { useState, useContext } from "react";
import classes from "./Login.module.css";
import { useNavigate } from "react-router-dom";
import { VALIDATOR_REQUIRE, VALIDATOR_EMAIL} from "../../utils/validators";
import { AuthCtx } from "../../store/authctx";
import Navbar from "../../components/Navbar";
import ErrorModal from "../../UIElements/ErrorModal";
import Input from "../../UIElements/FormElements/LoginInput";
import { useForm } from "../../hooks/form-hook";
import LoadingSpinner from "../../UIElements/LoadingSpinner";
import forge from 'node-forge';

function EntrepreneurLogIn() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState();
  const [isloading, setIsloading] = useState(false);
  const authctx = useContext(AuthCtx);
  const [formState, inputHandler] = useForm({
    email: {
      value: "",
      isValid: false,
    },
    password: {
      value: "",
      isValid: false,
    }
  },
  false)
  const clearError = () => {
    setError(null);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    let response, currentUser;
    let data;
    try {
      setIsloading(true)
      response = await fetch("http://localhost:8080/entrepreneur/login", {
        method: "POST",
        body: JSON.stringify({
          email: formState.inputs.email.value,
          password: formState.inputs.password.value,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      data = await response.json();
      setIsloading(false);
      if (!response.ok) {
        throw new Error(data.message);
      }
      // const encryptedPrivateKey = data.user.privateKey;
      // const passphrase = 'kartik3193';
      // const privateKeyAsn1 = forge.pki.decryptRsaPrivateKey(encryptedPrivateKey, passphrase);
      // const privateKeyPem = forge.pki.privateKeyToPem(privateKeyAsn1);

      currentUser = {
        id: data.user._id,
        email: data.user.email,
        name: data.user.name,
        startupname: data.user.startupname,
        description: data.user.description,
        password: data.user.password,
        pitchurl: data.user.pitchurl,
        // privateKey:privateKeyPem,
        // publicKey:data.user.publicKey
      };
      authctx.dispatch({ type: "LOGIN", payload: currentUser });
      localStorage.setItem("currentuser", JSON.stringify(data.user._id));
      navigate("/entrepreneurhome");
    } catch (err) {
      setError(err.message);
      console.log(err);
    }

    //console.log(data);

    // console.log(currentUser);
    //console.log(authctx.currentUser);

    // const user = localStorage.getItem('currentuser');
  };
  return (
    <React.Fragment>
      <Navbar />
      <div classname={classes.head}>
        <div className={classes.image}>
          <img src="http://localhost:8080/frontendimages/cover.jpg"
          style={{width:"50vw", height:"85.5vh","padding-left":0}}/>
        </div>
      <ErrorModal error={error} onClear={clearError} />
      <div className={classes.cover}>
        <div className={classes.welcome}>Welcome to Bridge!!</div>
      <form className={classes.form}>
          <Input
            id="email"
            element="input"
            type="text"
            label="Email"
            validators={[VALIDATOR_EMAIL(), VALIDATOR_REQUIRE()]}
            errorText="Please fill a valid email"
            onInput={inputHandler}
            style={{width:"100%"}}
          />
          <Input
            id="password"
            element="input"
            type="password"
            label="Password"
            validators={[VALIDATOR_REQUIRE()]}
            errorText="Please enter your password."
            onInput={inputHandler}
            style={{"width":"100%"}}
          />
          <div className={classes.actions}>
          <button type="submit" onClick={handleLogin}>
            Login
          </button>
          </div>
          {isloading && <LoadingSpinner asOverlay/>}
      </form>
      </div>
      {/* <div className={classes.signup}>
        <p>New User?</p>
          <button
            onClick={() => {
              navigate("/entrepreneursignup");
            }}
          >
            Sign Up
          </button>
        </div> */}
        </div>
    </React.Fragment>
  );
}
export default EntrepreneurLogIn;
