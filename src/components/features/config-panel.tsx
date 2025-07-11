"use client";

import { type UseFormReturn } from "react-hook-form";
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

export const credentialsSchema = z.object({
  domain: z.string().url({ message: "Please enter a valid URL." }),
  email: z.string().email({ message: "Please enter a valid email." }),
  password: z.string().min(1, { message: "Password cannot be empty." }),
});

export const apiSchema = z.object({
  apiKey: z.string().min(1, { message: "API Key cannot be empty." }),
});

interface ConfigPanelProps {
  credentialsForm: UseFormReturn<z.infer<typeof credentialsSchema>>;
  apiForm: UseFormReturn<z.infer<typeof apiSchema>>;
}

export function ConfigPanel({ credentialsForm, apiForm }: ConfigPanelProps) {
  const { toast } = useToast();

  // These functions are now just for showing the toast.
  // The actual data submission is handled by the "Refresh Data" button.
  function onValidSubmit() {
    toast({
      title: "Configuration Set",
      description: "Click 'Refresh Data' to fetch client information.",
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
              <form onSubmit={credentialsForm.handleSubmit(onValidSubmit)} className="space-y-4 pt-4">
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
                <Button type="submit" className="w-full">
                    Set Credentials
                </Button>
              </form>
            </Form>
          </TabsContent>
          <TabsContent value="api">
             <Form {...apiForm}>
              <form onSubmit={apiForm.handleSubmit(onValidSubmit)} className="space-y-4 pt-4">
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
                <Button type="submit" className="w-full">
                    Set API Key
                </Button>
              </form>
            </Form>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
