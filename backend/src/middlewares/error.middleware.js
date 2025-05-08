
//! global eeror handler

const error = (err, req, res, next) => {

    err.message = message,
    err.statusCode = statusCode || 500

    res.status(err.statusCode).json({
        success: false,
        message : err.message,
        errObj : err
    })
}


export{error}