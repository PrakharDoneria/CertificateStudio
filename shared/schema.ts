import { pgTable, text, serial, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const certificates = pgTable("certificates", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  githubRepo: text("github_repo").notNull(),
  vercelDeployment: text("vercel_deployment").notNull(),
  projectExplanation: text("project_explanation").notNull(),
  certificateId: text("certificate_id").notNull().unique(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const insertCertificateSchema = createInsertSchema(certificates)
  .omit({ id: true, certificateId: true, createdAt: true })
  .extend({
    name: z.string().min(2, "Name must be at least 2 characters"),
    email: z.string().email("Please enter a valid email address"),
    githubRepo: z.string().url("Please enter a valid URL").regex(/github\.com/, "Must be a GitHub repository URL"),
    vercelDeployment: z.string().url("Please enter a valid URL").regex(/vercel\.app|netlify\.app|herokuapp\.com/, "Must be a valid deployment URL"),
    projectExplanation: z.string().min(50, "Project explanation must be at least 50 characters")
  });

export type InsertCertificate = z.infer<typeof insertCertificateSchema>;
export type Certificate = typeof certificates.$inferSelect;
