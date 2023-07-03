import { useEffect } from "react";
import { useState } from "react";
import InvestorItem from "./InvestorItem";
import classes from "./Investor-list.module.css";
import Navbar from "../components/Navbar";
function InvestorList() {
  const [list, setList] = useState(null);
  useEffect(() => {
    const fetchUsers = async() =>{
      try {
        const responseData = await fetch("http://65.1.130.135:8080/investor/list",{
          method:"GET",
          body:null,
          headers:{}
        })
        const data = await responseData.json();
        console.log(data.users);
        setList(data.users);
      } catch (error) {
        console.log(error);
      }
    }
    fetchUsers()
  }, []);


  return (
    <>
    <Navbar/>
      {list == null ? (
        "Loading"
      ) : (
        <ul classname={classes.list}>
          {list.map((investor) => (
            <InvestorItem
              id={investor._id}
              name={investor.name}
              image={investor.image}
              description={investor.description}
              publicKey={investor.publicKey}
            />
          ))}
        </ul>
      )}
    </>
  );
}

export default InvestorList;