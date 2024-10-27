import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET;

const validateToken = (req, res, next) => {

    // Get the user from the jwt token and add to request object
    const token = req.header('auth-token');
    if (!token) {
        res.status(401).send({error: "Unauthorized"});
    }
    
    try {
        
        const data = jwt.verify(token, JWT_SECRET);
        req.user = data.user;
        next();

    } catch (error) {
        res.status(401).send({error: "Unauthorized"});
    }

}

export default validateToken;