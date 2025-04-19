import React, { useState } from "react";
import StepIndicator from "@/components/StepIndicator";
import Step1Form from "@/pages/Step1Form";
import Step2Preview from "@/pages/Step2Preview";
import Step3Download from "@/pages/Step3Download";
import { useToast } from "@/hooks/use-toast";
import { 
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { formatDate, generateCertificateId } from "@/lib/utils";
import { InsertCertificate } from "@shared/schema";

type CertificateData = InsertCertificate & {
  certificateId: string;
  date: string;
};

const CertificateGenerator: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [certificateData, setCertificateData] = useState<CertificateData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  const handleFormSubmit = (formData: InsertCertificate) => {
    const newCertificateData: CertificateData = {
      ...formData,
      certificateId: generateCertificateId(),
      date: formatDate(new Date()),
    };
    setCertificateData(newCertificateData);
    setCurrentStep(1);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBackToForm = () => {
    setCurrentStep(0);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleGenerateCertificate = async () => {
    if (!certificateData) return;

    setIsLoading(true);
    try {
      const response = await fetch('/api/certificates', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(certificateData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to generate certificate');
      }

      const data = await response.json();
      setCertificateData({
        ...certificateData,
        certificateId: data.certificateId,
      });
      
      setCurrentStep(2);
      toast({
        title: "Success!",
        description: "Certificate has been saved to Google Sheets.",
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unexpected error occurred');
    } finally {
      setIsLoading(false);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleCreateNew = () => {
    setCertificateData(null);
    setCurrentStep(0);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="max-w-4xl mx-auto py-6 sm:px-6 lg:px-8">
      <StepIndicator currentStep={currentStep} />

      {currentStep === 0 && <Step1Form onSubmit={handleFormSubmit} initialData={certificateData} />}
      
      {currentStep === 1 && certificateData && (
        <Step2Preview 
          certificateData={certificateData} 
          onBack={handleBackToForm} 
          onGenerate={handleGenerateCertificate}
          isLoading={isLoading}
        />
      )}
      
      {currentStep === 2 && certificateData && (
        <Step3Download 
          certificateData={certificateData} 
          onCreateNew={handleCreateNew}
        />
      )}

      <AlertDialog open={!!error} onOpenChange={() => setError(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Error</AlertDialogTitle>
            <AlertDialogDescription>
              {error}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogAction>Close</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default CertificateGenerator;
