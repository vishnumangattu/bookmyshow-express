import { Router } from "express";
import * as mov from "./requestHandler.js";

const router=Router();
router.route("/addmovie").post(mov.addMovie);
router.route("/getmovies").get(mov.getMovies);
router.route("/getmovie/:id").get(mov.getMovie);
router.route("/editmovie/:_id").put(mov.editMovie);
router.route("/deletemovie/:_id").delete(mov.deleteMovie);

export default router;