const { Router } = require('express');
const userRouter = require('./users');
const cardRouter = require('./cards');
const auth = require('../middlewares/auth');

const router = Router();

router.use('/users', auth, userRouter);
router.use('/cards', auth, cardRouter);
router.get('*', (req, res) => {
  res.status(404).send({ message: 'Страница не найдена' });
});

module.exports = router;
