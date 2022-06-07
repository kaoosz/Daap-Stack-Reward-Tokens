import { useEffect,useContext } from "react"
import Button from "react-bootstrap/Button";
import "../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import 'bootstrap/dist/css/bootstrap.min.css'

import { ethers } from "ethers";

import MyContext from './Context';


export default function Items(){



   const {accountz,erc721,setErc721,
    erc1155,setErc1155,contract, setContract,provider,signer,setAccountz} = useContext(MyContext); 
   
   async function Conect(){
    const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
    setAccountz(accounts[0]);

  }

  useEffect(() => {
    document.getElementById("wallet-address").textContent = accountz;
  },[accountz]);

  async function Mint(){
    if(accountz !== ""){
      const cratetokens = await erc721.createTokens();
      console.log(cratetokens);
    }
  }

  return (
    <div className='Apptwo' >
      <div className='conteiner'></div>
      <div className="row"></div>
        <form className='gradient col-lg-5 mt-5' style={{borderRadius:"25px",boxShadow:"1px 1px 4px #000000"}}>
          <h4 style={{color:"#FFFFFF"}}>Wallet </h4>
          <h5 style={{color:"#FFFFFF"}}>Please Conect</h5>
          <Button onClick={Conect} style={{marginBottom:"5px"}}>Connect Wallet</Button>
          <div className='card' id='wallet-address' style={{marginLeft:"17px",marginRight:"17px", marginTop:"3px", boxShadow:"1px 1px 4px #000000"}}>
            <label htmlFor="floatingInput">Wallet Address </label>
            </div>
            <div className="card" id="wallet-address" style={{marginLeft:"17px",marginRight:"17px",boxShadow:"1px 1px 4px #000000"}}>
            <Button onClick={Mint} >Mint Your NFT</Button>
            </div>
          <label style={{color:"#FFFFFF"}}>No Fees to Mint </label>
        </form> 
    </div>
    
  )
}