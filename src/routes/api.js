import express from "express";

import { validate } from "express-validation";

import * as apiController from "../controllers/api.controller";
import * as apiValidator from "../controllers/api.validator";

const router = express.Router();

// api/register
router.post("/register", validate(apiValidator.register, { keyByField: true }), apiController.register);

router.post("/suspend", validate(apiValidator.suspend, { keyByField: true }), apiController.suspend);

router.post("/retrievenotifications", validate(apiValidator.notification, { keyByField: true }), apiController.notification);

router.get("/getcommonstudents", apiController.getCommonStudents);


module.exports = router;
