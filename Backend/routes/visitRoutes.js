import express from "express";
import { trackVisit } from "../controller/visitController.js";

const router = express.Router();

router.post("/", trackVisit);

export default router;