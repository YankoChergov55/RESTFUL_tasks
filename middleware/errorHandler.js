export const errorHandler = (err, req, res, next) => {
  console.log(err.message);

  // Handle Joi validation errors
  if (err.isJoi) {
    return res.status(400).json({
      success: false,
      error: 'Validation Error',
      details: err.details[0].message
    });
  }

  // Handle Mongoose validation errors
  if (err.name === 'ValidationError') {
    return res.status(400).json({
      success: false,
      error: 'Validation Error',
      details: err.message
    });
  }

  // Handle other errors
  res.status(500).json({ 
    success: false,
    error: 'Server Error',
    details: err.message 
  });
};
