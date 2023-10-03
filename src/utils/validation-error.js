const AppError = require('./error-handler')
const {StatusCodes} = require('http-status-codes');

class ValidationError extends AppError{
    constructor(error){
        let name = error.name;
        let explanation = [];
        // as we are using mysql2, the error is an array of errors
        // same will be the case for other databases like postgres, mongo, etc
        error.errors.forEach(element => {
            explanation.push(element.message)
        })
        super(
            name,
            'Not able to validate the data sent in the request',
            explanation,
            StatusCodes.BAD_REQUEST,

        )
    }
}

module.exports = ValidationError;