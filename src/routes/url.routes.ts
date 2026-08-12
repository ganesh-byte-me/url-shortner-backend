import {Router} from 'express';
import { getShortUrl, getUrlByShortCode } from '../controllers/url.controller.js';

const router = Router();

router.get("/health", (_req, res) => {

    res.status(200).json({
  
      success: true,
  
      status: "healthy",
  
    });
  
});
router.get("/",(req,res)=>{
    res.send("Hello from url-shortner")
})

router.get("/:shortcode", getUrlByShortCode)

router.post("/shorten", getShortUrl);


export default router;