const { validationResult } = require('express-validator');

// middleware for formatting errors from express-validator middleware
// (to customize, see express-validator's documentation)
const handleValidationErrors = (req, _res, next) => {
    const validationErrors = validationResult(req);
  
    // if (!validationErrors.isEmpty()) {
    //   const errors = validationErrors
    //     .array()
    //     .map((error) => `${error.msg}`);
    if (!validationErrors.isEmpty()) {
      const obj = {};
      const errors = validationErrors
        .array()
        .forEach((error) => {
          let key = error.param;
          let value = error.msg; 
          if (key) {
            obj[key] = value;
          }
      })
      const err = Error('Validation Error');
      err.errors = obj;
      err.status = 400;
      err.title = 'Validation Error';
      next(err);
    }
    next();
};
  
module.exports = {
    handleValidationErrors
};
