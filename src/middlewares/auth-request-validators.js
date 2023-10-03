const validateAuth = (req, res, next) => {
    if(!req.body.email || !req.body.password){
        return res.status(400).json({
            message: "Email and password are required",
            data: {},
            success: false,
            err: 'Email or Password are missing'
        })
    }
    next();
}

const validateIsAdminRequest = (req, res, next) => {
    console.log("USERID::",req.body.userId)
    if(!req.body.userId){
        return res.status(400).json({
            message: "User id is required",
            data: {},
            success: false,
            err: 'User id is missing'
        })
    }
    next();dddd
}

module.exports = {
    validateAuth,
    validateIsAdminRequest
}