import { certificates, type Certificate, type InsertCertificate } from "@shared/schema";

// modify the interface with any CRUD methods
// you might need

export interface IStorage {
  getUser(id: number): Promise<any | undefined>;
  getUserByUsername(username: string): Promise<any | undefined>;
  createUser(user: any): Promise<any>;
  createCertificate(certificate: InsertCertificate & { certificateId: string }): Promise<Certificate>;
  getCertificateById(id: number): Promise<Certificate | undefined>;
  getCertificateByCertificateId(certificateId: string): Promise<Certificate | undefined>;
  getAllCertificates(): Promise<Certificate[]>;
}

export class MemStorage implements IStorage {
  private users: Map<number, any>;
  private certificates: Map<number, Certificate>;
  currentUserId: number;
  currentCertificateId: number;

  constructor() {
    this.users = new Map();
    this.certificates = new Map();
    this.currentUserId = 1;
    this.currentCertificateId = 1;
  }

  async getUser(id: number): Promise<any | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<any | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: any): Promise<any> {
    const id = this.currentUserId++;
    const user = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  async createCertificate(insertCertificate: InsertCertificate & { certificateId: string }): Promise<Certificate> {
    const id = this.currentCertificateId++;
    const now = new Date();
    
    const certificate: Certificate = {
      id,
      name: insertCertificate.name,
      email: insertCertificate.email,
      githubRepo: insertCertificate.githubRepo,
      vercelDeployment: insertCertificate.vercelDeployment,
      projectExplanation: insertCertificate.projectExplanation,
      certificateId: insertCertificate.certificateId,
      createdAt: now
    };
    
    this.certificates.set(id, certificate);
    return certificate;
  }

  async getCertificateById(id: number): Promise<Certificate | undefined> {
    return this.certificates.get(id);
  }

  async getCertificateByCertificateId(certificateId: string): Promise<Certificate | undefined> {
    return Array.from(this.certificates.values()).find(
      (cert) => cert.certificateId === certificateId
    );
  }

  async getAllCertificates(): Promise<Certificate[]> {
    return Array.from(this.certificates.values());
  }
}

export const storage = new MemStorage();
