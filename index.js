const express = require('express');
const dataservice=require('./services/dataservice');

app=express();
app.use(express.json())

app.post('/register',(req,res)=>{
    var sql = "INSERT INTO users(uname,email,password) VALUES(?,?,?);"
    dataservice.connection.query(sql,[req.body.uname,req.body.email,req.body.password],(err,rows,fields)=>{
        if(!err){
            res.status(200).json({
                status:true,
                statusCode:200,
                message:"sucess"
            })
        }
        else{
           
            res.status(422).json({
                status:false,
                statusCode:422,
                message:"already exists",
                error:err.sqlMessage
            })
        }
    })
 })

 app.post('/login',(req,res)=>{
    var sql='SELECT email,password FROM users WHERE email=?;'
    dataservice.connection.query(sql,[req.body.email],(err,rows,fields)=>{
        if(!err){
            if(rows[0].password==req.body.password){
                res.status(200).json({
                    status:true,
                    statusCode:200,
                    message:"login sucess",
                    
                })

            }
            
            res.status(422).send({
                status:false,
                statusCode:422,
                message:"email or password incorrect",
                
                
            })
        }
        else{
            res.status(422)
            res.send({
                status:false,
                statusCode:422,
                message:"email or password incorrect",
                
                
            })
        }
    })
})


app.listen(3000,()=>{
    console.log('listening');
})
 