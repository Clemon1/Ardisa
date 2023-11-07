import { Router, Request, Response } from "express";
import {
  viewHome,
  viewSingleHome,
  viewSuggestHome,
  createRentalHomes,
  roomRecommendation,
  bookmarkRentalHomes,
} from "../controller/rentalController";
import multer from "multer";

import path from "path";
// import { getRecommendations } from "../controller/recommendation";
const router = Router();

const storage = multer.diskStorage({
  filename: function (req, file, callback) {
    callback(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({
  storage,
});
router.get("/viewrooms", viewHome);
router.get("/viewrooms/:id", viewSingleHome);
// router.get("/recommendations/:userId", async (req: Request, res: Response) => {
//   const userId: any = req.params.userId;
//   const numRecommendations = 5;

//   try {
//     const recommendations = await getRecommendations(
//       userId,
//       numRecommendations,
//     );
//     res.json(recommendations);
//   } catch (error) {
//     res.status(500).json({ error: "Error fetching recommendations" });
//   }
// });
router.get("/recommendations/:userId", roomRecommendation);
router.get("/suggest/:userId", viewSuggestHome);
router.post("/createRoom", upload.single("photos"), createRentalHomes);
router.patch("/wishlist/:id/:productId", bookmarkRentalHomes);
// router.patch("/viewrooms/:id");

export default router;
