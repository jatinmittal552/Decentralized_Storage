import { useContext, useEffect, useState } from "react";
import { fetchStorage } from "../utils/tzkt";
import "./Modal.css";
import { tezos } from "../utils/tezos";
import { getAccount } from "../utils/wallet";
 import {VscChromeClose} from "react-icons/vsc"
import { context } from "../App";



const Modal = ({ setModalOpen })=> {
 
  const [contract, setContract] = useState(null);
  const [rm,setRm] = useState(null);
  const [loading,setLoading] = useState(false);
  const remove=(e)=>{
    setRm(e.target.value);
    console.log(e.target.value)
      }

  const removeDevice = async () => {
    if(rm && rm != "people with access"){
      try{
        const contract = await tezos.wallet.at("KT1AoZSGkYUaVDhNc4njfdVy6L7FbfSpyLWz");
        const op = await contract.methods.disallow(rm).send();
        setLoading(true);
        await op.confirmation(1);
        setLoading(false);
        alert("Address successfully removed");
        window.location.reload();



    }catch(error){
      console.log(error);
    }}
    else{
      alert("Choose anyone password");
    }
  }
  const sharing = async () => {
    
    
      const address = document.querySelector(".address").value;
      console.log(address);
      if(address){
        try{
          const address = document.querySelector(".address").value;
          const contract = await tezos.wallet.at("KT1AoZSGkYUaVDhNc4njfdVy6L7FbfSpyLWz");
          // setContract(contract)
          const op =await contract.methods.allow(address).send();
          setLoading(true);
          await op.confirmation(1);
          setLoading(false);
          alert("Successfully added");
          window.location.reload();

         
        }
        catch(err){
          alert("Enter valid address");
          // console.log(err);
          // throw err;
        } 

      }else{
        alert("Enter wallet address");
      }

    
  };
  useEffect(() => {
    
    // (async () => {
    const accessList = async () => {
      const account = await getAccount();
      const storage = await fetchStorage();
      const my_m = storage.access_user;
      if(my_m.hasOwnProperty(account)){
        const my_l = my_m[account];
        
        const l = Object.keys(my_l);
        
        let select = document.querySelector("#selectNumber");
        for (let i = 0; i < l.length; i++) {
          let opt = l[i];
          console.log(l[i]);
          let e1 = document.createElement("option");
          e1.textContent = opt;
          e1.value = opt;
          select.appendChild(e1);
        }
      }
    };
    accessList();
  // })();
  }, []);
  return (
    <>
    <div 
      style={{
        paddingTop: '75px'
      }}
      ></div>

      <div className="modalBackground">
       <div className="modalContainer">

         <div className="img" >
          <VscChromeClose onClick={() => {
                setModalOpen(false);
              }} style={{marginLeft:"96%",fontSize:"25px",cursor:"pointer"}} /> 
          <img   src="https://media.istockphoto.com/id/1344021555/photo/blocks-with-locks-on-dark-blue-background-future-innovation-blockchain-technology-token-money.jpg?b=1&s=170667a&w=0&k=20&c=CgTveKWIUY7mVdbvRqdpx93afQ35MuLn5MGZIVEOYAU=" style={{paddingTop:"15px",height:"202px"}}
          />
         </div>

          <div className="body">
            <input
              type="text"
              className="address"
              placeholder="Enter Wallet Address"

            ></input>
          </div>
        
         
         <div className="footer" style={{marginLeft:"4px"}}>
      
            <button  onClick={(e) => sharing()}>Share</button>
            </div>
   
              
            <select id="selectNumber" className="" onChange={(e)=>remove(e)}>
              <option className="option" >people with access</option>
              </select>
            
           <div className="footer" style={{marginTop:"6px",marginLeft:"8px"}}>    <button onClick = {()=>removeDevice()}style={{background:"red"}}  >Remove Access</button></div>
           {loading? 
        <div className="ModalBackground">
        <div class="loader"></div>
      </div>
        : null}
          
           
       </div>
      </div>
      
    </>
  );
};
export default Modal;