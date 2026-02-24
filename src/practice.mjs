import express, { Router } from 'express'
import userRouter from './Router/users.mjs'
import cookieParser from 'cookie-parser'
let path=5001
const app=express()

const datas=[
    {id:1,name:"pev",age:"20"},
    {id:2,name:"cav",age:"22"},
    {id:3,name:"bav",age:"21"}
]
app.use(express.json())
app.use(userRouter)
app.use(userRouter)
app.use(cookieParser("Code io"))
app.get('/test/', (req, res) => {

    res.cookie("user", "admin", { maxAge: 60000,signed:true });

    res.send({
        msg: "Root",
        data: datas 
    });
});

//query 
app.get('/api/datas',(req,res)=>{
    const {query:{dfilter,value}}=req
    if(dfilter&&value){
        return res.send(datas.filter((data=>data[dfilter].toLowerCase().includes(value))))
       
    }
    res.send(datas)
})
//middle ware
app.use(express.json())
//post

app.post('/api/datas',(req,res)=>{
       console.log(req.body)
    const {body}=req;
    const newData={id:datas[datas.length-1].id+1,...body}
    datas.push(newData)
    return res.status(201).send(datas)
})
//==put
app.put('/api/datas/:id',(req,res)=>{
   const Did=parseInt(req.params.id)

   if(isNaN(Did)){
      return res.status(400).send({msg:"Bad Request "})
   }

   const dataIndex=datas.findIndex(data=>data.id===Did)

   if(dataIndex==-1){
       return res.status(404).send({msg:"User Not Found"})
   }

   const {body}=req
   datas[dataIndex]={...datas[dataIndex],...body}

   return res.status(200).send({msg:"Updated"})
})
//pathch
app.patch('/api/datas/:id   ',(req,res)=>{
     const Did=parseInt(req.params.id)

   if(isNaN(Did)){
      return res.status(400).send({msg:"Bad Request "})
   }

   const dataIndex=datas.findIndex(data=>data.id===Did)

   if(dataIndex==-1){
       return res.status(404).send({msg:"User Not Found"})
   }
   const {body}=req;
   datas[dataIndex]={...datas[dataIndex],...body}
   return res.status(200).send({msg:"Patchecd"})
})

//delete
app.delete('/api/datas/:id',(req,res)=>{
     const Did=parseInt(req.params.id)

   if(isNaN(Did)){
      return res.status(400).send({msg:"Bad Request "})
   }

   const dataIndex=datas.findIndex(data=>data.id===Did)

   if(dataIndex==-1){
       return res.status(404).send({msg:"User Not Found"})
   }
   datas.splice(dataIndex,1);
   res.status(200).send({msg:"deleted"})
})
app.listen(path,()=>{
    console.log(`Server at Port number ${path}`)
})