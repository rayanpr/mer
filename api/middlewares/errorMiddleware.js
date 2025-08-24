
const errorMiddlware = (err, req, res, next) => {
    const statusCode =  err.statusCode || 500 ;   
    const message = err.message || "Something went wrong";
    
    res.status(500).json({
        success: false,
        statusCode,
        message
    })
}

export default errorMiddlware