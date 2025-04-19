import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertCertificateSchema } from "@shared/schema";
import { saveToGoogleSheets } from "./googleSheetsService";
import { v4 as uuidv4 } from 'uuid';

export async function registerRoutes(app: Express): Promise<Server> {
  // API endpoint to save certificate data and store it in Google Sheets
  app.post("/api/certificates", async (req, res) => {
    try {
      // Validate the request body
      const validationResult = insertCertificateSchema.safeParse(req.body);
      
      if (!validationResult.success) {
        return res.status(400).json({ 
          message: "Invalid certificate data", 
          errors: validationResult.error.errors 
        });
      }
      
      // Generate certificate ID if not provided
      const certificateId = req.body.certificateId || `CERT-${new Date().getFullYear()}-${uuidv4().slice(0, 8).toUpperCase()}`;
      
      // Create certificate in storage
      const certificate = await storage.createCertificate({
        ...validationResult.data,
        certificateId
      });
      
      // Save to Google Sheets
      await saveToGoogleSheets({
        name: certificate.name,
        email: certificate.email,
        githubRepo: certificate.githubRepo,
        vercelDeployment: certificate.vercelDeployment,
        projectExplanation: certificate.projectExplanation,
        certificateId: certificate.certificateId,
        createdAt: certificate.createdAt?.toISOString() || new Date().toISOString()
      });
      
      return res.status(201).json({
        message: "Certificate created successfully",
        certificateId: certificate.certificateId
      });
    } catch (error) {
      console.error("Error creating certificate:", error);
      return res.status(500).json({ 
        message: "Failed to create certificate", 
        error: error instanceof Error ? error.message : "Unknown error" 
      });
    }
  });
  
  // Get certificate by ID
  app.get("/api/certificates/:id", async (req, res) => {
    try {
      const certificateId = req.params.id;
      const certificate = await storage.getCertificateByCertificateId(certificateId);
      
      if (!certificate) {
        return res.status(404).json({ message: "Certificate not found" });
      }
      
      return res.status(200).json(certificate);
    } catch (error) {
      console.error("Error fetching certificate:", error);
      return res.status(500).json({ 
        message: "Failed to fetch certificate", 
        error: error instanceof Error ? error.message : "Unknown error" 
      });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
