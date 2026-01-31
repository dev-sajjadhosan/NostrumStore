"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  LogOut,
  ArrowLeft,
  Heart,
  Pill,
  CheckCircle2,
  Home,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import logout from "../../../../public/logout.svg";
import logout2 from "../../../../public/logout2.svg";
import { useRouter } from "next/navigation";

export default function LogoutPage({ onBack }: { onBack: () => void }) {
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const router = useRouter();
  const smoothTransition = {
    duration: 0.6,
    ease: [0.4, 0, 0.2, 1] as const,
  };

  const handleLogout = () => {
    setIsLoggingOut(true);
  };

  return (
    <div className="w-full h-full flex flex-col md:flex-row items-stretch overflow-hidden">
      <motion.div
        layout
        transition={smoothTransition}
        className={`flex flex-col items-center justify-center text-center p-12 relative duration-300 ${
          isLoggingOut ? "w-full grow " : "w-full md:w-1/2"
        }`}
      >
        <AnimatePresence mode="wait">
          {!isLoggingOut ? (
            <motion.div
              key="goodbye"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3 }}
              className="space-y-6"
            >
              <div className="relative w-72 h-72 md:w-90 md:h-90 drop-shadow-2xl animate-float mx-auto">
                <Image
                  src={logout}
                  alt="Logout Illustration"
                  className="object-contain w-full h-full"
                />
              </div>
              <div className="space-y-2">
                <h2 className="text-3xl font-semibold tracking-tight">
                  Take care, Sajjad!{" "}
                  <Heart className="inline size-6 text-red-500 fill-red-500" />
                </h2>
                <p className="text-muted-foreground max-w-lg mx-auto">
                  Your health journey continues even when you're offline. We'll
                  be here when you need us next.
                </p>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="thankyou"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="space-y-6"
            >
              <div className="relative w-80 h-80 md:w-100 md:h-100 mx-auto">
                <Image
                  src={logout2}
                  alt="Success Illustration"
                  className="object-contain w-full h-full"
                />
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-center gap-2 text-primary">
                  <h2 className="text-3xl  font-normal tracking-wide text-foreground">
                    Successfully Signed Out
                  </h2>
                </div>
                <p className="text-lg text-muted-foreground">
                  Thank you for choosing our pharmacy. Have a healthy day!
                </p>

                <div className="pt-6">
                  <Button
                    variant="secondary"
                    size={"lg"}
                    onClick={() => router.push("/")}
                  >
                    <Home />
                    Return to Homepage
                  </Button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      <AnimatePresence>
        {!isLoggingOut && (
          <motion.div
            initial={{ opacity: 1, x: 0 }}
            exit={{
              opacity: 0,
              x: 150,
              transition: smoothTransition,
            }}
            transition={smoothTransition}
            className="w-full md:w-1/2 p-12 flex flex-col justify-center bg-background rounded-3xl"
          >
            <div className="max-w-sm mx-auto w-full space-y-8">
              <div className="flex flex-col gap-3">
                <div className="p-10 flex items-center justify-center">
                  <Pill className="animate-pulse" size={100} strokeWidth={1} />
                </div>
                <h3 className="text-2xl font-semibold mt-5">Sign Out</h3>
                <p className="text-sm text-muted-foreground">
                  Are you sure you want to end your current session? You will
                  need to re-authenticate to access your prescriptions and
                  orders.
                </p>
              </div>

              <div className="space-y-4">
                <Button
                  variant="default"
                  className="w-full h-12 text-md font-semibold gap-2 shadow-lg shadow-primary/20 "
                  onClick={handleLogout}
                >
                  <LogOut className="size-5" /> Yes, Sign Me Out
                </Button>

                <Button
                  variant="secondary"
                  className="w-full h-12"
                  onClick={() => router.push("/")}
                >
                  <ArrowLeft className="size-4 mr-2" /> Stay Logged In
                </Button>
              </div>

              <p className="text-[10px] text-center text-muted-foreground uppercase tracking-widest pt-4">
                Security Protected Session
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
