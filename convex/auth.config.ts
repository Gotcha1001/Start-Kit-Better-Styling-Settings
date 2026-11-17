// convex/auth.config.ts
const authConfig = {
  providers: [
    {
      domain: "https://possible-werewolf-8179.clerk.accounts.dev",
      applicationID: "convex", // ← must be "convex", not a dynamic env var
    },
  ],
};

export default authConfig;
