const InputError = require('../exceptions/InputError');

//middleware untuk menangani pre-response
const errorHandler = (err, req, res, next) => {
  // if (err instanceof InputError){
  //   return res.status(err.statusCode).json({
  //     status: 'fail',
  //     message: `${err.message} Silahkan gunakan foto lain.`
  //   });
  // }

  if (err.isBoom){
    return res.status(err.statusCode).json({
      status: 'fail',
      message: err.message
    })
  }
  next(err);
};

module.exports = errorHandler;