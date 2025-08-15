
const errorMiddlware = (err, req, res, next) => {
    const statusCode =  res.statusCode || 500 ;   
    const message = err.message || "Something went wrong";
    
    res.status(500).json({
        seccess: false,
        statusCode,
        message
    })
}

export default errorMiddlware