"use client";

import React, { useState } from "react";
import {
  ShieldCheck,
  KeyRound,
  Smartphone,
  Fingerprint,
  Eye,
  EyeOff,
  AlertCircle,
  History,
  LogOut,
  Key,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import Back from "../shared/back";

export default function SecurityView() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="w-full px-8 mx-auto space-y-8 overflow-auto h-full">
      <div className="flex flex-col md:flex-row justify-between gap-4">
        <Back path="/profile" />

        <div className="space-y-1">
          <h2 className="text-3xl font-semibold tracking-tight">
            Security Settings
          </h2>
          <p className="text-muted-foreground">
            Manage your password and account protection.
          </p>
        </div>
      </div>

      <section className="space-y-4">
        <div className="flex items-center gap-2 font-semibold text-lg">
          <KeyRound className="size-5 text-primary" />
          <h3>Update Password</h3>
        </div>
        <Card className="border-muted/40 shadow-sm">
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="current">Current Password</Label>
              <Input id="current" type="password" placeholder="••••••••" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="new">New Password</Label>
                <div className="relative">
                  <Input
                    id="new"
                    type={showPassword ? "text" : "password"}
                    placeholder="Min. 8 characters"
                  />
                  <Button
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-3 text-muted-foreground hover:text-primary"
                  >
                    {showPassword ? (
                      <EyeOff className="size-4" />
                    ) : (
                      <Eye className="size-4" />
                    )}
                  </Button>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="confirm">Confirm Password</Label>
                <Input id="confirm" type="password" placeholder="••••••••" />
              </div>
            </div>

            <Button className="w-full md:w-fit px-8 ">
              Update Password
              <Key />
            </Button>
          </CardContent>
        </Card>
      </section>

      <section className="space-y-4">
        <div className="flex items-center gap-2 font-semibold text-lg">
          <Smartphone className="size-5 text-primary" />
          <h3>Two-Step Verification</h3>
        </div>
        <div className="p-4 rounded-2xl border bg-accent/5 flex items-center justify-between gap-4">
          <div className="space-y-1">
            <p className="font-medium">SMS Verification</p>
            <p className="text-sm text-muted-foreground">
              Receive a code via text message to sign in.
            </p>
          </div>
          <Switch />
        </div>
        <div className="p-4 rounded-2xl border bg-accent/5 flex items-center justify-between gap-4">
          <div className="space-y-1">
            <p className="font-medium flex items-center gap-2">
              Authenticator App{" "}
              <Badge variant="secondary" className="text-[10px] h-4">
                Recommended
              </Badge>
            </p>
            <p className="text-sm text-muted-foreground">
              Use Google Authenticator for an extra layer of safety.
            </p>
          </div>
          <Switch defaultChecked />
        </div>
      </section>

      <section className="space-y-4">
        <div className="flex items-center gap-2 font-semibold text-lg">
          <History className="size-5 text-primary" />
          <h3>Login Activity</h3>
        </div>
        <div className="rounded-2xl border divide-y overflow-hidden">
          <div className="p-4 flex items-center justify-between text-sm">
            <div className="flex items-center gap-3">
              <div className="size-8 bg-primary/10 rounded-full flex items-center justify-center text-primary">
                <Smartphone className="size-4" />
              </div>
              <div>
                <p className="font-medium">iPhone 15 Pro • Dhaka, BD</p>
                <p className="text-muted-foreground text-xs">Active now</p>
              </div>
            </div>
            <span className="text-emerald-600 font-medium">Current</span>
          </div>
          <div className="p-4 flex items-center justify-between text-sm bg-muted/20">
            <div className="flex items-center gap-3">
              <div className="size-8 bg-muted rounded-full flex items-center justify-center text-muted-foreground">
                <Fingerprint className="size-4" />
              </div>
              <div>
                <p className="font-medium">Windows PC • Chittagong, BD</p>
                <p className="text-muted-foreground text-xs">2 days ago</p>
              </div>
            </div>
            <Button variant="secondary" className="text-destructive h-8">
              Log out
              <LogOut />
            </Button>
          </div>
        </div>
      </section>

      <div className="bg-amber-500/10 border border-amber-500/20 p-4 rounded-2xl flex gap-3">
        <AlertCircle className="size-5 text-amber-600 shrink-0" />
        <p className="text-sm text-amber-800">
          <b>Pro Tip:</b> Changing your password will log you out of all devices
          except this one.
        </p>
      </div>
    </div>
  );
}
