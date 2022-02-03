const path = require('path');
const express  = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');
dotenv.config({path: './config/config.env'});

connectDB();

const app = express();

// Body Parser
app.use(express.json());
// Enable cors
app.use(cors());

app.use(express.static(path.join(__dirname, 'public')));

//Router
app.use('/api/v1/stores', require('./routes/stores'))


const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
})