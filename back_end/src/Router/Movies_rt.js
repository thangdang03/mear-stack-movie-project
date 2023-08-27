const express = require('express');
const router = express.Router();
const Movies_controller = require("../Controller/Movies_controller");
const movie_midelware = require("../Midelware/veryfi")
// get movie
router.get("/",movie_midelware.veryfi_token,Movies_controller.getallMovies);
// get movie by id
router.get("/:id",Movies_controller.getaMovie);
//add a movie
router.post("/",Movies_controller.addamovie);
// delte a movie
router.delete("/:id",Movies_controller.delte_movie);
// update a movie
router.put("/:id",Movies_controller.getaMovie);

module.exports = router