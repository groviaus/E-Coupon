"use client";

import React, { useState, useMemo } from "react";
import { HospitalCard } from "@/components/ui/HospitalCard";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Dropdown } from "@/components/ui/dropdown";
import { Search, Filter, MapPin, Star,Stethoscope } from "lucide-react";

// Mock data for Saudi Arabian hospitals
const hospitalsData = [
  {
    id: "1",
    name: "King Faisal Specialist Hospital & Research Centre",
    imageUrl: "/images/faisal.webp",
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
    imageUrl: "/images/abdulaziz.webp",
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
    imageUrl: "/images/fahad.webp",
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
    imageUrl: "/images/abdullah.jpg",
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
    imageUrl: "/images/sulaiman.jpg",
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
    imageUrl: "/images/al_noor.webp",
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

const Home = () => {
  // State for search and filters
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("");
  const [selectedSpecialty, setSelectedSpecialty] = useState("");
  const [minRating, setMinRating] = useState(0);
  const [showFilters, setShowFilters] = useState(false);

  // Memoize hospitals data to prevent unnecessary re-renders
  const hospitals = useMemo(() => hospitalsData, []);

  // Extract unique values for filters
  const locations = useMemo(() => {
    const uniqueLocations = [...new Set(hospitals.map((h) => h.location))];
    return uniqueLocations.sort();
  }, [hospitals]);

  const specialties = useMemo(() => {
    const allSpecialties = hospitals.flatMap((h) => h.specialties);
    return [...new Set(allSpecialties)].sort();
  }, [hospitals]);

  // Filter hospitals based on search and filters
  const filteredHospitals = useMemo(() => {
    return hospitals.filter((hospital) => {
      // Search filter
      const matchesSearch =
        searchTerm === "" ||
        hospital.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        hospital.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
        hospital.specialties.some((specialty) =>
          specialty.toLowerCase().includes(searchTerm.toLowerCase())
        );

      // Location filter
      const matchesLocation =
        selectedLocation === "" || hospital.location === selectedLocation;

      // Specialty filter
      const matchesSpecialty =
        selectedSpecialty === "" ||
        hospital.specialties.includes(selectedSpecialty);

      // Rating filter
      const matchesRating = hospital.rating >= minRating;

      return (
        matchesSearch && matchesLocation && matchesSpecialty && matchesRating
      );
    });
  }, [hospitals, searchTerm, selectedLocation, selectedSpecialty, minRating]);

  // Clear all filters
  const clearFilters = () => {
    setSearchTerm("");
    setSelectedLocation("");
    setSelectedSpecialty("");
    setMinRating(0);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      <div className="container max-w-7xl mx-auto px-4 py-12">
        {/* Enhanced Header Section */}
        <div className="text-center mb-16">
          <div className="mb-6">
            <Badge className=" px-4 py-2 text-sm font-semibold bg-gradient-to-r from-blue-600 to-green-600 text-white border-0">
              🏥 Healthcare Made Easy
            </Badge>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
            Book Hospital Appointments
            <span className="ml-3 bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
              at a Discount
            </span>
          </h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Find and book discounted appointments at top hospitals in your area.
            Save money while getting the quality care you need from trusted
            healthcare providers.
          </p>
        </div>

        {/* Search and Filter Section */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-12 border border-gray-100">
          {/* Search Bar */}
          <div className="relative mb-6">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <Input
              type="text"
              placeholder="Search hospitals, locations, or specialties..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-12 pr-4 py-3 text-lg border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
            />
          </div>

          {/* Filter Toggle */}
          <div className="flex items-center justify-between mb-6">
            <Button
              variant="outline"
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-2"
            >
              <Filter className="w-4 h-4" />
              {showFilters ? "Hide Filters" : "Show Filters"}
            </Button>

            {(searchTerm ||
              selectedLocation ||
              selectedSpecialty ||
              minRating > 0) && (
              <Button
                variant="ghost"
                onClick={clearFilters}
                className="text-red-600 hover:text-red-700"
              >
                Clear All Filters
              </Button>
            )}
          </div>

          {/* Filter Options */}
          {showFilters && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6 bg-gray-50 rounded-xl border">
              {/* Location Filter */}
              <div>
                <label className="text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
                  <MapPin className="w-4 h-4" />
                  Location
                </label>
                <Dropdown
                  options={[
                    { value: "", label: "All Locations" },
                    ...locations.map((location) => ({
                      value: location,
                      label: location,
                    })),
                  ]}
                  value={selectedLocation}
                  onChange={setSelectedLocation}
                  placeholder="Select location"
                  icon={<MapPin className="w-4 h-4" />}
                />
              </div>

              {/* Specialty Filter */}
              <div>
                <label className="text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
                  <Stethoscope className="w-4 h-4" />
                  Specialty
                </label>
                <Dropdown
                  options={[
                    { value: "", label: "All Specialties" },
                    ...specialties.map((specialty) => ({
                      value: specialty,
                      label: specialty,
                    })),
                  ]}
                  value={selectedSpecialty}
                  onChange={setSelectedSpecialty}
                  placeholder="Select specialty"
                  icon={<Stethoscope className="w-4 h-4" />}
                />
              </div>

              {/* Rating Filter */}
              <div>
                <label className="text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
                  <Star className="w-4 h-4" />
                  Minimum Rating
                </label>
                <select
                  value={minRating}
                  onChange={(e) => setMinRating(Number(e.target.value))}
                  className="w-full p-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 bg-white"
                >
                  <option value={0}>Any Rating</option>
                  <option value={4.0}>4+ Stars</option>
                  <option value={4.5}>4.5+ Stars</option>
                </select>
              </div>
            </div>
          )}

          {/* Results Count */}
          <div className="mt-4 text-sm text-gray-600">
            Showing {filteredHospitals.length} of {hospitals.length} hospitals
          </div>
        </div>

        {/* Hospital Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredHospitals.length > 0 ? (
            filteredHospitals.map((hospital) => (
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
            ))
          ) : (
            <div className="col-span-full text-center py-16">
              <div className="text-6xl mb-4">🏥</div>
              <h3 className="text-2xl font-semibold text-gray-700 mb-2">
                No hospitals found
              </h3>
              <p className="text-gray-500 mb-6">
                Try adjusting your search criteria or filters
              </p>
              <Button onClick={clearFilters} variant="outline">
                Clear Filters
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
