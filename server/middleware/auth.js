import { clerkClient } from "@clerk/express";

export const protectAdmin = async (req, res, next) => {
  try {
    console.log("🟢 AUTH OBJECT:", req.auth);

    const { userId } = req.auth || {};
    if (!userId) {
      console.log("🔴 No userId found in req.auth");
      return res.status(401).json({ success: false, message: "No userId found in request" });
    }

    const user = await clerkClient.users.getUser(userId);
    console.log("🟢 USER FOUND:", user.id);
    console.log("🟢 USER ROLE:", user.privateMetadata);

    if (user?.privateMetadata?.role !== "admin") {
      console.log("🔴 Not admin role");
      return res.status(403).json({ success: false, message: "You are not authorized to access admin dashboard" });
    }

    console.log("✅ Admin authorized");
    next();
  } catch (error) {
    console.error("❌ Error in protectAdmin:", error);
    return res.status(500).json({ success: false, message: "Authorization failed" });
  }
};
