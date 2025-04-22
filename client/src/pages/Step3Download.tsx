import React, { useRef, useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle, Download, Share2, FileText } from "lucide-react";
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
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  
  // Generate preview image when component mounts
  useEffect(() => {
    setTimeout(() => {
      generatePreview();
    }, 500); // Add a small delay to ensure the certificate is rendered
  }, []);
  
  const generatePreview = async () => {
    if (!certificateRef.current) return;
    
    try {
      const canvas = await html2canvas(certificateRef.current, {
        scale: 2,
        logging: false,
        useCORS: true,
        allowTaint: true,
        backgroundColor: "#ffffff",
      });
      
      const dataUrl = canvas.toDataURL('image/png', 1.0);
      setPreviewUrl(dataUrl);
    } catch (error) {
      console.error("Error generating preview:", error);
      toast({
        title: "Preview Generation Issue",
        description: "There was a problem generating the certificate preview.",
        variant: "destructive",
      });
    }
  };
  
  const handleDownload = async () => {
    if (!certificateRef.current) return;
    
    try {
      toast({
        title: "Generating PDF...",
        description: "Please wait while we create your certificate.",
      });
      
      // Try to use the preview if already generated
      if (previewUrl) {
        const pdf = new jsPDF({
          orientation: 'landscape',
          unit: 'mm',
        });
        
        const img = new Image();
        img.src = previewUrl;
        
        img.onload = () => {
          const imgWidth = 280;
          const imgHeight = (img.height * imgWidth) / img.width;
          
          pdf.addImage(previewUrl, 'PNG', 10, 10, imgWidth, imgHeight);
          pdf.save(`certificate_${certificateData.certificateId}.pdf`);
          
          toast({
            title: "Success!",
            description: "Certificate PDF downloaded successfully.",
          });
        };
      } else {
        // If no preview available, generate a new one
        const canvas = await html2canvas(certificateRef.current, {
          scale: 2,
          logging: false,
          useCORS: true,
          allowTaint: true,
          backgroundColor: "#ffffff",
        });
        
        const imgData = canvas.toDataURL('image/png', 1.0);
        const pdf = new jsPDF({
          orientation: 'landscape',
          unit: 'mm',
        });
        
        const imgWidth = 280;
        const imgHeight = (canvas.height * imgWidth) / canvas.width;
        
        pdf.addImage(imgData, 'PNG', 10, 10, imgWidth, imgHeight);
        pdf.save(`certificate_${certificateData.certificateId}.pdf`);
        
        toast({
          title: "Success!",
          description: "Certificate PDF downloaded successfully.",
        });
      }
    } catch (error) {
      console.error("Download error:", error);
      toast({
        title: "Error",
        description: "Failed to generate PDF. Please try again.",
        variant: "destructive",
      });
    }
  };
  
  const handleImageDownload = () => {
    try {
      if (!previewUrl) {
        toast({
          title: "Error",
          description: "Certificate preview not available. Please try again.",
          variant: "destructive",
        });
        return;
      }
      
      // Create an anchor element and trigger download
      const link = document.createElement('a');
      link.href = previewUrl;
      link.download = `certificate_${certificateData.certificateId}.png`;
      link.style.display = 'none';
      document.body.appendChild(link);
      link.click();
      
      // Cleanup
      setTimeout(() => {
        document.body.removeChild(link);
        URL.revokeObjectURL(link.href);
        
        toast({
          title: "Success!",
          description: "Certificate image downloaded successfully.",
        });
      }, 100);
    } catch (error) {
      console.error("Image download error:", error);
      toast({
        title: "Error",
        description: "Failed to download image. Please try again.",
        variant: "destructive",
      });
    }
  };
  
  return (
    <Card className="bg-white shadow-lg rounded-xl mb-8 overflow-hidden border-0">
      <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-4 text-white">
        <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-white/20 backdrop-blur-sm mb-4">
          <CheckCircle className="h-6 w-6 text-white" />
        </div>
        <h2 className="text-2xl font-bold text-center">
          Certificate Generated Successfully!
        </h2>
        <p className="text-center text-white/80 mt-2">
          Your certificate has been generated and saved locally.
        </p>
      </div>
      
      <CardContent className="p-6">
        <div className="text-center">
          {previewUrl ? (
            <div className="mb-6 rounded-lg overflow-hidden shadow-lg border border-gray-100">
              <img 
                src={previewUrl} 
                alt="Certificate Preview" 
                className="w-full h-auto"
              />
            </div>
          ) : (
            <div className="flex justify-center items-center h-64 bg-gray-50 rounded-lg mb-6">
              <p className="text-gray-400">Generating preview...</p>
            </div>
          )}

          <div className="max-w-md mx-auto bg-blue-50 rounded-xl p-4 border border-blue-100 mb-6">
            <p className="text-sm text-blue-800 font-medium mb-2">Certificate Details</p>
            <div className="space-y-2">
              <p className="text-sm text-gray-700 flex justify-between">
                <span className="font-medium">Name:</span> 
                <span>{certificateData.name}</span>
              </p>
              <p className="text-sm text-gray-700 flex justify-between">
                <span className="font-medium">Certificate ID:</span> 
                <span className="font-mono">{certificateData.certificateId}</span>
              </p>
              <p className="text-sm text-gray-700 flex justify-between">
                <span className="font-medium">Generated on:</span> 
                <span>{certificateData.date}</span>
              </p>
            </div>
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

          <div className="mb-6 text-center">
            <h3 className="font-medium text-gray-800 mb-3">Download Options</h3>
            <p className="text-sm text-gray-600 mb-4">
              Choose your preferred format to download your certificate
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <Button
              onClick={handleDownload}
              className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white rounded-xl shadow-md flex-1 py-6"
            >
              <div className="flex flex-col items-center">
                <FileText className="h-6 w-6 mb-2" />
                <span className="font-bold">PDF Format</span>
                <span className="text-xs mt-1 text-blue-100">High quality for printing</span>
              </div>
            </Button>
            
            <Button
              onClick={handleImageDownload}
              variant="outline"
              className="border-blue-200 text-blue-700 hover:bg-blue-50 rounded-xl flex-1 py-6"
            >
              <div className="flex flex-col items-center">
                <Download className="h-6 w-6 mb-2" />
                <span className="font-bold">Image Format</span>
                <span className="text-xs mt-1 text-blue-600/70">Great for sharing online</span>
              </div>
            </Button>
          </div>

          <p className="text-sm text-gray-500">
            Your certificate has been saved locally in your browser.
          </p>

          <div className="mt-8 pt-6 border-t border-gray-200">
            <Button
              variant="link"
              onClick={onCreateNew}
              className="text-blue-600 hover:text-blue-800 font-medium"
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
