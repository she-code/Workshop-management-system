const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config({
    path: './api/.env'
});
const app = require('./app');
const { session } = require('passport');

const port = process.env.PORT || 3000;


//connection
mongoose.connect(process.env.MONGO_URL, {
    useCreateIndex: true,
    useUnifiedTopology: true,
    useNewUrlParser: true
}).then((con) => console.log('connected')).catch((err) => {
    console.log(err.message);
    throw err;
})


app.listen(port, () => {
    console.log('Server running on ', port)
})