
//! global eeror handler

const error = (err, req, res, next) => {



//     //! Validation error 
if(err.name === "ValidationError"){
err.statusCode = 400,
err.message = Object.values(err.errors).map((ele) => ele.message)
}

// //! jsonWebTZokenError
if (err.name === "JsonWebTokenError") {
    err.statusCode = 401;
    err.message = "Please login again!";
}

    err.message = err.message,
    err.statusCode = err.statusCode || 500

    res.status(err.statusCode).json({
        success: false,
        message : err.message,
        errObj : err
    })
}


export{error}