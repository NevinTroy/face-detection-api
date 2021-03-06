const express=require('express');
const cors=require('cors');
const bcrypt=require('bcrypt-nodejs');
const knex=require('knex');

const register= require('./controllers/register');
const siginin=require('./controllers/signin');
const profile=require('./controllers/profile');
const image=require('./controllers/image');


const postgres=knex({
    client:'pg',
    connection:{
        host:'127.0.0.1',
        user:'postgres',
        password:'',
        database:'face_recognition'
    }
});


const app=express();

app.use(express.json());
app.use(cors());

app.get('/',(req,res)=>{
    res.send('Our app is working!!');
});

app.post('/signin',(req,res)=>{siginin.handleSignIn(req,res,postgres,bcrypt)});

app.post('/register',(req,res)=>{register.handleRegister(req,res,postgres,bcrypt)});

app.get('/profile/:id',(req,res)=>{profile.handleProfile(req,res,postgres)});

app.put('/image',(req,res)=>{image.handleImage(req,res,postgres)});

const host='0.0.0.0';
const port=process.env.PORT || 3000;
app.listen(port,host,()=>{
    console.log('Server started');
});
