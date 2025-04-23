const {constants} = require
const errorHandler = (err, req, res, next) => {
    const statusCode = res.statusCode ? res.statusCode : 500;
    switch(statusCode){
        case constants.ValidationError:
            res.status(400);
            res.json({
                title: 'Bad Request',
                message: err.message,
                stack: process.env.NODE_ENV === 'production' ? null : err.stack
            });
            break;
        case constants.UnauthorizedError:
            res.json({
                title: 'Unauthorized',
                message: err.message,
                stack: process.env.NODE_ENV === 'production' ? null : err.stack
            });
            break;
        case constants.NotFoundError:
            res.json({
                title: 'Not Found',
                message: err.message,
                stack: process.env.NODE_ENV === 'production' ? null : err.stack
            });
            break;
        case constants.ServerError:
            res.status(500);
            res.json({
                title: 'Server Error',
                message: err.message,
                stack: process.env.NODE_ENV === 'production' ? null : err.stack
            });
            break;
        default:
            console.log('No error, all good!');
    }
    // res.status(statusCode).json({
    //     success: false,
    //     message: err.message,
    //     stack: process.env.NODE_ENV === 'production' ? null : err.stack
    // });
};

module.exports = errorHandler;