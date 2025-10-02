import React from "react";
import { HospitalCard } from "@/components/ui/HospitalCard";

const Home = () => {
  // Mock data for Saudi Arabian hospitals
  const hospitals = [
    {
      id: "1",
      name: "King Faisal Specialist Hospital & Research Centre",
      imageUrl:
        "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400&h=300&fit=crop&auto=format",
      discountTag: "Up to 30% Off",
      location: "Riyadh, Saudi Arabia",
      rating: 4.8,
      specialties: [
        "Cardiology",
        "Oncology",
        "Neurology",
        "Orthopedics",
        "Emergency Care",
      ],
      workingHours: "24/7 Emergency Services",
    },
    {
      id: "2",
      name: "King Abdulaziz Medical City",
      imageUrl:
        "https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=400&h=300&fit=crop&auto=format",
      discountTag: "Up to 25% Off",
      location: "Riyadh, Saudi Arabia",
      rating: 4.7,
      specialties: [
        "General Medicine",
        "Surgery",
        "Pediatrics",
        "Ophthalmology",
        "Dermatology",
      ],
      workingHours: "Open 24 hours",
    },
    {
      id: "3",
      name: "King Fahd Medical City",
      imageUrl:
        "https://images.unsplash.com/photo-1581056771107-24ca5f033842?w=400&h=300&fit=crop&auto=format",
      discountTag: "Up to 20% Off",
      location: "Riyadh, Saudi Arabia",
      rating: 4.6,
      specialties: [
        "Internal Medicine",
        "Radiology",
        "Pathology",
        "Rehabilitation",
        "Mental Health",
      ],
      workingHours: "6:00 AM - 10:00 PM",
    },
    {
      id: "4",
      name: "King Abdullah Medical Complex",
      imageUrl:
        "https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=400&h=300&fit=crop&auto=format",
      discountTag: "Up to 35% Off",
      location: "Jeddah, Saudi Arabia",
      rating: 4.9,
      specialties: [
        "Cardiac Surgery",
        "Neurosurgery",
        "Transplant Services",
        "Emergency Medicine",
      ],
      workingHours: "24/7 All Services",
    },
    {
      id: "5",
      name: "Dr. Sulaiman Al Habib Hospital",
      imageUrl:
        "https://images.unsplash.com/photo-1559757175-0eb30cd8c063?w=400&h=300&fit=crop&auto=format",
      discountTag: "Up to 15% Off",
      location: "Dubai, UAE",
      rating: 4.5,
      specialties: [
        "General Practice",
        "Obstetrics",
        "Gynecology",
        "Family Medicine",
      ],
      workingHours: "8:00 AM - 8:00 PM",
    },
    {
      id: "6",
      name: "Al Noor Specialist Hospital",
      imageUrl:
        "https://images.unsplash.com/photo-1581056771107-24ca5f033842?w=400&h=300&fit=crop&auto=format",
      discountTag: "Up to 40% Off",
      location: "Mecca, Saudi Arabia",
      rating: 4.4,
      specialties: [
        "Emergency Care",
        "General Surgery",
        "Internal Medicine",
        "Pediatrics",
      ],
      workingHours: "24/7 Emergency",
    },
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Book Hospital Appointments at a Discount
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Find and book discounted appointments at top hospitals in your area.
          Save money while getting the care you need.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {hospitals.map((hospital) => (
          <HospitalCard
            key={hospital.id}
            id={hospital.id}
            name={hospital.name}
            imageUrl={hospital.imageUrl}
            discountTag={hospital.discountTag}
            location={hospital.location}
            rating={hospital.rating}
            specialties={hospital.specialties}
            workingHours={hospital.workingHours}
          />
        ))}
      </div>
    </div>
  );
};

export default Home;
