import { type User, type InsertUser, type Verification, type InsertVerification } from "@shared/schema";
import { randomUUID } from "crypto";

// modify the interface with any CRUD methods
// you might need

export interface IStorage {
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  // Verification storage helpers
  createVerification(v: InsertVerification): Promise<Verification>;
  getVerificationByToken(token: string): Promise<Verification | undefined>;
  markVerified(token: string): Promise<Verification | undefined>;
}

export class MemStorage implements IStorage {
  private users: Map<string, User>;
  private verifications: Map<string, Verification>;

  constructor() {
    this.users = new Map();
    this.verifications = new Map();
  }

  async getUser(id: string): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = randomUUID();
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  async createVerification(v: InsertVerification): Promise<Verification> {
    const id = randomUUID();
    const verification: Verification = {
      id,
      createdAt: new Date(),
      verified: v.verified ?? "false",
      verifiedAt: v.verified === "true" ? new Date() : null as any,
      token: v.token,
      discordUserId: v.discordUserId,
      discordUsername: v.discordUsername,
      ipAddress: v.ipAddress ?? null as any,
      city: v.city ?? null as any,
      region: v.region ?? null as any,
      country: v.country ?? null as any,
    } as unknown as Verification;
    this.verifications.set(verification.token, verification);
    return verification;
  }

  async getVerificationByToken(token: string): Promise<Verification | undefined> {
    return this.verifications.get(token);
  }

  async markVerified(token: string): Promise<Verification | undefined> {
    const v = this.verifications.get(token);
    if (!v) return undefined;
    v.verified = "true";
    v.verifiedAt = new Date();
    this.verifications.set(token, v);
    return v;
  }
}

export const storage = new MemStorage();
