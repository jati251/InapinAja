const router = require("express").Router();
const Controller = require("../controllers");
const authentication = require("../middlewares/authenticator");
const authorization = require("../middlewares/authorization");
const typeAuthorization = require("../middlewares/typeAuthorization");

router.use('/inapinaja', require('./customer'))

//urusan login
router.post("/register/admin", Controller.registerAdmin);
router.post("/login", Controller.loginPost);
router.post("/google-sign", Controller.googleSign);
//authentication
router.use(authentication);
//main

//lodging
router.get("/lodgings", Controller.lodgings);
router.post("/lodgings/add", Controller.lodgingsCreate);
router.get("/lodgings/:id", authorization, Controller.findLodgingById);

//edit
router.put("/lodgings/:id", authorization, Controller.lodgingEdit);
//edit status
router.patch("/lodgingStatus/:id", authorization, Controller.statusEdit);
//delete
router.delete("/lodgings/:id", authorization, Controller.lodgingDelete);

//urusan type
router.get("/types", Controller.type);
router.post("/types/add", typeAuthorization, Controller.typeCreate);
router.delete("/types/:id", typeAuthorization, Controller.typeDelete);

//history
router.get("/histories", Controller.history);




module.exports = router;
