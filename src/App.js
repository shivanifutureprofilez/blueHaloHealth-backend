const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const morgan = require("morgan")
const app = express();

app.use('/uploads', express.static('public/uploads'));

const cors = require("cors");
const port = process.env.PORT || 5000;

app.use(cors({
  origin: function (origin, callback) {
    if (!origin) return callback(null, true);
    return callback(null, true);
  },
  credentials: true
}));


app.use(morgan("tiny"));
require('./config');
require('./redisClient');


const AgeGroupRoutes = require("./routes/agesGroupRoutes");
const UserRoutes = require("./routes/userRoutes");
const ContactRoutes = require("./routes/contactRoutes");
const EventRoutes = require("./routes/eventRoutes");
const ResoureRoutes = require("./routes/resourceRoutes");
const WaitListRoutes = require("./routes/waitlistRoutes");
const TeamRoutes = require("./routes/teamRoutes");
const ServiceRoutes = require("./routes/servicesRoutes");


app.use(express.json({ limit: '2500mb' }));
app.use(express.urlencoded({ extended: true, limit: '2500mb' }));

app.use('/api', AgeGroupRoutes);
app.use('/api',UserRoutes);
app.use('/api',ContactRoutes);
app.use('/api',EventRoutes);
app.use('/api',ResoureRoutes);
app.use('/api',WaitListRoutes);
app.use('/api', TeamRoutes);
// app.use('/api', userRoutes);
app.use('/api', ServiceRoutes);


app.get('/', (req, res) => {
    res.json({
        status : 200,
        message : "Hello From Backend !!"
    });
}) 

app.get('/cache/status', (req, res) => {
    const cache = require('./redisClient');
    res.json({ redisReady: cache.isReady(), usingMemoryFallback: !cache.isReady() });
});

const isVercel = !!process.env.VERCEL;
if (!isVercel) {
  app.listen(port, () => {
      console.log(`Server Listening ${port}`)
  });
}

module.exports = app;
