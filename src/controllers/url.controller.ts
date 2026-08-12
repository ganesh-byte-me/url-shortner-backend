import type { Request, Response } from "express";
import { Url } from "../models/url.model.js";
import { createShortUrl, resolveShortUrl } from "../services/url.service.js";

export const getShortUrl = async (req: Request, res: Response) => {
  try {
    const { originalUrl } = req.body;
    console.log(originalUrl);
    if (!originalUrl) {
      return res.status(400).json({ message: "Original URL is required" });
    }
    const existingUrl = await Url.findOne({ originalUrl });
    if (existingUrl) {
      return res.status(200).json({
        success: true,
        shortcode: existingUrl.shortcode,
      });
    }
    const url = await createShortUrl(originalUrl);

    res.status(200).json({
      success: true,
      shortcode: url?.shortcode,
    });
  } catch (err) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const getUrlByShortCode = async (req: Request, res: Response) => {
  try {
    const { shortcode } = req.params;
    if (!shortcode) {
      return res.status(400).json({ message: "Shortcode is required" });
    }

    if (Array.isArray(shortcode)) {
      return res.status(400).json({ message: "Invalid shortcode format" });
    }
    const originalUrl = await resolveShortUrl(shortcode);

    if (!originalUrl) {
      return res.status(404).json({
        message: "Shortcode not found",
      });
    }

    return res.redirect(originalUrl);
  } catch (err) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};
