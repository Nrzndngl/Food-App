const express = require("express");
const testControllers = require("../controllers/testControllers");

//router object
const router = express.Router();

//routes GET | POST | UPDATE | DELETE
router.get("/test-user", testControllers);

//export
module.exports = router;
