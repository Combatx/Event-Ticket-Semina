const { UnauthorizedError, UnauthenticatedError } = require("../errors");
const { isTokenValid } = require("../utils/jwt");

const authenticateUser = async (req, res, next) => {
  try {
    let token;

    // check header
    const authHeader = req.headers.authorization;

    if (authHeader && authHeader.startsWith("Bearer")) {
      token = authHeader.split(" ")[1];
    }

    if (!token) {
      throw new UnauthenticatedError("Autentication invalid");
    }

    const payload = isTokenValid({ token });

    // Attach the user and his permission to req object
    req.user = {
      email: payload.email,
      role: payload.role,
      name: payload.name,
      organizer: payload.organizer,
      id: payload.userId,
    };

    next();
  } catch (err) {
    next(err);
  }
};

const authorizeRoles = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      throw new UnauthorizedError("Unauthorized to access  this route");
    }
    next();
  };
};

module.exports = { authenticateUser, authorizeRoles };
