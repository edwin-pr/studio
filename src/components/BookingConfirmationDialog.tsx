
"use client";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { CheckCircle2 } from "lucide-react";
import Link from "next/link";

interface BookingConfirmationDialogProps {
  isOpen: boolean;
  onClose: () => void;
  propertyName: string;
}

export function BookingConfirmationDialog({ isOpen, onClose, propertyName }: BookingConfirmationDialogProps) {
  if (!isOpen) return null;

  return (
    <AlertDialog open={isOpen} onOpenChange={onClose}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <div className="flex justify-center mb-4">
            <CheckCircle2 className="h-16 w-16 text-green-500" />
          </div>
          <AlertDialogTitle className="text-center text-2xl">Booking Confirmed!</AlertDialogTitle>
          <AlertDialogDescription className="text-center">
            Your booking for <strong>{propertyName}</strong> has been successfully processed.
            An email confirmation with your move-in details has been sent.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className="sm:justify-center">
          <Link href="/" passHref>
            <AlertDialogAction asChild>
              <Button onClick={onClose}>Go to Dashboard</Button>
            </AlertDialogAction>
          </Link>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
