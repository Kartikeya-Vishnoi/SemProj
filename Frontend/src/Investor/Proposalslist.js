import { useEffect, useState } from "react"
import ProposalItem from "./ProposalItem"
import classes from "./Proposalslist.module.css"
function Proposalslist(props){
  const[list, setList] = useState([]);
  useEffect(()=>{
    setList(props.list);
  },
  [])
  console.log(props.list)
  function removeproposal(id){
    setList((prev) => {prev.filter((element) => element !== id)})
    console.log(list);
  }
  
  return(
    <ul className={classes.list}>
      {list.map(item => (
        <ProposalItem proposal={item} removeproposal={removeproposal}/>
      ))}  
    </ul>
  )
}
export default Proposalslist