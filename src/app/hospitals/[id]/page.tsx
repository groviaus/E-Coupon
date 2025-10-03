"use client";

import React, { useState } from "react";
import Image from "next/image";
import { notFound } from "next/navigation";
import { ServiceListItem } from "@/components/ui/ServiceListItem";
import { BookingCalendar } from "@/components/booking/BookingCalendar";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { MapPin, Phone, Star, Calendar } from "lucide-react";

interface HospitalDetailPageProps {
  params: {
    id: string;
  };
}

// Mock hospital data
const getHospitalData = (id: string) => {
  const hospitals = {
    "1": {
      id: "1",
      name: "King Faisal Specialist Hospital & Research Centre",
      imageUrl: "/images/faisal.webp",
      address: "Al Mathar Ash Shamali, Riyadh 11211, Saudi Arabia",
      phone: "+966 11 442 7777",
      rating: 4.8,
      description:
        "A world-class medical facility specializing in cancer treatment, organ transplantation, and cardiovascular diseases. Established in 1975, it serves as a tertiary care hospital and research center.",
      services: [
        {
          name: "Cardiology Consultation",
          originalPrice: 300,
          discountedPrice: 210,
        },
        {
          name: "Oncology Treatment Session",
          originalPrice: 800,
          discountedPrice: 600,
        },
        {
          name: "Neurology Consultation",
          originalPrice: 250,
          discountedPrice: 175,
        },
        {
          name: "Orthopedic Surgery",
          originalPrice: 1500,
          discountedPrice: 1200,
        },
        {
          name: "Emergency Care Visit",
          originalPrice: 200,
          discountedPrice: 140,
        },
      ],
    },
    "2": {
      id: "2",
      name: "King Abdulaziz Medical City",
      imageUrl: "/images/abdulaziz.webp",
      address: "King Abdulaziz Medical City, Riyadh 11426, Saudi Arabia",
      phone: "+966 11 801 1111",
      rating: 4.7,
      description:
        "A comprehensive healthcare facility providing specialized medical services including cardiac care, oncology, and transplant programs.",
      services: [
        {
          name: "General Medicine Consultation",
          originalPrice: 150,
          discountedPrice: 112,
        },
        {
          name: "Surgery Consultation",
          originalPrice: 400,
          discountedPrice: 320,
        },
        {
          name: "Pediatric Check-up",
          originalPrice: 180,
          discountedPrice: 144,
        },
        {
          name: "Ophthalmology Exam",
          originalPrice: 200,
          discountedPrice: 160,
        },
        {
          name: "Dermatology Consultation",
          originalPrice: 220,
          discountedPrice: 176,
        },
      ],
    },
    "3": {
      id: "3",
      name: "King Fahd Medical City",
      imageUrl: "/images/fahad.webp",
      address: "King Fahd Medical City, Riyadh 11564, Saudi Arabia",
      phone: "+966 11 288 9999",
      rating: 4.6,
      description:
        "A major healthcare complex offering comprehensive medical services with specialized centers for rehabilitation and mental health.",
      services: [
        {
          name: "Internal Medicine Consultation",
          originalPrice: 180,
          discountedPrice: 144,
        },
        { name: "Radiology Scan", originalPrice: 350, discountedPrice: 280 },
        { name: "Pathology Test", originalPrice: 120, discountedPrice: 96 },
        {
          name: "Rehabilitation Session",
          originalPrice: 200,
          discountedPrice: 160,
        },
        {
          name: "Mental Health Consultation",
          originalPrice: 250,
          discountedPrice: 200,
        },
      ],
    },
    "4": {
      id: "4",
      name: "King Abdullah Medical Complex",
      imageUrl: "/images/abdullah.jpg",
      address: "King Abdullah Medical Complex, Jeddah 21423, Saudi Arabia",
      phone: "+966 12 640 1000",
      rating: 4.9,
      description:
        "A state-of-the-art medical facility specializing in cardiac surgery, neurosurgery, and emergency medicine with 24/7 services.",
      services: [
        {
          name: "Cardiac Surgery Consultation",
          originalPrice: 500,
          discountedPrice: 350,
        },
        {
          name: "Neurosurgery Consultation",
          originalPrice: 600,
          discountedPrice: 450,
        },
        {
          name: "Transplant Consultation",
          originalPrice: 800,
          discountedPrice: 600,
        },
        {
          name: "Emergency Medicine Visit",
          originalPrice: 300,
          discountedPrice: 210,
        },
        {
          name: "Intensive Care Consultation",
          originalPrice: 400,
          discountedPrice: 320,
        },
      ],
    },
    "5": {
      id: "5",
      name: "Dr. Sulaiman Al Habib Hospital",
      imageUrl: "/images/sulaiman.jpg",
      address: "Dr. Sulaiman Al Habib Hospital, Dubai Healthcare City, UAE",
      phone: "+971 4 429 7777",
      rating: 4.5,
      description:
        "A modern healthcare facility offering comprehensive medical services including general practice, obstetrics, and family medicine.",
      services: [
        {
          name: "General Practice Consultation",
          originalPrice: 200,
          discountedPrice: 170,
        },
        {
          name: "Obstetrics Check-up",
          originalPrice: 250,
          discountedPrice: 212,
        },
        {
          name: "Gynecology Consultation",
          originalPrice: 220,
          discountedPrice: 187,
        },
        {
          name: "Family Medicine Visit",
          originalPrice: 180,
          discountedPrice: 153,
        },
        {
          name: "Vaccination Service",
          originalPrice: 100,
          discountedPrice: 85,
        },
      ],
    },
    "6": {
      id: "6",
      name: "Al Noor Specialist Hospital",
      imageUrl: "/images/al_noor.webp",
      address: "Al Noor Specialist Hospital, Mecca 24231, Saudi Arabia",
      phone: "+966 12 542 2222",
      rating: 4.4,
      description:
        "A specialized healthcare center providing emergency care, general surgery, and pediatric services to the local community.",
      services: [
        {
          name: "Emergency Care Visit",
          originalPrice: 150,
          discountedPrice: 90,
        },
        {
          name: "General Surgery Consultation",
          originalPrice: 300,
          discountedPrice: 240,
        },
        {
          name: "Internal Medicine Consultation",
          originalPrice: 180,
          discountedPrice: 144,
        },
        {
          name: "Pediatric Check-up",
          originalPrice: 160,
          discountedPrice: 128,
        },
        { name: "Laboratory Tests", originalPrice: 120, discountedPrice: 96 },
      ],
    },
  };

  return hospitals[id as keyof typeof hospitals] || null;
};

