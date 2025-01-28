export const errorHandler = (err, req, res, next) => {
    console.log(err.stack);
    res.status(500).json({message: "An unexpected error occured", error: err.message})
}

