const express =require('express');
const mongoose=require('mongoose')
const cors=require('cors')

const app=express();


app.use(express.json())
app.use(cors());

mongoose.connect('mongodb://localhost:27017/mydatabase', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('Connected to MongoDB'))
.catch((err) => console.log('MongoDB connection error:', err));


  

app.get('/',(req,res)=>{
    res.send("hello world")
})

app.post("/submission",async(req,res)=>{
    try {
    const formData=req.body;
    console.log(formData);
    res.status(201).send('data recieved succesfully');
    } catch (error) {
    res.status(501).send('there was error')
    }
})

const port=5000;

app.listen(port,()=>{
    console.log("server is running")
})
