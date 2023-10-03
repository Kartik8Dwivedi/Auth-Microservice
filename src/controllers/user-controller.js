const UserService = require('../service/user-service')

const userService = new UserService;

const create = async (req,res) => {
    try {
        const response = await userService.create({
            email: req.body.email,
            password: req.body.password
        });
        return res.status(201).json({
            message: "User created",
            data: response,
            success: true,
            err: {}
        })
    } catch (error) {
        console.log(error)
        return res.status(error.statusCode).json({
            message: "Something went wrong",
            data: {},
            success: false,
            err: error.explanation
        })
    }
}

const signIn = async (req,res) => {
    try {
        const response = await userService.signIn(req.body.email, req.body.password);
        return res.status(200).json({
            message: "User signed in",
            data: response,
            success: true,
            err: {}
        })
    } catch (error) {
        return res.status(400).json({
            message: "Something went wrong",
            data: {},
            success: false,
            error
        })
    }
}

const isAuthenticated = async (req,res) => {
    try {
        const token = req.headers['x-access-token'];
        const response = await userService.isAuthenticated(token);        
        return res.status(200).json({
            message: "User signed in",
            data: response,
            success: true,
            err: {}
        })
    } catch (error) {
        return res.status(400).json({
            message: "Something went wrong",
            data: {},
            success: false,
            error
        })
    }
}

const isAdmin = async (req,res) => {
    try {
        const response = await userService.isAdmin(req.body.userId);
        console.log("RESPONSE: ", response)
        return res.status(200).json({
            message: "User is admin",
            data: response,
            success: true,
            err: {}
        })
    } catch (error) {
        return res.status(400).json({
            message: "Something went wrong",
            data: {},
            success: false,
            error
        })
    }
}

module.exports = {
    create,
    signIn,
    isAuthenticated,
    isAdmin,
}