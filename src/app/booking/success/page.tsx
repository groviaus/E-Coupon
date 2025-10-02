"use client";

import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  CheckCircle,
  Calendar,
  Clock,
  Hospital,
  User,
  MapPin,
  QrCode,
  Download,
  Share2,
} from "lucide-react";
import QRCode from "react-qr-code";

const SuccessPage = () => {
  // Generate a random booking ID
  const generateBookingId = () => {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let result = "MAVEN-";
    for (let i = 0; i < 8; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
  };

  // Mock booking data (in a real app, this would come from props/state)
  const bookingData = {
    hospitalName: "King Fahd Medical City",
    serviceName: "Mental Health Consultation",
    patientName: "Ahmed Al-Rashid",
    date: "October 2, 2025",
    time: "03:00 PM",
    location: "Mental Health Department, Floor 3, Room 301",
    bookingId: generateBookingId(),
    originalPrice: 250,
    discountedPrice: 200,
    savings: 50,
  };

  // Create QR code data for verification
  const qrCodeData = {
    type: "appointment_verification",
    bookingId: bookingData.bookingId,
    patientName: bookingData.patientName,
    hospitalName: bookingData.hospitalName,
    serviceName: bookingData.serviceName,
    appointmentDate: bookingData.date,
    appointmentTime: bookingData.time,
    location: bookingData.location,
    verificationUrl: `${
      typeof window !== "undefined" ? window.location.origin : ""
    }/api/verify-booking/${bookingData.bookingId}`,
    timestamp: new Date().toISOString(),
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 py-8">
      <div className="container mx-auto px-4 max-w-md">
        {/* Success Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Booking Confirmed!
          </h1>
          <p className="text-gray-600">
            Your appointment has been successfully scheduled
          </p>
        </div>

        {/* Virtual Pass/Card */}
        <Card className="mb-8 shadow-lg border-2 border-green-200 bg-white">
          <CardContent className="p-6">
            {/* Header */}
            <div className="text-center mb-6">
              <div className="flex items-center justify-center mb-4">
                {/* QR Code for verification */}
                <div className="bg-white p-3 rounded-lg border-2 border-gray-200">
                  <QRCode
                    value={JSON.stringify(qrCodeData)}
                    size={120}
                    style={{ height: "auto", maxWidth: "100%", width: "100%" }}
                  />
                </div>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <Hospital className="w-6 h-6 text-blue-600" />
              </div>
              <h2 className="text-xl font-bold text-gray-900 mb-1">
                Appointment Pass
              </h2>
              <div className="flex items-center justify-center gap-2 mb-2">
                <Badge
                  variant="secondary"
                  className="bg-green-100 text-green-800"
                >
                  Confirmed
                </Badge>
                <Badge
                  variant="outline"
                  className="bg-blue-50 text-blue-700 border-blue-200"
                >
                  QR Verified
                </Badge>
              </div>
            </div>

            {/* Booking Details */}
            <div className="space-y-4">
              {/* Hospital */}
              <div className="flex items-start gap-3">
                <Hospital className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-sm font-medium text-gray-600">Hospital</p>
                  <p className="font-semibold text-gray-900">
                    {bookingData.hospitalName}
                  </p>
                </div>
              </div>

              {/* Service */}
              <div className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-sm font-medium text-gray-600">Service</p>
                  <p className="font-semibold text-gray-900">
                    {bookingData.serviceName}
                  </p>
                </div>
              </div>

              {/* Patient */}
              <div className="flex items-start gap-3">
                <User className="w-5 h-5 text-purple-600 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-sm font-medium text-gray-600">Patient</p>
                  <p className="font-semibold text-gray-900">
                    {bookingData.patientName}
                  </p>
                </div>
              </div>

              {/* Date & Time */}
              <div className="flex items-start gap-3">
                <Calendar className="w-5 h-5 text-orange-600 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-sm font-medium text-gray-600">
                    Date & Time
                  </p>
                  <p className="font-semibold text-gray-900">
                    {bookingData.date} at {bookingData.time}
                  </p>
                </div>
              </div>

              {/* Location */}
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-red-600 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-sm font-medium text-gray-600">Location</p>
                  <p className="font-semibold text-gray-900 text-sm">
                    {bookingData.location}
                  </p>
                </div>
              </div>

              {/* Booking ID */}
              <div className="flex items-start gap-3">
                <QrCode className="w-5 h-5 text-indigo-600 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-sm font-medium text-gray-600">
                    Booking ID
                  </p>
                  <p className="font-mono font-bold text-gray-900 text-sm">
                    {bookingData.bookingId}
                  </p>
                </div>
              </div>

              {/* Pricing */}
              <div className="bg-gray-50 p-3 rounded-lg mt-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Original Price:</span>
                  <span className="line-through text-gray-500">
                    SAR {bookingData.originalPrice}
                  </span>
                </div>
                <div className="flex justify-between items-center mt-1">
                  <span className="text-sm text-gray-600">You Paid:</span>
                  <span className="text-lg font-bold text-green-600">
                    SAR {bookingData.discountedPrice}
                  </span>
                </div>
                <div className="flex justify-between items-center mt-1 text-sm">
                  <span className="text-green-600 font-medium">You Saved:</span>
                  <span className="text-green-600 font-bold">
                    SAR {bookingData.savings}
                  </span>
                </div>
              </div>
            </div>

            {/* Important Note */}
            <div className="mt-6 space-y-3">
              <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                <p className="text-sm text-blue-800 text-center">
                  <strong>Scan QR Code:</strong> Hospital staff can scan this
                  code to verify your appointment details instantly.
                </p>
              </div>
              <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                <p className="text-sm text-yellow-800 text-center">
                  <strong>Important:</strong> Show this pass at the hospital
                  reception when you arrive for your appointment.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="space-y-3">
          <Button className="w-full bg-blue-600 hover:bg-blue-700" size="lg">
            <Download className="w-4 h-4 mr-2" />
            Download Pass (PDF)
          </Button>

          <Button variant="outline" className="w-full" size="lg">
            <Share2 className="w-4 h-4 mr-2" />
            Share Pass
          </Button>

          <Link href="/">
            <Button variant="outline" className="w-full" size="lg">
              Back to Home
            </Button>
          </Link>
        </div>

        {/* Footer */}
        <div className="mt-8 text-center">
          <p className="text-sm text-gray-500">
            Need help? Contact us at{" "}
            <a
              href="tel:+966112888888"
              className="text-blue-600 hover:underline"
            >
              +966 11 288 8888
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SuccessPage;
