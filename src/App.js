

import {BrowserRouter as Router, Route, Routes } from "react-router-dom";

import React, {useState,useEffect, useContext } from 'react';

import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import 'bootstrap/dist/css/bootstrap.min.css'

import Stack from './components/Stack';
import Navegacao from './Navegation/Navegacao';
import Items from './components/Items';
import Footer from "./components/Footer";

import { ethers } from "ethers"


import useLocalStorage from './components/Hooks';

import MyContext from './components/Context';


 const provider = new ethers.providers.Web3Provider(window.ethereum)
 const signer = provider.getSigner()

export default function App() {

  const[accountz, setAccountz] = useLocalStorage("0");
  const[erc721, setErc721] = useState(null);
  const[erc1155, setErc1155] = useState(null); 
  const[contract, setContract] = useState(null); 


  useEffect(() => {
    window.ethereum.on('accountsChanged', async function (accounts) {
      setAccountz(accounts[0]);
    })
  },[accountz]);


  return (
    <Router>
      <MyContext.Provider value={{accountz, setAccountz,erc721,setErc721,
      erc1155,setErc1155,contract, setContract,provider,signer}}>
      <Navegacao />
      <Routes >     
        <Route path="/" element={<Items />} />     
        <Route path="/Items" element={<Items />} />     
        <Route path="/Stack" element={<Stack />} />
      </Routes>
      </MyContext.Provider>
      <Footer />
    </Router>
  )
}
