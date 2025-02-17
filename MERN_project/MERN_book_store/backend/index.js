import express from "express";
import  {PORT,MONGODBURL} from "./config.js";

const app = express();

app.get('/',(req,res)=>{
    res.send('hello world !!!');
})

app.listen(PORT,()=>{
    console.log(`app lstening on port : ${PORT}`);
});