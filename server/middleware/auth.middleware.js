import jwt from "jsonwebtoken";

const auth = async (req, res, next) => {
  try {
    // console.log('REQ: ',req.headers)
    const token = req.headers.authorization.split(" ")[1];
    const isCustomAuth = token.length < 500;

    let decodedData; //data that we want from the token itself

    if (token && isCustomAuth) {
      decodedData = jwt.verify(token, process.env.JWT_SECRET);

      req.userId = decodedData?.id;
    } else {
      decodedData = jwt.decode(token);

      req.userId = decodedData?.sub;
    }
    next();
  } catch (error) {
    console.log('Error in JWT: ', error);
  }
};

export default auth;
