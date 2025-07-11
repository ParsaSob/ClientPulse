"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { KeyRound, AtSign, Lock, Globe, Dna } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";

const credentialsSchema = z.object({
  domain: z.string().url({ message: "Please enter a valid URL." }),
  email: z.string().email({ message: "Please enter a valid email." }),
  password: z.string().min(8, { message: "Password must be at least 8 characters." }),
});

const apiSchema = z.object({
  apiKey: z.string().min(1, { message: "API Key cannot be empty." }),
});

export function ConfigPanel() {
  const { toast } = useToast();

  const credentialsForm = useForm<z.infer<typeof credentialsSchema>>({
    resolver: zodResolver(credentialsSchema),
    defaultValues: {
      domain: "",
      email: "",
      password: "",
    },
  });

  const apiForm = useForm<z.infer<typeof apiSchema>>({
    resolver: zodResolver(apiSchema),
    defaultValues: {
      apiKey: "",
    },
  });

  function onCredentialsSubmit(values: z.infer<typeof credentialsSchema>) {
    console.log("Credentials submitted:", values);
    toast({
      title: "Credentials Submitted",
      description: "We've received your credentials.",
    });
  }

  function onApiSubmit(values: z.infer<typeof apiSchema>) {
    console.log("API Key submitted:", values);
    toast({
      title: "API Key Submitted",
      description: "We've received your API key.",
    });
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-3">
            <Dna className="h-6 w-6" />
            <CardTitle className="font-headline">Configuration</CardTitle>
        </div>
        <CardDescription>
          Provide your Trainerize credentials to fetch client data.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="credentials">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="credentials">Email & Password</TabsTrigger>
            <TabsTrigger value="api">API Key</TabsTrigger>
          </TabsList>
          <TabsContent value="credentials">
            <Form {...credentialsForm}>
              <form onSubmit={credentialsForm.handleSubmit(onCredentialsSubmit)} className="space-y-4 pt-4">
                <FormField
                  control={credentialsForm.control}
                  name="domain"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Trainerize Domain</FormLabel>
                      <FormControl>
                        <div className="relative">
                            <Globe className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                            <Input placeholder="https://yourname.trainerize.com" className="pl-9 font-code" {...field} />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={credentialsForm.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <div className="relative">
                            <AtSign className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                            <Input type="email" placeholder="you@example.com" className="pl-9" {...field} />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                 <FormField
                  control={credentialsForm.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <div className="relative">
                            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                            <Input type="password" placeholder="••••••••" className="pl-9" {...field} />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit" className="w-full" disabled={credentialsForm.formState.isSubmitting}>
                    {credentialsForm.formState.isSubmitting ? "Submitting..." : "Submit Credentials"}
                </Button>
              </form>
            </Form>
          </TabsContent>
          <TabsContent value="api">
             <Form {...apiForm}>
              <form onSubmit={apiForm.handleSubmit(onApiSubmit)} className="space-y-4 pt-4">
                <FormField
                  control={apiForm.control}
                  name="apiKey"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Trainerize API Key</FormLabel>
                      <FormControl>
                         <div className="relative">
                            <KeyRound className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                            <Input type="password" placeholder="tr-api-••••••••••••••" className="pl-9 font-code" {...field} />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit" className="w-full" disabled={apiForm.formState.isSubmitting}>
                    {apiForm.formState.isSubmitting ? "Submitting..." : "Submit API Key"}
                </Button>
              </form>
            </Form>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
