import { Client, GatewayIntentBits, Partials, Events, GuildMember } from "discord.js";
import { randomUUID } from "crypto";
import type { IStorage } from "./storage";
import { log } from "./vite";

export interface BotContext {
  client: Client | null;
}

export const botContext: BotContext = {
  client: null,
};

function getBaseUrl(): string | undefined {
  return process.env.PUBLIC_BASE_URL || process.env.RENDER_EXTERNAL_URL;
}

export async function startDiscordBot(storage: IStorage) {
  const token = process.env.DISCORD_BOT_TOKEN || process.env.BOT_TOKEN;
  if (!token) {
    log("DISCORD_BOT_TOKEN no está configurado; el bot no se iniciará", "bot");
    return;
  }

  const client = new Client({
    intents: [
      GatewayIntentBits.Guilds,
      GatewayIntentBits.GuildMembers,
      GatewayIntentBits.GuildMessages,
      GatewayIntentBits.DirectMessages,
      GatewayIntentBits.MessageContent,
    ],
    partials: [Partials.Channel, Partials.GuildMember, Partials.User],
  });

  botContext.client = client;

  client.once(Events.ClientReady, () => {
    log(`Bot iniciado como ${client.user?.tag}`, "bot");
  });

  client.on(Events.GuildMemberAdd, async (member: GuildMember) => {
    try {
      const baseUrl = getBaseUrl();
      if (!baseUrl) {
        log("PUBLIC_BASE_URL/RENDER_EXTERNAL_URL no configurado; no puedo generar enlaces de verificación", "bot");
        return;
      }
      const token = randomUUID();

      // Guardar verificación en memoria
      await storage.createVerification({
        token,
        discordUserId: member.id,
        discordUsername: member.user.tag,
        verified: "false",
      } as any);

      const url = `${baseUrl.replace(/\/$/, "")}/verify?token=${encodeURIComponent(token)}`;
      const dm = await member.createDM();
      await dm.send(
        `¡Bienvenido/a a ${member.guild.name}!\nPara verificarte, visita: ${url}`
      );
      log(`Enviado DM de verificación a ${member.user.tag}`, "bot");
    } catch (err: any) {
      log(`No pude enviar DM a ${member.user.tag}: ${err?.message || err}`, "bot");
    }
  });

  client.on("error", (err: unknown) => {
    const message = err instanceof Error ? err.message : String(err);
    log(`Error en cliente Discord: ${message}`, "bot");
  });

  await client.login(token);
}
