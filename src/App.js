const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const app = express();
app.use(express.json({ limit: '2500mb' }));
app.use(express.urlencoded({ limit: '2500mb', extended: true }));
const cors = require("cors");
const port = 5000;
const corsOptions = {
    origin: "*", // Allowed origins
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    allowedHeaders: '*', // Allow all headers
    credentials: true,
    optionsSuccessStatus: 200, // for legacy browsers
}
app.use(cors(corsOptions));
require('./config');
const ServiceRoutes = require("./routes/servicesRoutes");
const AgeGroupRoutes = require("./routes/agesGroupRoutes");
const UserRoutes = require("./routes/userRoutes");
const ContactRoutes = require("./routes/contactRoutes");
const EventRoutes = require("./routes/eventRoutes");
const ResoureRoutes = require("./routes/resourceRoutes");
const WaitListRoutes = require("./routes/waitlistRoutes");

// app.use('/api', userRoutes);
app.use('/api', ServiceRoutes);
app.use('/api', AgeGroupRoutes);
app.use('/api',UserRoutes);
app.use('/api',ContactRoutes);
app.use('/api',EventRoutes);
app.use('/api',ResoureRoutes);
app.use('/api',WaitListRoutes);


app.get('/', (req, res) => {
    res.json({
        status : 200,
        message : "Hello From Backend !!"
    });
}) 

app.listen(port, () => {
    console.log(`Server Listening ${port}`)
});