import { useState,useEffect, useContext } from "react";
import { createContext } from "react";


// Components
import Navbar from "./components/Navbar";
import FileUpload from "./components/FileUpload"
import { getAccount } from "./utils/wallet";
import {tezos} from "./utils/tezos"
import Display from "./components/Display";
import Modal from "./components/Modal";


// const [account, setAccount] = useState("");

import { fetchStorage } from "./utils/tzkt";
import "./App.css";
const context=createContext({});
 const App = () => {

  const [account, setAccount] = useState(null);

  const [modalOpen, setModalOpen] = useState(false);


  


   const hlo= async () => {
      const account = await getAccount();
      setAccount(account);

    }
    useEffect(()=>{
      hlo();
    })


  return (


<context.Provider value={{account,setAccount,hlo}}>

 
    <div className="h-300">
    {!modalOpen && <Navbar />}

      {/* <Navbar /> */}
      <div 
      style={{
        paddingTop: '75px'
      }}
      ></div>
      {!modalOpen && (
        <button className="share" onClick={()=>setModalOpen(true)}>
          Share
        </button>
      )}
      {modalOpen && (
        <Modal setModalOpen={setModalOpen} ></Modal>
      )}
      
      

      <div className="App" style={{marginTop:"-55px"}}>
        <h1 style={{ color: "green",fontFamily:"sans-serif",fontWeight:"bold",textShadow:"5px 5px 5px 5px red"}}>BlockDrive</h1>
        <div class="bg"></div>
        <div class="bg bg2"></div>
        <div class="bg bg3"></div>

        <p style={{ color: "white" ,fontSize:"17px"}}>
          Account : {account ? account : "Not connected"}
        </p>
        <FileUpload account={account}
        ></FileUpload>
        <Display ></Display>
      </div>
    </div>
    </context.Provider>
      
  );
    
};

export default App;
export {context}

