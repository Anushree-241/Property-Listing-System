require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(()=>console.log('MongoDB Connected!'))
.catch((err)=>{
    console.error('MongoDB connecion error:',err);
    process.exit(1);
});

app.get('/',(req,res)=>{
    res.send("API is running");
});

app.use('/api/auth', require('./routes/auth'));

app.use('/api/properties', require('./routes/Property'));

app.use('/api/favorites', require('./routes/favorite'));

app.use('/api/recommend', require('./routes/recommend'));

app.listen(PORT,()=>{
    console.log(`Server running on port ${PORT}`);
});