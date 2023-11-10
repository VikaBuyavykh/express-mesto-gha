const { Router } = require("express");
const userRouter = require("./users");
const cardRouter = require("./cards");

const router = Router();

router.use('/users', userRouter);
router.use('/cards', cardRouter);
router.get('*', (req, res) => {
  res.status(404).send({"message": "Страница не найдена"});
})

module.exports = router;