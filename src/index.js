const express = require('express')
const bodyParser = require('body-parser');

const { PORT } = require('./config/serverConfig');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const apiRoutes = require("./routes/index");
app.use('/api', apiRoutes);

const prepareAndStartServer = () => {
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`); 
    });
}

prepareAndStartServer();
