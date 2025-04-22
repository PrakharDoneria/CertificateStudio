import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Certificate from "@/components/Certificate";
import { ChevronLeft, Eye, Award, SaveAll } from "lucide-react";
import { InsertCertificate } from "@shared/schema";
import iecLogoPath from "/images/iec-logo.jpg";
import gdgLogoPath from "/images/gdg-logo.png";

type Step2PreviewProps = {
  certificateData: InsertCertificate & {
    certificateId: string;
    date: string;
  };
  onBack: () => void;
  onGenerate: () => void;
  isLoading: boolean;
};

const Step2Preview: React.FC<Step2PreviewProps> = ({
  certificateData,
  onBack,
  onGenerate,
  isLoading,
}) => {
  return (
    <Card className="bg-white shadow-lg rounded-xl mb-8 overflow-hidden border-0">
      <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-4 text-white">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Award className="h-8 w-8" />
            <h2 className="text-2xl font-bold">
              Certificate Preview
            </h2>
          </div>
          <Button
            variant="ghost"
            onClick={onBack}
            className="text-white hover:text-white/80 font-medium flex items-center bg-white/10 hover:bg-white/20 rounded-lg"
          >
            <ChevronLeft className="h-4 w-4 mr-1" />
            Back to form
          </Button>
        </div>
      </div>

      <CardContent className="p-6">
        <div className="mb-4 text-center">
          <p className="text-gray-600">
            Review your certificate below. Click "Generate Certificate" when you're ready to continue.
          </p>
        </div>

        <div className="border-2 border-blue-100 rounded-xl p-2 bg-white shadow-md">
          <Certificate
            name={certificateData.name}
            githubRepo={certificateData.githubRepo}
            vercelDeployment={certificateData.vercelDeployment}
            certificateId={certificateData.certificateId}
            date={certificateData.date}
          />
        </div>

        <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
          <Button
            variant="outline"
            onClick={onBack}
            className="border border-blue-200 text-blue-700 hover:bg-blue-50 rounded-xl flex-1 sm:flex-none py-2 px-4"
          >
            <Eye className="h-4 w-4 mr-2" />
            Edit Information
          </Button>
          <Button
            onClick={onGenerate}
            className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white rounded-xl shadow-md flex-1 sm:flex-none py-2 px-4 transition-all duration-200 transform hover:scale-105"
            disabled={isLoading}
          >
            <SaveAll className="h-4 w-4 mr-2" />
            {isLoading ? "Saving..." : "Generate Certificate"}
          </Button>
        </div>
        
        <div className="mt-6 pt-4 border-t border-gray-200 flex justify-center space-x-8">
          <img src={iecLogoPath} alt="IEC Logo" className="h-8 w-auto opacity-60" />
          <img src={gdgLogoPath} alt="GDG Logo" className="h-8 w-auto opacity-60" />
        </div>
      </CardContent>
    </Card>
  );
};

export default Step2Preview;
