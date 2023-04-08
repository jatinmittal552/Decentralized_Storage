import { useState , useContext } from "react";
import "./Display.css";
import { fetchStorage } from "../utils/tzkt";
import { getAccount } from "../utils/wallet";
import {VscChromeClose} from "react-icons/vsc";
import {RxCrossCircled} from "react-icons/rx";
import { tezos } from "../utils/tezos";
import { context } from "../App";


const Display = () => {
  const [data, setData] = useState(""); 
  const [account, setAccount] = useState(null);
  const [MyL,setMyL] = useState();
  const {loading,setLoading} = useContext(context);

  const getdata = async () => {
    const account = await getAccount();
    setAccount(account);
    let dataArray;
    const storage = await fetchStorage();
    const my_map = storage.user;
    

    if (my_map.hasOwnProperty(account)) {
      const my_list = my_map[account];
      dataArray = Object.keys(my_list);
      if(dataArray[0]){
          const str = dataArray.toString(); 
          const str_array = str.split(",");
          console.log(str_array);
          
          
          const images = str_array.map((item, i) => {
            return (
              <a key={i} >
                <img
                  key={i}
                  src={`https://gateway.pinata.cloud/ipfs/${item.substring(6)}`}
                  alt="new"
                  className="image-list"

                ></img>
                <RxCrossCircled style={{cursor:"pointer",display:"absolute",marginTop:"-515px",
                        color:"black",marginLeft:"130px",fontSize:"30px"}} onClick={()=>deleteImage(item)}/>
              </a>
            );
          });
          setData(images);
      }else{
        alert("No image to display");
      }
      
    }
     else {
      alert("No image to display");
    }
  };
  const getOtherData = async()  => {
    const account = await getAccount();
    setAccount(account);
    let dataArray;
    let d;
    const Otheraddress = document.querySelector(".address").value;
    const storage = await fetchStorage();
    if (Otheraddress && Otheraddress!=account) {
        const my_map = storage.user;
        if(my_map.hasOwnProperty(Otheraddress)){
          const my_list = my_map[Otheraddress];
          const my_L = Object.keys(my_list);
          if(my_L[0]){
              dataArray = my_L;
              const str = dataArray.toString();
              const str_array = str.split(",");
              const images = str_array.map((item, i) => {
                return (
                  <>
                  {/* <a href={item} key={i} target="_blank">
                   */}<a key={i}>
                    <img
                      key={i}
                      src={`https://gateway.pinata.cloud/ipfs/${item.substring(6)}`}
                      alt="new"
                      className="image-list"
                      style={{display:"relative"}}
                    ></img>
                    
                  </a>
                  </>
                );
              });
              setData(images);
            }else{
              alert("No image present at that address")
            }
        }else{
          alert("You don't have access");
        }
      }
      else{
        alert("Enter other wallet address");
      }

  };
  const hideOther = () => {
    const Otheraddress = document.querySelector(".address").value;
    if(Otheraddress && account){
      window.location.reload();
    }else{
      alert("No image to hide");
    }

  }

  const deleteImage = async (img) => {
    try{
      const contract = await tezos.wallet.at("KT1AoZSGkYUaVDhNc4njfdVy6L7FbfSpyLWz");
      // setContract(contract)
      const op =await contract.methods.deleteImg(img).send();
      await op.confirmation(1);
      alert("Removed Successfully");
      window.location.reload();
     
    }
    catch(err){
      alert("Try Again");
      
    } 


    
}
  return (
    <>
      <button className="center button" onClick={getdata} >
        Get Files
      </button>
      <button className="center button" onClick={()=>{
        window.location.reload();
      }} style={{background:"red",marginLeft:"10px"}}>
       Hide Files
      </button>
      {loading ? null :

      <div style={{display:"flex",marginLeft:"27%",marginBottom:"30px",marginTop:"30px"}}>

      <hr className="divider" style={{marginRight:"5px",width:"30%", height:"4px"}} /> 
      <span style={{marginTop:"-22px",fontWeight:"bold"}}>OR</span> 
      <hr className="divider" style={{marginLeft:"5px",fontSize:"25px", height:"4px",width:"30%"}} />
      </div>}
        
      <input
        type="text"
        placeholder="Enter Friend's Addresses"
        className="address"
      ></input>
      <button  onClick={getOtherData} className="ynn">
        Get Friend Files
      </button>
      {/* <button   onClick={()=>hideOther()} className="ynn" style={{background:"red",marginLeft:"10px"}}>
        Hide Others Data
      </button> */}
      <div 
      style={{
        paddingTop: '75px'
      }}
      ></div>

      <div style={{display:"flex",marginLeft:"2%",marginBottom:"30px",marginTop:"30px"}}>

      <hr className="divider" style={{marginRight:"5px",width:"40%", height:"4px"}} /> 
      <span style={{marginTop:"-22px",fontWeight:"bold",fontSize:"26px",marginLeft:"10px",marginRight:"10px",color:"blue"}}>Uploaded Images Display Below</span> 
      <hr className="divider" style={{marginLeft:"5px",fontSize:"25px", height:"4px",width:"40%"}} />
      </div>
      
      {data ? null : 
      <div>
        <div 
      style={{
        paddingTop: '30px'
      }}
      ></div>

      <p className="animated">Let's tap on get files</p>
    </div>
}
      <div className="image-list">{account ? data : null}</div>

    </>
  );
};
export default Display;