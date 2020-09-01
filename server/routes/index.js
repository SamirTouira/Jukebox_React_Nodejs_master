const express = require("express");
const router = express.Router();
const { catchErrors } = require("../errorHandlers");
const TrackController = require("../controllers/TrackController");
const UserController = require("../controllers/UserController");

router.post("/api/login", catchErrors(UserController.login))

router.post("/api/register", catchErrors(UserController.register))

router.get("/api/tracks", catchErrors(TrackController.getTracks));

router.get("/api/tracks", catchErrors(TrackController.getArtists));

module.exports = router;