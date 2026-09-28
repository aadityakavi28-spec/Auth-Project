import express from "express";
import ensureAuthenticated from "../Middleware/product.js";
const router = express.Router();

router.get('/', ensureAuthenticated , (req,res)=>{
    res.status(200).json([
        {
            name : "mobile",
            price : 100000
        },
        {
            name : "mobile",
            price : 100000
        }
    ])
});

export default router;