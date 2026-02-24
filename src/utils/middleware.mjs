//Middle Ware
const datas=[
    {id:1,name:"pev",age:"20"},
    {id:2,name:"cav",age:"22"},
    {id:3,name:"bav",age:"21"}
]
export const getDataIndexById=(req,res,next)=>{
    const id=parseInt(req.params.id)
    if(isNaN(id)){
        return res.status(200).send({msg:"bad Request"})
    }
    const dataIndex=datas.findIndex(data=>data.id===id)
    if(dataIndex===-1){
        return res.status(404).send({msg:"File Not Found"})
    }
    req.dataIndex=dataIndex
    next()
}
//middeleware for id
export const getDataIdByID=(req,res,next)=>{
    const did=parseInt(req.params.id)
    if(isNaN(did)){
        return res.status(400).send({msg:"Badrequest"})
    }
    const id=datas.find(data=>data.id===did)
    req.id=id;
    next()

}