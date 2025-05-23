// const JWT = require("jsonwebtoken");

// module.exports = async (req, res, next) => {
//   try {
//     //get token
//     const token = req.headers["authorization"].split(" ")[1];
//     JWT.verify(token, process.env.JWT_SECRET, (err, decode) => {
//       if (err) {
//         return res
//           .status(401)
//           .send({ message: "Unauthorized User", sucess: false });
//       } else {
//         req.body.id = decode.id;
//         next();
//       }
//     });
//   } catch (error) {
//     console.log(error);
//     res.status(500).send({ message: "Unauthorized", sucess: false, error });
//   }
// };

const JWT = require("jsonwebtoken");

module.exports = (req, res, next) => {
  try {
    const token = req.headers["authorization"]?.split(" ")[1];

    if (!token) {
      return res
        .status(401)
        .send({ message: "No token provided", success: false });
    }

    JWT.verify(token, process.env.JWT_SECRET, (err, decode) => {
      if (err) {
        return res
          .status(401)
          .send({ message: "Unauthorized User", success: false });
      }

      // Safely assign user id
      if (!req.body) req.body = {}; // Ensure req.body exists
      req.body.id = decode.id;

      next();
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Unauthorized", success: false, error });
  }
};
