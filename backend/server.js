const express = require('express');
const bannerRoutes = require('./routes/bannerRoutes');
const connectDB = require("./config/db.js");
require('dotenv').config();
const cors = require('cors');
const path = require('path');


connectDB();
const app = express();
app.use(cors());

app.use(express.json());

app.use('/api/banner', bannerRoutes);

// deployment code

const __dirname1 = path.resolve();
if(process.env.NODE_ENV === "production"){
    app.use(express.static(path.join(__dirname1, '/frontend/build')));

    app.get('*', (req, res)=>{
        res.sendFile(path.resolve(__dirname1, "frontend", "build","index.html"));
    })
}else{

}

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
