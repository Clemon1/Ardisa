"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const rentalController_1 = require("../controller/rentalController");
const multer_1 = __importDefault(require("multer"));
const path_1 = __importDefault(require("path"));
const recommendation_1 = require("../controller/recommendation");
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
router.get("/recommendations/:userId", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.params.userId;
    const numRecommendations = 5;
    try {
        const recommendations = yield (0, recommendation_1.getRecommendations)(userId, numRecommendations);
        res.json(recommendations);
    }
    catch (error) {
        res.status(500).json({ error: "Error fetching recommendations" });
    }
}));
router.get("/suggest/:userId", rentalController_1.viewSuggestHome);
router.post("/createRoom", upload.single("photos"), rentalController_1.createRentalHomes);
router.patch("/wishlist/:userId/:productId");
router.patch("/viewrooms/:id");
exports.default = router;
