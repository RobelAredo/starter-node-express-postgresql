function asyncErrorBoundary(delegate, defaultStatus) {
  return (req, res, next) => {
    Promise.resolve()
      .then(() => delegate(req, res, next))
      .catch((error = {}) => {
        const { status = defaultStatus, message = error} = error;
        next({ status, message });
      });
  };
}

// function asyncErrorBoundary(func, defaultStatus) {
//   return async (req, res, next) => {
//     try {
//       return func(req, res, next);
//     } catch (error) {
//       error = error ? error : {};
//       const { status = defaultStatus, message = error} = error;
//       return({ status, message });
//     }
//   }
// }

module.exports = asyncErrorBoundary;