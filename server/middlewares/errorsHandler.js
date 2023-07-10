module.exports = async (error, request, response, next) => {
  let status = error.name || 500;
  let message = error.message || "Internal Server Error";
  switch (error.name) {
    case "SequelizeValidationError":
      status = 400;
      message = error.errors.map((el) => el.message);
      break;
    case "statusError":
      status= 401;
      message = "Status Invalid";
      break;
    case "EmailPasswordEmpty":
      status = 400;
      message = "Email and password is required";
      break;
    case "Unauthenticated":
    case "JsonWebTokenError":
      status = 401;
      message = "Unauthenticated access";
      break;
    case "emailPasswordFalse":
      status = 401;
      message = "Email or password is invalid";
      break;
    case "Forbidden":
      status = 403;
      message = `You are not authorized`;
      break;
    case "NotFound":
      status = 404;
      message = `Lodging is not found`;
      break;
    case "SequelizeUniqueConstraintError":
      status = 409;
      message = error.errors.map((el) => el.message);
      break;
  };
  response.status(status).json({ message });
};
