import express from 'express'
let path=5001
const app=express()

const datas=[
    {id:1,name:"pev"},
    {id:2,name:"cav"},
    {id:3,name:"bav"}
]

//get
app.get('/',(req,res)=>{
    res.status(200).send(datas)
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


//delete
app.delete('/api/datas/:id',getDataIndexById,(req,res)=>{
     
    const dataIndex= req.dataIndex
   console.log(dataIndex)
   datas.splice(dataIndex,1);
   res.status(200).send({msg:"deleted"})
})
app.listen(path,()=>{
    console.log(`Server at Port number ${path}`)
})