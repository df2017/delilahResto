const dotenv = require('dotenv');
const db = require('./models/index');

dotenv.config({
    path: './config.env',
});

const app = require('./app');

const port = process.env.PORT;

app.listen(port, () => {
    console.log(`App running on port ${port}`);
});