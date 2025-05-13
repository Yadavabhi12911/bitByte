
//! global eeror handler

const error = (err, req, res, next) => {



    err.message = err.message,
    err.statusCode = err.statusCode || 500

    res.status(err.statusCode).json({
        success: false,
        message : err.message,
        errObj : err
    })
}


export{error}