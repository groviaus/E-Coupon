"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CheckCircle, Calendar, Hospital, User } from "lucide-react";

const ConfirmationPage = () => {
  const router = useRouter();
  const [patientName, setPatientName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [isFormValid, setIsFormValid] = useState(false);

  // Mock booking data (in a real app, this would come from props/state)
  const bookingData = {
    hospitalName: "King Fahd Medical City",
    serviceName: "Mental Health Consultation",
    date: "October 2, 2025",
    time: "03:00 PM",
    originalPrice: 250,
    discountedPrice: 200,
    savings: 50,
  };

  // Update form validation when inputs change
  React.useEffect(() => {
    setIsFormValid(patientName.trim() !== "" && phoneNumber.trim() !== "");
  }, [patientName, phoneNumber]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isFormValid) {
      // In a real app, this would submit the form data
      console.log("Booking confirmed:", {
        patientName,
        phoneNumber,
        ...bookingData,
      });
      // Navigate to success page
      router.push("/booking/success");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 max-w-2xl">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-2 mb-4">
            <CheckCircle className="w-8 h-8 text-green-600" />
            <h1 className="text-3xl font-bold text-gray-900">
              Confirm Your Booking
            </h1>
          </div>
          <p className="text-gray-600">
            Please review your appointment details and enter your information
          </p>
        </div>

        {/* Booking Summary */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Hospital className="w-5 h-5" />
              Booking Summary
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="bg-blue-50 p-4 rounded-lg">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center gap-3">
                  <Hospital className="w-5 h-5 text-blue-600" />
                  <div>
                    <p className="font-semibold text-gray-900">Hospital</p>
                    <p className="text-gray-700">{bookingData.hospitalName}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Calendar className="w-5 h-5 text-blue-600" />
                  <div>
                    <p className="font-semibold text-gray-900">Date & Time</p>
                    <p className="text-gray-700">
                      {bookingData.date} at {bookingData.time}
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-4 pt-4 border-t">
                <p className="font-semibold text-gray-900 mb-2">
                  Service Details
                </p>
                <p className="text-lg text-gray-800 mb-3">
                  {bookingData.serviceName}
                </p>
                <div className="flex items-center gap-4">
                  <span className="line-through text-gray-500">
                    SAR {bookingData.originalPrice}
                  </span>
                  <span className="text-xl font-bold text-green-600">
                    SAR {bookingData.discountedPrice}
                  </span>
                  <span className="text-sm text-green-600 font-medium">
                    Save SAR {bookingData.savings}
                  </span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Patient Information Form */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="w-5 h-5" />
              Patient Information
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="patientName">Patient Name *</Label>
                <Input
                  id="patientName"
                  type="text"
                  placeholder="Enter patient's full name"
                  value={patientName}
                  onChange={(e) => setPatientName(e.target.value)}
                  required
                  className="w-full"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="phoneNumber">Phone Number *</Label>
                <Input
                  id="phoneNumber"
                  type="tel"
                  placeholder="+966 XX XXX XXXX"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  required
                  className="w-full"
                />
              </div>

              <div className="pt-4">
                <Button
                  type="submit"
                  disabled={!isFormValid}
                  className="w-full bg-green-600 hover:bg-green-700 disabled:bg-gray-300"
                  size="lg"
                >
                  Confirm & Get Your Pass
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>

        {/* Footer Note */}
        <div className="mt-8 text-center">
          <p className="text-sm text-gray-600">
            By confirming this booking, you agree to our{" "}
            <Link href="#" className="text-blue-600 hover:underline">
              Terms of Service
            </Link>{" "}
            and{" "}
            <Link href="#" className="text-blue-600 hover:underline">
              Privacy Policy
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationPage;
