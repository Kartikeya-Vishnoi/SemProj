import classes from "./InvestorForm.module.css";
import { useRef, useState } from "react";
import { useForm } from "../../hooks/form-hook";
import Navbar from "../../components/Navbar";
import Input from "../../UIElements/FormElements/Input";
import {
  VALIDATOR_REQUIRE,
  VALIDATOR_EMAIL,
  VALIDATOR_MINLENGTH,
} from "../../utils/validators";

function InvestorForm(props) {
  const [formState, inputHandler] = useForm(
    {
      email: {
        value: "",
        isValid: false,
      },
      password: {
        value: "",
        isValid: false,
      },
      name: {
        value: "",
        isValid: false,
      },
      companyname: {
        value: "",
        isValid: false,
      },
      description: {
        value: "",
        isValid: false,
      },
    },
    false
  );

  const useremail = useRef();
  const password = useRef();
  const Enteredname = useRef();
  const Startupname = useRef();
  const Description = useRef();
  const [imgurl, setImgUrl] = useState(null);

  function OnSubmitHandler(e) {
    e.preventDefault();
    // let email = formState.inputs.email.value;
    // let pass = password.current.value;
    // let name = Enteredname.current.value;
    // let startupname = Startupname.current.value;
    // let description = Description.current.value;
    let url = imgurl;
    let userdata = {
      userEmail: formState.inputs.email.value,
      name: formState.inputs.name.value,
      companyName: formState.inputs.companyname.value,
      description: formState.inputs.description.value,
      password: formState.inputs.password.value,
      imgUrl: url,
      requests: "null",
    };
    props.onadd(userdata);
  }

  return (
    <div style={{background:"linear-gradient(90deg, #443c3c 0.03%, #0e0c0c 99.96%)",
    "height":"950px"}}>
      <Navbar />
      <div className={classes.position}>
      <div className={classes.back}>
      <div className={classes.join}>
      <p style={{fontSize:"75px"}}>Join Pitch Ocean</p> 
        <p>to invest at ease!!</p>
        <button style={{width:"120px","backgroundColor":"#7E5C52", "borderRadius":"5px", "color":"white", "height":"40px"}}>Login</button>
      </div>
      </div>
      <form className={classes.form} onSubmit={OnSubmitHandler}>
        <Input
          id="name"
          element="input"
          type="text"
          label="Name"
          validators={[VALIDATOR_REQUIRE()]}
          errorText="Please fill your name"
          onInput={inputHandler}
        />
        <Input
          id="email"
          element="input"
          type="text"
          label="Email"
          validators={[VALIDATOR_EMAIL()]}
          errorText="Please fill a valid email"
          onInput={inputHandler}
        />
        <Input
          id="companyname"
          element="input"
          type="text"
          label="Startup Name"
          validators={[VALIDATOR_REQUIRE()]}
          errorText="Please enter your Startup Name"
          onInput={inputHandler}
        />
        <Input
          id="description"
          element="textarea"
          type="text"
          label="Description"
          validators={[VALIDATOR_MINLENGTH(10)]}
          errorText="Please enter a valid description of (at least 10 characters)."
          onInput={inputHandler}
        />
        <div className={classes.control}>
          <label htmlFor="Profile Image Link">Profile Image Link</label>
          <input
            type="file"
            required
            id="imgurl"
            onChange={(e) => setImgUrl(e.target.files[0])}
          />
        </div>
        <Input
          id="password"
          element="input"
          type="password"
          label="Password"
          validators={[VALIDATOR_MINLENGTH(6)]}
          errorText="Please enter a valid password, at least 6 characters."
          onInput={inputHandler}
        />
        <div className={classes.actions}>
        <button>Update Info</button>
        </div>
      </form>
      </div>
    </div>
  );
}
export default InvestorForm;
