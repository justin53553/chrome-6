import type { Express, Request, Response } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { randomUUID } from "crypto";
import { log } from "./vite";

export async function registerRoutes(app: Express): Promise<Server> {
  // put application routes here
  // prefix all routes with /api

  // use storage to perform CRUD operations on the storage interface
  // e.g. storage.insertUser(user) or storage.getUserByUsername(username)

  // Verificación: el cliente enviará el token aquí
  app.post("/api/verify", async (req: Request, res: Response) => {
    try {
      const { token } = req.body ?? {};
      if (!token || typeof token !== "string") {
        return res.status(400).json({ message: "Token inválido" });
      }

      const found = await storage.getVerificationByToken(token);
      if (!found) {
        return res.status(404).json({ message: "Token no encontrado" });
      }

      const verified = await storage.markVerified(token);
      log(`Token verificado para ${found.discordUsername}`, "api");
      return res.json({ ok: true, user: {
        id: found.discordUserId,
        username: found.discordUsername,
      }, verifiedAt: (verified as any)?.verifiedAt ?? new Date() });
    } catch (e: any) {
      return res.status(500).json({ message: e?.message || "Error" });
    }
  });

  // Endpoint para que TU bot existente cree tokens y obtenga el enlace listo para enviar por DM
  app.post("/api/verification/create", async (req: Request, res: Response) => {
    try {
      // Seguridad opcional: si defines BOT_API_KEY, exige header X-API-KEY
      const requiredKey = process.env.BOT_API_KEY;
      if (requiredKey) {
        const sent = req.header("x-api-key");
        if (!sent || sent !== requiredKey) {
          return res.status(401).json({ message: "Unauthorized" });
        }
      }

      const { discordUserId, discordUsername } = req.body ?? {};
      if (!discordUserId || !discordUsername) {
        return res.status(400).json({ message: "discordUserId y discordUsername son requeridos" });
      }

      const token = randomUUID();
      await storage.createVerification({
        token,
        discordUserId,
        discordUsername,
        verified: "false",
      } as any);

      const baseUrl = process.env.PUBLIC_BASE_URL || process.env.RENDER_EXTERNAL_URL || "";
      const url = `${baseUrl.replace(/\/$/, "")}/verify?token=${encodeURIComponent(token)}`;

      return res.json({ token, url });
    } catch (e: any) {
      return res.status(500).json({ message: e?.message || "Error" });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
