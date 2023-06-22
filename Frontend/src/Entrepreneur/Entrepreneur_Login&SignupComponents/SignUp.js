import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import EntrepreneurForm from "./EntrepreneurForm";
import ErrorModal from "../../UIElements/ErrorModal";

function SignUp() {
  const navigate = useNavigate();
  const [error, setError] = useState();
  const [isloading, setIsloading] = useState(false);
  const clearError = () => {
    setError(null);
  }

  const Onsubmithandler = async (data) => {
    setIsloading(true);
    console.log(data);
    const formData = new FormData();
    formData.append("name", data.Name);
    formData.append("email", data.UserEmail);
    formData.append("startupname", data.StartupName);
    formData.append("logo", data.logoimg);
    formData.append("description", data.CompanyInfo);
    formData.append("password", data.Password);
    formData.append("video", data.pitch);
    formData.append("verificationdoc", data.doc)
    console.log(formData);
    let response, responseData;
    try {
      response = await fetch("http://13.232.84.21:8080/entrepreneur/signup", {
        method: "PUT",
        body: formData,
      });
      responseData = await response.json();
      setIsloading(false);
      if (!response.ok) {
        throw new Error(responseData.message);
      }
      navigate("/");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <>
      <ErrorModal error={error} onClear={clearError}/>
      <EntrepreneurForm onadd={Onsubmithandler} isloading={isloading}/>
    </>
  );
}
export default SignUp;