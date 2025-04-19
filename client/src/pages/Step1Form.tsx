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
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";

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
    <Card className="bg-white shadow rounded-lg mb-8">
      <CardContent className="pt-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-6">
          Enter Certificate Information
        </h2>

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
                  <FormLabel>Full Name*</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="John Doe"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email Address*</FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      placeholder="johndoe@example.com"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="githubRepo"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>GitHub Repository Link*</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="https://github.com/username/repository"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="vercelDeployment"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Vercel Deployment Link*</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="https://your-project.vercel.app"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="projectExplanation"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Project Explanation*</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Briefly explain your project, its purpose, and the technologies used..."
                      className="resize-none"
                      rows={4}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="pt-4">
              <Button
                type="submit"
                className="bg-primary hover:bg-indigo-700"
              >
                Preview Certificate
              </Button>
              <p className="mt-2 text-xs text-gray-500">
                * All fields are required
              </p>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default Step1Form;
