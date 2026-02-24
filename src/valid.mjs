import express from 'express'
import { createUserValidatioSchema } from './utils/validationSchema.mjs'
import { validationResult, matchedData, checkSchema } from "express-validator";
let path=5000
const app=express()
const users=[{id:1,username:"Gowtham"},
    {id:2,username:"Jaga"}
]
app.use(express.json()); // <--- Add this!
app.get('/api/users',(req,res)=>{
    res.status(200).send(users)
})
app.post('/api/users',
   checkSchema(createUserValidatioSchema),
   (req,res)=>{
              const result=validationResult(req);
                
               if(!result.isEmpty()){
                return res.status(400).send({error:result.array()});
              }
              const body=matchedData(req)
               const newUser={id:users[users.length-1].id+1,...body}
              users.push(newUser)
              return res.status(201).send(newUser)
})
app.listen(path,()=>{
    console.log(`Server Run at Port NUmber ${path}`)
})