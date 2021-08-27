const handleProfile=(req,res,postgres)=>{
    const {id}=req.params;
    postgres.select('*').from('users').where({
        id:id
    })
        .then(response=>{
            if(response.length){
                res.json(response[0])
            }
            else{
                res.status(404).json('user not found')
            }
        })
        .catch(err=>res.json('error'))
};

module.exports={
    handleProfile:handleProfile
}