import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  users: defineTable({
    clerkId: v.string(),
    email: v.string(),
    name: v.string(),
    imageUrl: v.optional(v.string()),
    role: v.union(v.literal("admin"), v.literal("user")),
    createdAt: v.number(),
    // Look & feel chosen on the Settings page (accent, rain, text size).
    appearance: v.optional(
      v.object({
        accent: v.string(),
        rainMode: v.string(),
        rainDensity: v.number(),
        rainSpeed: v.number(),
        rainSize: v.number(),
        rainOpacity: v.number(),
        glow: v.boolean(),
        uiSize: v.string(),
      }),
    ),
  }).index("by_clerk_id", ["clerkId"]),
});
