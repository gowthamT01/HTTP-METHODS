import express from 'express';

const app=express()
const PORT=3000;

const users=[
    {id:1,username:"Gowthu"},
    {id:2,username:"jaga"},
    {id:3,username:"Baja"},
    {id:4,username:"gaja"},
    {id:5,username:"routhu"},

]
//printing   
app.get('/api/users',(req,res)=>{
    res.send(users)
})
app.get('/api/users/:id',(req,res)=>{
    const id=parseInt(req.params.id)//parse int convert str to int
    if (isNaN(id)){//it check id int or nor
       return  res.status(404).send("bad Request invalid id")
    //if not int it return this and stop the running of code here 
    }

    const user=users.find((user)=>user.id===id)//it find id from the user object
    if(user){
        // here if the user is exist only the print the user details or else it not print enything
       return res.send(user)
    }
    res.status(404).send({msg:"User not found"})
})


app.listen(PORT,()=>{
    console.log(`${PORT} port  run Executed`)
})