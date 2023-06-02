const router = require('express').Router();
const userRouter = require('./users');
const cardRouter = require('./cards');
const SignInRouter = require('./sign-in');
const SignUpRouter = require('./sign-up');

router.use(userRouter);
router.use(cardRouter);
router.use(SignInRouter);
router.use(SignUpRouter);

module.exports = router;
