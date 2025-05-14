// authMiddleware.js
import createError from "../utils/error.js";
import JWT from 'jsonwebtoken';
import User from '../models/userModel.js';

export const isLoggedIn = async (req, res, next) => {
    const { token } = req.cookies;

    if (!token) {
        return next(createError(401, "Please log in again"));
    }

    try {
        const decoded = JWT.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decoded.id).select('+subscription.status');
        console.log("Decoded ID:", decoded.id);
        console.log("Fetched User:", user); // << Add this line


        if (!user) {
            return next(createError(401, "User not found"));
        }

        req.user = user; // Attach full user object to request
        next();
    } catch (err) {
        return next(createError(401, "Invalid token, please log in again"));
    }
};

export const authorizedRole = (...roles) => async (req, res, next) => {
    const currentUserRole = req.user.role;
    if (!roles.includes(currentUserRole)) {
        return next(createError(403, "You do not have permission"));
    }
    next();
};

export const verifySubscription = async (req, res, next) => {
    try {
        const currentUserRole = req.user?.role;

        // Disable subscription check temporarily if subscription is undefined
        const subscriptionStatus = req.user?.subscription?.status ?? "inactive";

        if (currentUserRole !== 'ADMIN' && subscriptionStatus !== 'active') {
            return next(createError(403, "Please subscribe to access this"));
        }

        next();
    } catch (error) {
        return next(createError(500, "Server error in verifySubscription"));
    }
};


