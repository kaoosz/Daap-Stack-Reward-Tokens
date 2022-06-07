import React, {useState,useEffect, useContext } from 'react';
import Button from "react-bootstrap/Button";
import axios from "axios";

import { ethers } from "ethers"

import erc721abi from "../Abis/TokenERC721.json";
import erc721address from "../Abis/TokenERC721Address.json";
import erc1155abi from "../Abis/MyToken1155.json";
import erc1155address from "../Abis/TokenERC1155Address.json";


import MyContext from './Context';

const {REACT_APP_MY_API_ETHERSCAN} = process.env;


const begin = "https://api-rinkeby.etherscan.io/api"; 

const openseaapi = "https://testnets-api.opensea.io/api/v1/assets";
export var IMAGE_NFT = "https://ipfs.io/ipfs/QmT84J5XUE938MUxnhzcUGLnnfArrWsbeyhtcHXVHhewLL/";



export default function Stack(){

  const {accountz,erc721,setErc721,
    erc1155,setErc1155,signer} = useContext(MyContext); 

  const [ethercan, setEthercan] = useState([]);
  const [ethercan2, setEthercan2] = useState([]);
  
  const token = "0x26d7A80678cC0d8E90C415B8017229537ccC49EE";

  useEffect(() => {
    async function dados(){
      const requex = await axios.get(begin+`?module=account&action=tokennfttx&contractaddress=${token}&page=1&offset=200&tag=latest&apikey=${REACT_APP_MY_API_ETHERSCAN}`)
      setEthercan(requex.data.result);

    }
    dados();
  }, [])

  useEffect(() => {
    const unique = [...ethercan.reduce((map,obj) => map.set(obj.tokenID,obj),new
    Map()).values()];
    setEthercan2(unique);
    
  },[ethercan]);

  useEffect(() => {
    const contract = new ethers.Contract(erc721address.address,erc721abi.abi,signer);
    const contract2 = new ethers.Contract(erc1155address.address,erc1155abi.abi,signer);

    setErc721(contract);
    setErc1155(contract2);

  }, []);


  // @devs capture each MarketItemCreate event on blockchain...
  // useEffect(() => {
  //   async function evento(){
  //     await erc1155.on("MarketItemCreated",(nftContract,ownertoken,tokenId) =>{
  //       console.log(nftContract,ownertoken,tokenId.toString());
  //     })
  //   }
  //   evento();
  // },[]);


  async function UnStacking(id){
    if(accountz !== ""){
      const unstack = await erc1155.UnStack(erc721.address,id);
      console.log(unstack);
    }
  }

  async function Stacking(id){
    if(accountz !== ""){
      const stake = await erc1155.Stake(erc721.address,id);
      console.log(stake);
    }
  }

  return(
    <div className='App'>
      <div className='container'>
        <div className='row'>
          <div className='row items mt-3' >
          <div className='ml-3 mr-3' style={{display: "inline-grid",gridTemplateColumns: "repeat(4, 5fr)",columnGap: "10px"}}>
          {ethercan2.map((assets, index) => {
                index += 1;
                if(assets.to === accountz || assets.from === accountz){ 
                  return(
                    <div className='card' key={index}>
                      <div className='image-over'>
                        <img className='card-img-top' src={IMAGE_NFT + assets.tokenID + '.png'} alt=""/>
                        <div className='card-caption col-12 p-0'>
                          <div className='card-body'>
                            <h5 className='mb-0'> Token ID: {assets.tokenID} </h5>
                            <h5>Owner: <p style={{color: "#000000",fontWeight:"unset",textShadow: "1px 1px 2px #000000"}}></p>{assets.to}</h5>
                            <div className="card-bottom d-flex justify-content-between">
                            <Button onClick={() => Stacking(index)} className="btn btn-bordered-white btn-smaller mt-3">
                              <i className="mr-2" />Stack
                            </Button>
                            <Button onClick={() => UnStacking(index)} className="btn btn-bordered-white btn-smaller mt-3">
                              <i className="mr-2" />UnStack
                            </Button>
                            </div>
                          </div>
                        </div>
                      </div>                   
                    </div>
                  )
                }
                else if(assets.to === accountz){ 
                  return(
                    <div className='card' key={index}>
                      <div className='image-over'>
                        <img className='card-img-top' src={IMAGE_NFT + assets.tokenID + '.png'} alt=""/>
                        <div className='card-caption col-12 p-0'>
                          <div className='card-body'>
                            <h5 className='mb-0'> Token ID: {assets.tokenID} </h5>
                            <h5>Owner: <p style={{color: "#000000",fontWeight:"unset",textShadow: "1px 1px 2px #000000"}}></p>{assets.to}</h5>
                            <div className="card-bottom d-flex justify-content-between">
                            <Button onClick={() => Stacking(index)} className="btn btn-bordered-white btn-smaller mt-3">
                              <i className="mr-2" />Stack
                            </Button>
                            </div>
                          </div>
                        </div>
                      </div>                   
                    </div>
                  )
                }
                else if(assets.to !== accountz){
                  return(
                    <div className='card' key={index}>
                      <div className='image-over'>
                        <img className='card-img-top' src={IMAGE_NFT + assets.tokenID + '.png'} alt=""/>
                        <div className='card-caption col-12 p-0'>
                          <div className='card-body'>
                            <h5 className='mb-0'> Token ID: {assets.tokenID} </h5>
                            <h5>Owner: <p style={{color: "#000000",fontWeight:"unset",textShadow: "1px 1px 2px #000000"}}></p>{assets.to}</h5>
                            <div className="card-bottom d-flex justify-content-between">
                            </div>
                          </div>
                        </div>
                      </div>                   
                    </div>
                  )
                }
              }
              )
              }
      
          </div>
          </div>
        </div>
      </div>
    </div>
  )
}
  