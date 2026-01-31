"use client";

import React from "react";
import {
  Moon,
  Sun,
  Languages,
  BellRing,
  EyeOff,
  Accessibility,
  Smartphone,
  Globe,
} from "lucide-react";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import Back from "../shared/back";

export default function PreferencesView() {
  return (
    <div className=" mx-auto">
      <div className="flex items-center justify-between">
        <Back path="/profile" />
        <div className="space-y-1">
          <h2 className="text-3xl font-bold tracking-tight">Preferences</h2>
          <p className="text-muted-foreground">
            Customize your experience and how you interact with the platform.
          </p>
        </div>
      </div>

      <div className="space-y-6">
        <section className="space-y-4">
          <div className="flex items-center gap-2">
            <Sun className="size-5 text-primary" />
            <h3 className="font-semibold text-lg">Appearance</h3>
          </div>
          <div className="grid gap-4 p-4 rounded-2xl border bg-accent/5">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label className="text-base">Dark Mode</Label>
                <p className="text-sm text-muted-foreground">
                  Adjust the interface to reduce eye strain.
                </p>
              </div>
              <Switch defaultChecked />
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label className="text-base">High Contrast</Label>
                <p className="text-sm text-muted-foreground">
                  Make text easier to read.
                </p>
              </div>
              <Switch />
            </div>
          </div>
        </section>

        <section className="space-y-4">
          <div className="flex items-center gap-2">
            <Globe className="size-5 text-primary" />
            <h3 className="font-semibold text-lg">Language & Region</h3>
          </div>
          <div className="grid gap-4 p-4 rounded-2xl border bg-accent/5">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label className="text-base">Language</Label>
                <p className="text-sm text-muted-foreground">
                  Select your preferred language.
                </p>
              </div>
              <Select defaultValue="en">
                <SelectTrigger className="w-[140px]">
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="en">English</SelectItem>
                  <SelectItem value="bn">Bengali</SelectItem>
                  <SelectItem value="ar">Arabic</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </section>

        <section className="space-y-4">
          <div className="flex items-center gap-2">
            <EyeOff className="size-5 text-primary" />
            <h3 className="font-semibold text-lg">Privacy Preferences</h3>
          </div>
          <div className="grid gap-4 p-4 rounded-2xl border bg-accent/5">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label className="text-base">Public Profile</Label>
                <p className="text-sm text-muted-foreground">
                  Allow others to see your health points and badges.
                </p>
              </div>
              <Switch />
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label className="text-base">Sync with Mobile</Label>
                <p className="text-sm text-muted-foreground">
                  Auto-sync prescriptions with the mobile app.
                </p>
              </div>
              <Switch defaultChecked />
            </div>
          </div>
        </section>
      </div>

      <p className="text-center text-xs text-muted-foreground pt-4">
        Some settings may require a page refresh to take full effect.
      </p>
    </div>
  );
}

// @git commit -m "".
