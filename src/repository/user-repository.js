const { ValidationError } = require('sequelize');
const { User,Role } = require('../models/index');
const ClientError = require('../utils/client-error');
const { StatusCodes } = require('http-status-codes');
class UserRepository{

    async create(data){
        try {
            const user = await User.create(data)
            return user;
        } catch (error) {
            if(error.name == 'Sequelizevalidationerror'){
                throw new ValidationError(error);
            }
            console.log("Something went wrong in repository layer")
            throw error;
        }
    }

    async destroy(id){
        try {
            await User.destroy({
                where:{
                    id
                }
            })
        } catch (error) {
            console.log("Something went wrong in repository layer")
            throw error;
        }
    }

    async getByEmail(email){
        try {
            const response = await User.findOne({
                where:{
                    email
                }
            })
            if(!response){
                throw new ClientError(
                    'AttributeNotFound',
                    'Invalid email',
                    'Please check the email you have entered',
                    StatusCodes.NOT_FOUND
                )
            }
            return response;
        } catch (error) {
            console.log("Something went wrong in repository layer")
            throw error;
        }
    }
    
    async getById(userId){
        try {
            const user = await User.findByPk(userId, {
                attributes: ['email', 'id']
            })
            return user;
        } catch (error) {
            console.log("Something went wrong in repository layer")
            throw error;
        }
    }

    async isAdmin(userId){
        try {
            const user = await User.findByPk(userId)
            const adminRole = await Role.findOne({
                where:{
                    name: 'ADMIN'
                }
            })
            return user.hasRole(adminRole)
        } catch (error) {
            console.log("Something went wrong in repository layer")
            throw error;
        }
    }
}

module.exports = UserRepository;