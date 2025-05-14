import { Router } from 'express';
import {
    allPayments,
    buySubscription,
    cancelSubscription,
    verifySubscription
} from '../controller/paymentController.js';
import { authorizedRole, isLoggedIn } from '../middleware/authMiddleware.js';

const router = Router();

router.get('/', isLoggedIn, authorizedRole('ADMIN'), allPayments);
router.post('/subscribe', isLoggedIn, buySubscription);
router.post('/verify', isLoggedIn, verifySubscription);
router.post('/unsubscribe', isLoggedIn, cancelSubscription);

export default router;















// import { Router } from 'express'
// import { allPayments, buySubscription, cancelSubscription, getRazorpayKey, verifySubscription } from '../controller/paymentController.js'
// import { authorizedRole, isLoggedIn } from '../middleware/authMiddleware.js'

// const router = Router()

// router.get('/', isLoggedIn, authorizedRole('ADMIN'), allPayments)
// router.get('/key', isLoggedIn, getRazorpayKey)
// router.post('/subscribe', isLoggedIn, buySubscription)
// router.post('/verify', isLoggedIn, verifySubscription)
// router.post('/unsubscribe', isLoggedIn, cancelSubscription)


// export default router