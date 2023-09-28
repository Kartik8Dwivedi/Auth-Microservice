const UserRepository = require('../repository/user-repository')
const jwt = require('jsonwebtoken');

const { JWT_SECRET_KEY } = require('../config/serverConfig')
class UserService{
    constructor(){
        this.userRepository = new UserRepository();
    }

    async create(data){
        try {
            const user = await this.userRepository.create(data)
        } catch (error) {
            console.log("Something went wrong in the service layer")
            throw error;
        }
    }

    createToken(user) {
        try {
            const result = jwt.sign(user, JWT_SECRET_KEY, { expiresIn: '24h' });
            return result;
        } catch (error) {
            console.log("Something went wrong in token creation")
            throw error;
        }
    }

    verifyToken(token){
        try {
            const response = jwt.verify(token, JWT_SECRET_KEY);
            return response;
        } catch (error) {
            console.log("Something went wrong in token verification")
            throw error;
        }
    }
}

module.exports = UserService;