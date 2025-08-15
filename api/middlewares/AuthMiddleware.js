import jwt from "jsonwebtoken";

const AuthMiddleware = (req, res, next) => {
    try {
        const token = req.cookies.accessToken;
        if (!token) return res.status(401).json("Not authenticated!");
        jwt.verify(token, process.env.JWT, (err, user) => {
            if (err) return res.status(403).json("Token is not valid!");
            req.user = user;
            next();
        });
    } catch (error) {
        next(error);
    }
};

export default AuthMiddleware