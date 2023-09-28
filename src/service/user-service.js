const UserRepository = require('../repository/user-repository')
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const { JWT_SECRET_KEY } = require('../config/serverConfig')
class UserService{

    constructor(){
        this.userRepository = new UserRepository();
    }

    async signIn(email, password){
        try {
            // fetch user by email
            const user = await this.userRepository.getByEmail(email);
            if(!user){
                throw new Error("User not found");
            }

            // compare passwords
            const isPasswordValid = this.#checkPassword(password, user.password);
            if(!isPasswordValid){
                console.log("Password is invalid")
                throw new Error("Invalid password");
            }

            // create token
            const token = this.createToken({
                email: user.email,
                id: user.id
            });
            return token;
        } catch (error) {
            console.log("Something went wrong in the service layer")
            throw error;
        }
    }

    async create(data){
        try {
            const user = await this.userRepository.create(data)
            return user;
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

    #checkPassword(password, encryptedPassword){
        try {
            const response = bcrypt.compareSync(password, encryptedPassword);
            return response;
        } catch (error) {
            console.log("Something went wrong in password comparison")
            throw error;
        }
    }

    async isAuthenticated(token){
        try {
            const isVerified = this.verifyToken(token);
            if(!isVerified){
                throw {error: "Invalid token"}
            }
            const user = await this.userRepository.getById(isVerified.id);
            if(!user){
                throw {error: "User not found"}
            }
            return user.id;
        } catch (error) {
            console.log("Something went wrong in the service layer")
            throw error;
        }
    }

    async isAdmin(userId){
        try {
            return await this.userRepository.isAdmin(userId);
        } catch (error) {
           console.log("Something went wrong in the service layer")
             throw error;
        }
    }
}

module.exports = UserService;