require('dotenv').config()
const express=require('express')
const mongoose=require('mongoose')
const bodyParser = require('body-parser');
const userRoutes=require('./routes/userRoute')
const profileRoutes=require('./routes/profileRoute')
const stageRoutes=require('./routes/stageRoute')
//const { checkLaureatRole } = require('./middlewares/auth');

const app=express()
app.use(bodyParser.json());

app.use(express.json())

app.use((req,res,next)=>{ 
    console.log(req.path,req.method)
    next()
});
app.use('/api/user',userRoutes)
app.use('/api/profile',profileRoutes)
app.use('/api/stageLaureat',stageRoutes)
mongoose.connect(process.env.MONGO_URI)
.then(()=>{
    app.listen(process.env.PORT,()=>{
   console.log('Connected To db && listening on port',process.env.PORT)
})
})
.catch((error)=>{
   console.log(error)
})
