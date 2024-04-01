const router = require("express").Router();

router.get("/", (req, res) => {
  res.json("All good in here");
});

const itemsRouter = require("./items.routes");
router.use("/items", itemsRouter);

module.exports = router;
