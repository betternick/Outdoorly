const express = require("express");
const router = express.Router();
const getParksByDistance = require("../controllers/parksByDistanceController.js");
const parkController = require("../controllers/parksController.js");
const review = require("../controllers/reviewController.js");
const imageController = require("../controllers/imagesController.js");

/* root: /parks */

router.get("/", parkController.getParksStateAndActivities);

router.get("/distance", getParksByDistance);

router.get("/review/:id", review.getReview);
router.post("/review/:id", review.addReview);
router.put("/review/:id", review.updateReview);
router.delete("/review/:id", review.deleteReview);

router.post("/images/:id", imageController.uploadImage);
router.put("/images/:id", imageController.editImage);
router.delete("/images/:id", imageController.deleteImage);
router.get("/images/:id", imageController.retrieveImages);

router.get("/:id", parkController.getParkDetails);

module.exports = router;
