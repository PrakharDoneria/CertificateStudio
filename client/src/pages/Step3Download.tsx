import React, { useRef } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle, Download } from "lucide-react";
import Certificate from "@/components/Certificate";
import { useToast } from "@/hooks/use-toast";
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";
import { InsertCertificate } from "@shared/schema";

type Step3DownloadProps = {
  certificateData: InsertCertificate & {
    certificateId: string;
    date: string;
  };
  onCreateNew: () => void;
};

const Step3Download: React.FC<Step3DownloadProps> = ({
  certificateData,
  onCreateNew,
}) => {
  const { toast } = useToast();
  const certificateRef = useRef<HTMLDivElement>(null);
  
  const handleDownload = async () => {
    if (!certificateRef.current) return;
    
    try {
      toast({
        title: "Generating PDF...",
        description: "Please wait while we create your certificate.",
      });
      
      const canvas = await html2canvas(certificateRef.current, {
        scale: 2,
        logging: false,
        useCORS: true,
      });
      
      const imgData = canvas.toDataURL('image/jpeg', 1.0);
      const pdf = new jsPDF({
        orientation: 'landscape',
        unit: 'mm',
      });
      
      const imgWidth = 280;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      
      pdf.addImage(imgData, 'JPEG', 10, 10, imgWidth, imgHeight);
      pdf.save(`certificate_${certificateData.certificateId}.pdf`);
      
      toast({
        title: "Success!",
        description: "Certificate downloaded successfully.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to generate PDF. Please try again.",
        variant: "destructive",
      });
    }
  };
  
  return (
    <Card className="bg-white shadow rounded-lg mb-8">
      <CardContent className="pt-6">
        <div className="text-center">
          <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100 mb-4">
            <CheckCircle className="h-6 w-6 text-green-600" />
          </div>
          <h2 className="text-xl font-semibold text-gray-800 mb-2">
            Certificate Generated Successfully!
          </h2>
          <p className="text-gray-600 mb-6">
            Your certificate has been generated and saved. You can download it now.
          </p>

          <div className="max-w-md mx-auto bg-gray-50 rounded-lg p-4 border border-gray-200 mb-6">
            <p className="text-sm text-gray-600 mb-1">Certificate details:</p>
            <p className="text-sm text-gray-900">
              <span className="font-medium">Name:</span> {certificateData.name}
            </p>
            <p className="text-sm text-gray-900">
              <span className="font-medium">Certificate ID:</span> {certificateData.certificateId}
            </p>
            <p className="text-sm text-gray-900">
              <span className="font-medium">Generated on:</span> {certificateData.date}
            </p>
          </div>

          <div className="hidden">
            <Certificate
              ref={certificateRef}
              name={certificateData.name}
              githubRepo={certificateData.githubRepo}
              vercelDeployment={certificateData.vercelDeployment}
              certificateId={certificateData.certificateId}
              date={certificateData.date}
            />
          </div>

          <Button
            onClick={handleDownload}
            className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-primary hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
          >
            <Download className="h-5 w-5 mr-2" />
            Download Certificate (PDF)
          </Button>

          <p className="mt-6 text-sm text-gray-500">
            Your certificate data has been saved to Google Sheets.
          </p>

          <div className="mt-8 pt-6 border-t border-gray-200">
            <Button
              variant="link"
              onClick={onCreateNew}
              className="text-primary hover:text-indigo-700 font-medium"
            >
              Create another certificate
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default Step3Download;
