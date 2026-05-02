const { z } = require("zod");

const eventSchema = z
  .object({
    eventType: z.enum([
      "page_view",
      "button_click",
      "signup",
      "login",
      "purchase",
    ]),
    userId: z.string().trim().min(1).optional(),
    sessionId: z.string().trim().min(1).optional(),
    pageUrl: z.string().trim().min(1).optional(),
    metadata: z.record(z.string(), z.any()).optional(),
    timestamp: z.string().datetime().optional(),
  })
  .superRefine((data, ctx) => {
    if (data.eventType === "page_view" && !data.pageUrl) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["pageUrl"],
        message: "pageUrl is required when eventType is page_view",
      });
    }
  });

module.exports = {
  eventSchema,
};
