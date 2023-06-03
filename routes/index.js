const router = require('express').Router();
const userRouter = require('./users');
const cardRouter = require('./cards');
const SignInRouter = require('./sign-in');
const SignUpRouter = require('./sign-up');
const { auth } = require('../middlewares/auth');

router.use(auth, userRouter);
router.use(auth, cardRouter);
router.use(SignInRouter);
router.use(SignUpRouter);

module.exports = router;
