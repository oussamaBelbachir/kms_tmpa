const devError = (err, res) => {
    return res.status(err.statusCode).json({
        status : err.status,
        message : err.message,
        error : err,
        stack : err.stack
    });
}

const prodError = (err, res) => {

    if(err.isOperational){
        return res.status(err.statusCode).json({
            status : err.status,
            message : err.message
        });
    }else{

        console.error(err);
        return res.status(500).json({
            status : "error",
            message : "Something went very wrong !"
        });
    }
}


module.exports = (err,req,res,next)=>{

    err.statusCode = err.statusCode || 500;
    err.status = err.status || "error";

    if(process.env.NODE_ENV === "development"){
        devError(err,res);

    }else if (process.env.NODE_ENV === "production"){
        prodError(err, res);
    }
    
}