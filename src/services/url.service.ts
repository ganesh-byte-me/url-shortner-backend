import { redisClient } from "../config/redis.js";
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

export const resolveShortUrl = async (shortcode: string) => {
      const cacheKey = `url:${shortcode}`;
      const cachedUrl = await redisClient.get(cacheKey);
      if(cachedUrl){
        console.log("Cache hit");
        await Url.updateOne({shortcode},{ $inc:{clicks:1}})
        return cachedUrl;
      }
      console.log("CACHE MISS");
      const url = await Url.findOne({shortcode});
      if(!url){
        return null;
      }
      await redisClient.set(cacheKey,JSON.stringify({originalUrl: url.originalUrl,}),{EX: 60*60});
      await Url.updateOne({shortcode},{$inc:{clicks:1}})

    return url.originalUrl;
}
