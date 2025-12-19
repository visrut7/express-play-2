import rateLimit from "express-rate-limit";

export const userRateLimiter = rateLimit({
  windowMs: 10 * 1000, // 10 seconds
  max: 5, // 5 requests per window
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    error: "Too many requests. Try again after 10 seconds.",
  },
});
