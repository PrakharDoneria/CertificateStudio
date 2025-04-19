import React from "react";
import { formatDate } from "@/lib/utils";

type CertificateProps = {
  name: string;
  githubRepo: string;
  vercelDeployment: string;
  certificateId: string;
  date: string;
  ref?: React.RefObject<HTMLDivElement>;
};

const Certificate: React.FC<CertificateProps> = React.forwardRef<HTMLDivElement, CertificateProps>(
  ({ name, githubRepo, vercelDeployment, certificateId, date }, ref) => {
    return (
      <div ref={ref} className="certificate-container border-8 border-indigo-100 rounded-lg relative bg-white p-8">
        <div 
          className="absolute top-0 left-0 w-full h-full bg-center bg-no-repeat opacity-5" 
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1569775309692-fd5e62248d8b?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80')" }}
        ></div>
        
        {/* Certificate Header */}
        <div className="text-center mb-6 relative">
          <div className="mb-2 flex justify-center">
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className="h-16 w-16 text-primary" 
              viewBox="0 0 20 20" 
              fill="currentColor"
            >
              <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0zM6 18a1 1 0 001-1v-2.065a8.935 8.935 0 00-2-.712V17a1 1 0 001 1z" />
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-gray-900 font-serif">Certificate of Completion</h1>
        </div>
        
        {/* Certificate Body */}
        <div className="text-center mb-8">
          <p className="text-gray-600 mb-4">This is to certify that</p>
          <p className="text-3xl font-bold text-gray-900 my-6 font-serif">{name}</p>
          <p className="text-gray-600">has successfully completed a web development project</p>
          <p className="text-gray-600 my-4">
            Project deployed at: <span className="text-primary font-medium">{vercelDeployment}</span>
          </p>
          <p className="text-gray-600">
            GitHub Repository: <span className="text-primary font-medium">{githubRepo}</span>
          </p>
        </div>
        
        {/* Certificate Footer */}
        <div className="mt-12 flex justify-between items-end">
          <div className="text-left">
            <div className="w-48 border-t-2 border-gray-400 pt-1">
              <p className="text-sm text-gray-600">Date</p>
              <p className="text-gray-900">{date}</p>
            </div>
          </div>
          <div className="text-right">
            <img 
              src="https://images.unsplash.com/photo-1560941001-d4b52ad00ecc?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80" 
              alt="Signature" 
              className="mb-1 w-40 h-16 object-contain" 
            />
            <div className="w-48 border-t-2 border-gray-400 pt-1">
              <p className="text-sm text-gray-600">Instructor Signature</p>
              <p className="text-gray-900">Jane Smith</p>
            </div>
          </div>
        </div>
        
        {/* Certificate ID */}
        <div className="mt-8 text-center">
          <p className="text-sm text-gray-500">Certificate ID: <span>{certificateId}</span></p>
          <p className="text-sm text-gray-500">Verify this certificate at certificates.example.com</p>
        </div>
      </div>
    );
  }
);

Certificate.displayName = "Certificate";

export default Certificate;
