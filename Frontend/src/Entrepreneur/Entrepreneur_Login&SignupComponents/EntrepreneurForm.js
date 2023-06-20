import classes from "./EntrepreneurForm.module.css";
import { useState } from "react";
import { storage } from "../../FireBase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { useEffect } from "react";
import Input from "../../UIElements/FormElements/Input";
import Navbar from "../../components/Navbar";
import LoadingSpinner from "../../UIElements/LoadingSpinner";
import { useForm } from "../../hooks/form-hook";
import {
  VALIDATOR_REQUIRE,
  VALIDATOR_EMAIL,
  VALIDATOR_MINLENGTH,
} from "../../utils/validators";

function EntrepreneurForm(props) {
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
      startupname: {
        value: "",
        isValid: false,
      },
      buisnesstype: {
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

  const [link, Setlink] = useState();
  const [pitch, SetPitch] = useState();
  const [percent, Setpercent] = useState(null);
  const [imgurl, setImgUrl] = useState(null);
  const [doc, setDoc] = useState(null);

  function OnSubmitHandler(e) {
    e.preventDefault();
    let url = link;

    let userdata = {
      UserEmail: formState.inputs.email.value,
      Name: formState.inputs.name.value,
      StartupName: formState.inputs.startupname.value,
      logoimg: imgurl,
      CompanyInfo: formState.inputs.description.value,
      Password: formState.inputs.password.value,
      pitch: pitch,
      pitchUrl: url,
      doc:doc
    };
    props.onadd(userdata);
  }

  useEffect(() => {
    const uploadfile = () => {
      const name = new Date().getTime + pitch.name;
      const storageRef = ref(storage, name);
      const uploadTask = uploadBytesResumable(storageRef, pitch);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          Setpercent(progress);
          console.log("Upload is " + progress + "% done");
          switch (snapshot.state) {
            case "paused":
              console.log("Upload is paused");
              break;
            case "running":
              console.log("Upload is running");
              break;
            default:
              break;
          }
        },
        (error) => {
          alert(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            Setlink(downloadURL);
          });
        }
      );
    };
    pitch && uploadfile();
  }, [pitch]);

  return (
    <div
      style={{
        backgroundImage:
          "url(https://static.vecteezy.com/system/resources/previews/006/852/804/original/abstract-blue-background-simple-design-for-your-website-free-vector.jpg)",
        height: "950px",
      }}
    >
      <Navbar />
      <div className={classes.back}>
        <div className={classes.join}>
          <p style={{ fontSize: "75px" }}>Join Bridge</p>
          <p>to level up your dreams!!</p>
          <button>Login</button>
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
            id="startupname"
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
            validators={[VALIDATOR_MINLENGTH(20)]}
            errorText="Please enter a valid description of (at least 20 characters)."
            onInput={inputHandler}
          />
          <div className={classes.control}>
            <label htmlFor="Logo">Logo upload</label>
            <input
              type="file"
              required
              id="imgurl"
              onChange={(e) => setImgUrl(e.target.files[0])}
            />
          </div>

          <div className={classes.control}>
              <label htmlFor="Logo">Document for Verification</label>
              <input
                type="file"
                required
                id="doc"
                onChange={(e) => setDoc(e.target.files[0])}
              />
            </div>

          <div className={classes.control}>
            <label htmlFor="Buisness Type">Upload your pitch</label>
            <input
              type="file"
              required
              id="pitch"
              onChange={(e) => SetPitch(e.target.files[0])}
            />

            {percent !== null && percent}
            {/* <div className={classes.actions}>
            <button>Upload pitch</button>
          </div> */}
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
            {props.isloading && <LoadingSpinner asOverlay />}
          </div>
        </form>
      </div>
    </div>
  );
}
export default EntrepreneurForm;
