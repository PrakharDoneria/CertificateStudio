import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Certificate from "@/components/Certificate";
import { ChevronLeft } from "lucide-react";
import { InsertCertificate } from "@shared/schema";

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
    <Card className="bg-white shadow rounded-lg mb-8">
      <CardContent className="pt-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-gray-800">
            Certificate Preview
          </h2>
          <Button
            variant="ghost"
            onClick={onBack}
            className="text-primary hover:text-indigo-700 font-medium flex items-center"
          >
            <ChevronLeft className="h-4 w-4 mr-1" />
            Back to form
          </Button>
        </div>

        <div className="border-2 border-gray-200 rounded-lg p-1 bg-white">
          <Certificate
            name={certificateData.name}
            githubRepo={certificateData.githubRepo}
            vercelDeployment={certificateData.vercelDeployment}
            certificateId={certificateData.certificateId}
            date={certificateData.date}
          />
        </div>

        <div className="mt-6 flex justify-between">
          <Button
            variant="outline"
            onClick={onBack}
            className="border border-gray-300 text-gray-700"
          >
            Edit Information
          </Button>
          <Button
            onClick={onGenerate}
            className="bg-primary hover:bg-indigo-700"
            disabled={isLoading}
          >
            {isLoading ? "Saving..." : "Generate Certificate"}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default Step2Preview;
