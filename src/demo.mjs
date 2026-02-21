import express from "express";

const app = express();
const port = 3001;

const user = [
    { id: 1, name: "gt" },
    { id: 2, name: "RT" }
];
const products=[
 {id:1,product:"soap"},
    {id:2,product:"shampoo"},
    {id:3,product:"pant"},
    {id:4,product:"Shirt"},
    {id:5,product:"shoe"}
]

app.get('/api/user', (req, res) => {
    res.send(user);
    console.log(req.query)
});
app.get('/api/user/:id',(req,res)=>{
    const id=parseInt(req.params.id)
    if (isNaN(id)){
        return res.status(404).send("Give me valis url")
    }
    const finduse=user.find((use)=>use.id===id)
    if(finduse){
      return  res.send(finduse)
    }
    res.status(404).send({msg:"Give me valid use"})
})
app.get('/api/products/:id',(req,res)=>{
    //http://localhost:3001/api/products/3
    //here getting id from front end`give charconver as int
    const id=parseInt(req.params.id)
    //if given i/p is not a number then it will print
    if(isNaN(id)){


        return res.status(404).send("Give me proper product  id in integer")
    }
    //here find the product by id
    const prod=products.find(prod=>prod.id===id)
    if(prod){
        //if prduct exist the nit will execute
        return res.send(prod)
    }
    //else it give error
    res.status(404).send({msg:"Give me proper product id"})
})

//Query Paramaeter
//localhost:3000/user?filter=user_name&value=go

 app.use(express.json());

//========post========
app.post('/api/products',(req,res)=>{
    console.log(req.body)
    
    const {body}=req;
    const newProd={id:products[products.length-1].id+1,...body}
    products.push(newUser);
   return res.status(201).send(newProd)

})


app.post('/api/user',(req,res)=>{
    console.log(req.body)
    const {body}=req;
    const newUser={id:user[user.length-1].id+1,...body}
    user.push(newUser)
    return res.status(201).send(user)
})


//=======PUT=========
app.put('/api/user/:id',(req,res)=>{
    const id=parseInt(req.params.id)
    if(isNaN(id)){
        return res.send({msg:"Plz ensure to integer user id"})
    }
    const userIndex=user.findIndex((user)=>user.id===id)
    if(userIndex===-1){
        return res.status(400).send({msg:"user not fount"})
    }
    const {body}=req;
    user[userIndex]={id:id,...body}
    return res.status(200).send({msg:"Updated"})
})
app.put('/api/products/:id',(req,res)=>{
    const Pid=parseInt(req.params.id)
    if(isNaN(Pid)){
        return res.status(400).send({msg:"Plz ensure to give inter Product id"})
    }
    const productId=products.findIndex(prod=>prod.id===Pid)
    if(productId==-1){
        res.status(400).send({msg:"Product not Found"})
    }
    const {body}=req;
    products[productId]={id:Pid,...body}
    res.send(products)
    return res.status(200).send({msg:"Product Updated"})
})


//==========PATCH===========
app.patch('/api/user/:id', (req, res) => {
    const Uid = parseInt(req.params.id);

    if (isNaN(Uid)) {
        return res.status(400).send("Bad Request, Give valid id");
    }

    const userIndex = user.findIndex(u => u.id === Uid);

    if (userIndex === -1) {
        return res.status(404).send({ msg: "User Not Found" });
    }

    const { body } = req;

    user[userIndex] = { ...user[userIndex], ...body };

    return res.status(200).send(user[userIndex]);
});

app.patch('/api/products/:id',(req,res)=>{
    const Pid=parseInt(req.params.id)
    if(isNaN(Pid)){
        return res.status(400).send({msg:"Bad request,give valis id"})
    }
    const productIndex=products.findIndex(prod=>prod.id===Pid)
    if(productIndex==-1){
        return res.status(400).send({msg:"File not Fount"})
       
    }
    const {body}=req;
     products[productIndex]={...products[productIndex],...body}
     res.status(200).send(products[productIndex])

})


///========Delete=========
app.delete('/api/user/:id',(req,res)=>{
    const Uid=parseInt(req.params.id)
    if(isNaN(Uid)){
        return res.status(400).send({msg:"Bad Request"})
    }
    const userIndex=user.findIndex(user=>user.id===Uid)
    if(userIndex==-1){
      return  res.status(404).send({msg:"File Not Found"})
    }
    user.splice(userIndex,1)
    res.status(200).send({msg:"Deleted"})

})

app.delete('/api/products/:id',(req,res)=>{
    const Pid=parseInt(req.params.id)
    if(isNaN(Pid)){
        return res.status(404).send({msg:"bade request"})

    }
    const productIndex=products.findIndex(prod=>prod.id===Pid)
    if(productIndex===-1){
        return res.status(404).send({msg:"File Not Found"})

    }
    products.splice(productIndex,1)
    res.status(200).send({msg:"File as been deleted"})
})
app.listen(port, () => {
    console.log(`Server running successfully at http://localhost:${port}`);
});