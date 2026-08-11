import { Url } from "../models/url.model.js";
import { generateShortCode } from "../utils/generate-short-code.js";

export const createShortUrl = async (originalUrl: string) => {
  let shortcode = generateShortCode();
  
  let existingUrl = await Url.findOne({ shortcode });

  while (existingUrl) {

    shortcode = generateShortCode();

    existingUrl = await Url.findOne({
      shortcode,
    });

  }
  const url = await Url.create({
    originalUrl,
    shortcode,
  });

  return url;
};