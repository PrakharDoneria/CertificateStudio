import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { insertCertificateSchema, InsertCertificate } from "@shared/schema";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { AtSign, Github, Globe, FileText, User } from "lucide-react";

type Step1FormProps = {
  onSubmit: (data: InsertCertificate) => void;
  initialData: any | null;
};

const Step1Form: React.FC<Step1FormProps> = ({ onSubmit, initialData }) => {
  const defaultValues: Partial<InsertCertificate> = {
    name: initialData?.name || "",
    email: initialData?.email || "",
    githubRepo: initialData?.githubRepo || "",
    vercelDeployment: initialData?.vercelDeployment || "",
    projectExplanation: initialData?.projectExplanation || "",
  };

  const form = useForm<InsertCertificate>({
    resolver: zodResolver(insertCertificateSchema),
    defaultValues,
  });

  return (
    <Card className="bg-white shadow-lg rounded-xl mb-8 overflow-hidden border-0">
      <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-4 text-white">
        <div className="flex items-center">
          <div className="flex items-center justify-center h-10 w-10 rounded-full bg-white/20 backdrop-blur-sm mr-4">
            <User className="h-6 w-6 text-white" />
          </div>
          <h2 className="text-2xl font-bold">
            Enter Your Information
          </h2>
        </div>
      </div>
      
      <CardContent className="py-6 px-8">
        <div className="mb-6 text-center">
          <h3 className="text-xl font-semibold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Enter Your Project Information
          </h3>
          <p className="text-gray-500 mt-2">
            Fill in the details below to generate your project completion certificate
          </p>
        </div>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-6"
          >
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-blue-700 flex items-center">
                    <User className="h-4 w-4 mr-2 opacity-70" />
                    Full Name
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="John Doe"
                      className="rounded-lg border-blue-100 focus:border-blue-300 focus:ring-blue-200"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="text-red-500" />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-blue-700 flex items-center">
                    <AtSign className="h-4 w-4 mr-2 opacity-70" />
                    Email Address
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      placeholder="johndoe@example.com"
                      className="rounded-lg border-blue-100 focus:border-blue-300 focus:ring-blue-200"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="text-red-500" />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="githubRepo"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-blue-700 flex items-center">
                    <Github className="h-4 w-4 mr-2 opacity-70" />
                    GitHub Repository Link
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="https://github.com/username/repository"
                      className="rounded-lg border-blue-100 focus:border-blue-300 focus:ring-blue-200"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription className="text-xs text-gray-500">
                    The URL to your project's GitHub repository
                  </FormDescription>
                  <FormMessage className="text-red-500" />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="vercelDeployment"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-blue-700 flex items-center">
                    <Globe className="h-4 w-4 mr-2 opacity-70" />
                    Vercel Deployment Link
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="https://your-project.vercel.app"
                      className="rounded-lg border-blue-100 focus:border-blue-300 focus:ring-blue-200"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription className="text-xs text-gray-500">
                    The live URL where your project is deployed
                  </FormDescription>
                  <FormMessage className="text-red-500" />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="projectExplanation"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-blue-700 flex items-center">
                    <FileText className="h-4 w-4 mr-2 opacity-70" />
                    Project Explanation
                  </FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Briefly explain your project, its purpose, and the technologies used..."
                      className="resize-none rounded-lg border-blue-100 focus:border-blue-300 focus:ring-blue-200"
                      rows={4}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="text-red-500" />
                </FormItem>
              )}
            />

            <div className="pt-4 flex flex-col items-center">
              <Button
                type="submit"
                className="w-full sm:w-auto bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white py-2 px-6 rounded-xl shadow-md transition-all duration-200 transform hover:scale-105"
              >
                Preview Certificate
              </Button>
              <p className="mt-3 text-xs text-gray-500 text-center">
                All fields are required to generate your certificate
              </p>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default Step1Form;
