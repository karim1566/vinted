import { useState, useEffect } from "react";
import axios from "axios";

const SHA256 = require("crypto-js/sha256");
const encbas64 = require("crypto-js/enc-base64");
const uid2 = require("uid2");

const fetchData = async () => {
    const response = await axios.get(
      `http://localhost:3000/login`
    );
    setOffer(response.data);
    setIsLoading(false);
  };
  useEffect(() => {
    fetchData();
  }, []);

const Authentificator = () => {
  return {
    const 


  };
};
export default Authentificator;
