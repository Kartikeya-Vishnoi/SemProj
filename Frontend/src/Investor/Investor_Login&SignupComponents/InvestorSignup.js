import React from 'react';
import { useNavigate } from 'react-router-dom';

import InvestorForm from './InvestorForm';

function InvestorSignUp(){
const navigate=useNavigate();
   const Onsubmithandler = (data) => {
    console.log(data);
    console.log(data.name);
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("email", data.userEmail);
    formData.append("companyName", data.companyName);
    formData.append("description", data.description);
    formData.append("password", data.password);
    formData.append("image", data.imgUrl);
    console.log(formData);
    fetch("http://localhost:8080/investor/signup", {
      method: "PUT",
      body: formData
    })
    navigate("/");
  };

return(
    <InvestorForm onadd={Onsubmithandler}/>
)
}
export default InvestorSignUp