const HospitalDetailPage = ({ params }: HospitalDetailPageProps) => {
  const hospital = getHospitalData(params.id);

  if (!hospital) {
    notFound();
  }

  const [selectedService, setSelectedService] = useState<{
    name: string;
    originalPrice: number;
    discountedPrice: number;
  } | null>(null);

  const [isBookingDialogOpen, setIsBookingDialogOpen] = useState(false);

  const handleServiceSelect = (service: {
    name: string;
    originalPrice: number;
    discountedPrice: number;
  }) => {
    setSelectedService(service);
    setIsBookingDialogOpen(true);
  };

  const handleBookingComplete = (date: Date, time: string) => {
    console.log("Booking completed:", {
      hospital: hospital.name,
      service: selectedService,
      date,
      time,
    });
    // The BookingCalendar component now handles navigation to /book/confirm
    // No need for additional logic here
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, index) => (
      <Star
        key={index}
        className={`w-5 h-5 ${
          index < Math.floor(rating)
            ? "fill-yellow-400 text-yellow-400"
            : "text-gray-300"
        }`}
      />
    ));
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Hospital Header */}
      <div className="mb-8">
        <div className="relative h-96 w-full mb-6 rounded-lg overflow-hidden">
          <Image
            src={hospital.imageUrl}
            alt={hospital.name}
            fill
            className="object-cover"
          />
        </div>

        <div className="max-w-4xl">
          <h1 className="text-4xl font-bold mb-4">{hospital.name}</h1>

          <div className="flex items-center mb-4">
            <div className="flex items-center mr-6">
              {renderStars(hospital.rating)}
              <span className="ml-2 text-lg font-semibold">
                {hospital.rating}
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div className="flex items-start gap-3">
              <MapPin className="w-5 h-5 text-gray-600 mt-1 flex-shrink-0" />
              <div>
                <p className="font-semibold text-gray-900">Address</p>
                <p className="text-gray-600">{hospital.address}</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Phone className="w-5 h-5 text-gray-600 mt-1 flex-shrink-0" />
              <div>
                <p className="font-semibold text-gray-900">Phone</p>
                <p className="text-gray-600">{hospital.phone}</p>
              </div>
            </div>
          </div>

          <p className="text-gray-700 text-lg leading-relaxed">
            {hospital.description}
          </p>
        </div>
      </div>

      {/* Available Services Section */}
      <div>
        <h2 className="text-3xl font-bold mb-6">Available Services</h2>
        <div className="space-y-4">
          {hospital.services.map((service, index) => (
            <ServiceListItem
              key={index}
              serviceName={service.name}
              originalPrice={service.originalPrice}
              discountedPrice={service.discountedPrice}
              onSelect={() => handleServiceSelect(service)}
            />
          ))}
        </div>
      </div>

      {/* Booking Dialog */}
      <Dialog open={isBookingDialogOpen} onOpenChange={setIsBookingDialogOpen}>
        <DialogContent className="max-w-5xl max-h-[90vh] overflow-y-auto p-0 hide-scrollbar">
          <div className="p-6 pb-0">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-3 text-xl">
                <Calendar className="w-6 h-6 text-blue-600" />
                Book Appointment
                {selectedService && (
                  <Badge variant="secondary" className="ml-2">
                    {selectedService.name}
                  </Badge>
                )}
              </DialogTitle>
            </DialogHeader>
          </div>

          {selectedService && (
            <div className="mb-6">
              <div className="bg-blue-50 p-4 rounded-lg">
                <h3 className="font-semibold text-blue-800 mb-2">
                  Selected Service
                </h3>
                <p className="text-blue-700 mb-2">{selectedService.name}</p>
                <div className="flex items-center gap-4">
                  <span className="line-through text-gray-500">
                    SAR {selectedService.originalPrice}
                  </span>
                  <span className="text-lg font-bold text-green-600">
                    SAR {selectedService.discountedPrice}
                  </span>
                  <span className="text-sm text-green-600 font-medium">
                    Save SAR{" "}
                    {selectedService.originalPrice -
                      selectedService.discountedPrice}
                  </span>
                </div>
              </div>
            </div>
          )}

          <div className="px-6 pb-6">
            <BookingCalendar
              onBookingComplete={handleBookingComplete}
              selectedService={selectedService}
            />
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default HospitalDetailPage;
