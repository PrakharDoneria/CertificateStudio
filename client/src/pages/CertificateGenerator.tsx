import React, { useState, useEffect } from "react";
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

const LOCAL_STORAGE_KEY = 'gdg-iec-certificates';

const CertificateGenerator: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [certificateData, setCertificateData] = useState<CertificateData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [savedCertificates, setSavedCertificates] = useState<CertificateData[]>([]);
  const { toast } = useToast();

  // Load certificates from local storage on initial render
  useEffect(() => {
    const storedCertificates = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (storedCertificates) {
      setSavedCertificates(JSON.parse(storedCertificates));
    }
  }, []);

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
      // Save to local storage instead of server
      const updatedCertificates = [...savedCertificates, certificateData];
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updatedCertificates));
      setSavedCertificates(updatedCertificates);
      
      setCurrentStep(2);
      toast({
        title: "Success!",
        description: "Certificate has been saved locally.",
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to save certificate locally');
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
    <div>
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
