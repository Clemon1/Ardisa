"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const rentalController_1 = require("../controller/rentalController");
const multer_1 = __importDefault(require("multer"));
const path_1 = __importDefault(require("path"));
// import { getRecommendations } from "../controller/recommendation";
const router = (0, express_1.Router)();
const storage = multer_1.default.diskStorage({
    filename: function (req, file, callback) {
        callback(null, Date.now() + path_1.default.extname(file.originalname));
    },
});
const upload = (0, multer_1.default)({
    storage,
});
router.get("/viewrooms", rentalController_1.viewHome);
router.get("/viewrooms/:id", rentalController_1.viewSingleHome);
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
router.get("/recommendations/:userId", rentalController_1.roomRecommendation);
router.get("/suggest/:userId", rentalController_1.viewSuggestHome);
router.post("/createRoom", upload.single("photos"), rentalController_1.createRentalHomes);
router.patch("/wishlist/:id/:productId", rentalController_1.bookmarkRentalHomes);
// router.patch("/viewrooms/:id");
exports.default = router;
