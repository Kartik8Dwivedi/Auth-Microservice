const express = require('express')
const bodyParser = require('body-parser');

const db = require('./models/index');
const {User,Role} = require('./models/index');
const { PORT } = require('./config/serverConfig');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const apiRoutes = require("./routes/index");
app.use('/api', apiRoutes);

const prepareAndStartServer = () => {
    app.listen(PORT, async () => {
        console.log(`Server is running on port ${PORT}`); 
        if(process.env.DB_SYNC){
            db.sequelize.sync({alter: true})
        }
        /**
         
            const User1 = await User.findByPk(1)
            const Role1 = await Role.findByPk(1)
            User1.addRole(Role1);
         */

    });
}

prepareAndStartServer();
