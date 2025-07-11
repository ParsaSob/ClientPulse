"use client";

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
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export function ConfigPanel() {
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
            <form>
              <div className="grid w-full items-center gap-4 pt-4">
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="domain">Trainerize Domain</Label>
                  <div className="relative">
                    <Globe className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input id="domain" placeholder="https://yourname.trainerize.com" className="pl-9 font-code" />
                  </div>
                </div>
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="email">Email</Label>
                   <div className="relative">
                    <AtSign className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input id="email" type="email" placeholder="you@example.com" className="pl-9" />
                  </div>
                </div>
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="password">Password</Label>
                   <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input id="password" type="password" placeholder="••••••••" className="pl-9" />
                  </div>
                </div>
                <Button type="submit" className="w-full">Submit Credentials</Button>
              </div>
            </form>
          </TabsContent>
          <TabsContent value="api">
             <form>
              <div className="grid w-full items-center gap-4 pt-4">
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="api-key">Trainerize API Key</Label>
                  <div className="relative">
                    <KeyRound className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input id="api-key" type="password" placeholder="tr-api-••••••••••••••" className="pl-9 font-code" />
                  </div>
                </div>
                <Button type="submit" className="w-full">Submit API Key</Button>
              </div>
            </form>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
