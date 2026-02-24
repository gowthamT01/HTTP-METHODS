import { Router } from "express";
import {getDataIndexById,getDataIdByID} from '../utils/middleware.mjs'
const router=Router();
const datas=[
    {id:1,name:"pev",age:"20"},
    {id:2,name:"cav",age:"22"},
    {id:3,name:"bav",age:"21"}
]
router.get('/',(req,res)=>{
    res.status(200).send(datas)
})
router.get("/api/datas/:id",(req,res)=>{
   const Did=parseInt(req.params.id)
   if(isNaN(Did)){
    return res.status(400).send({msg:"Bad Request "})
   }
   const data=datas.find(data=>data.id===Did)
   if(data){
       return res.status(200).send(data)
   }
   return res.status(404).send({msg:"Data Not Found"})

})
//==put
router.put('/api/datas/:id',getDataIndexById,(req,res)=>{
   const dataIndex=req.dataIndex;
   const {body}=req
   datas[dataIndex]={...datas[dataIndex],...body}

   return res.status(200).send({msg:"Updated"})
})
//pathch
router.patch('/api/datas/:id',getDataIndexById,(req,res)=>{
   const dataIndex=req.dataIndex
   const {body}=req;
   datas[dataIndex]={...datas[dataIndex],...body}
   return res.status(200).send({msg:"Patchecd"})
})
export default router