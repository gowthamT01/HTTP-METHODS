 import express from 'express'
  const app=express()
  let path=5000

const users=[
    {id:1,username:"Gowthu"},
    {id:2,username:"jaga"},
    {id:3,username:"Baja"},
    {id:4,username:"gaja"},
    {id:5,username:"routhu"},

]
const products=[
 {id:1,productname:"soap"},
    {id:2,productname:"shampoo"},
    {id:3,productname:"pant"},
    {id:4,productname:"Shirt"},
    {id:5,productname:"shoe"}
]

app.get('/api/users',(req,res)=>{
    const {query:{filter,value}}=req//destructuring the req value for filter and valur
    //or 
  /*   req.query.filter
req.query.value */

//http://localhost/api/users?filter=username&value=ga
/* filter = "username"
value = "ga" */
if(filter &&  value){
    return res.send(users.filter((user=>user[filter].toLowerCase().includes(value) )))
}
    res.send(users)
})
//http://localhost:5000/api/products?filter=product&value=irt
app.get('/api/products',(req,res)=>{
    const {query:{eleFilter,value}}=req;
    if(eleFilter&&value){
        return res.send(products.filter(product=>product[eleFilter].toLowerCase().includes(value)))
    }
    res.send(products)
})


  app.listen(path,()=>{
    console.log(`Running at Path adrees ${path}`)
  })



  