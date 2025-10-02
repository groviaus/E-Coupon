"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChevronLeft, ChevronRight, Calendar, Clock } from "lucide-react";

interface BookingCalendarProps {
  onBookingComplete?: (date: Date, time: string) => void;
  selectedService?: {
    name: string;
    originalPrice: number;
    discountedPrice: number;
  } | null;
}

export const BookingCalendar = ({
  onBookingComplete,
  selectedService,
}: BookingCalendarProps) => {
  const router = useRouter();
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<string>("");

  // Available time slots
  const timeSlots = [
    "09:00 AM",
    "09:30 AM",
    "10:00 AM",
    "10:30 AM",
    "11:00 AM",
    "11:30 AM",
    "02:00 PM",
    "02:30 PM",
    "03:00 PM",
    "03:30 PM",
    "04:00 PM",
    "04:30 PM",
    "05:00 PM",
  ];

  // Get calendar data for current month
  const getCalendarDays = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();

    // First day of the month
    const firstDay = new Date(year, month, 1);
    // Last day of the month
    const lastDay = new Date(year, month + 1, 0);

    // Get the day of the week for the first day (0 = Sunday)
    const firstDayOfWeek = firstDay.getDay();

    // Create array for calendar days
    const days: Date[] = [];

    // Add empty slots for days before the first day of the month
    for (let i = 0; i < firstDayOfWeek; i++) {
      const prevMonthDate = new Date(year, month, -firstDayOfWeek + i + 1);
      days.push(prevMonthDate);
    }

    // Add all days of the current month
    for (let day = 1; day <= lastDay.getDate(); day++) {
      days.push(new Date(year, month, day));
    }

    // Add days from next month to fill the grid (42 days total for 6 weeks)
    const remainingDays = 42 - days.length;
    for (let day = 1; day <= remainingDays; day++) {
      const nextMonthDate = new Date(year, month + 1, day);
      days.push(nextMonthDate);
    }

    return days;
  };

  // Handle date selection
  const handleDateSelect = (date: Date) => {
    setSelectedDate(date);
    setSelectedTime(""); // Reset time selection when date changes
  };

  // Handle time slot selection
  const handleTimeSelect = (time: string) => {
    setSelectedTime(time);
  };

  // Handle month navigation
  const navigateMonth = (direction: "prev" | "next") => {
    const newDate = new Date(currentDate);
    if (direction === "prev") {
      newDate.setMonth(currentDate.getMonth() - 1);
    } else {
      newDate.setMonth(currentDate.getMonth() + 1);
    }
    setCurrentDate(newDate);
    setSelectedDate(null); // Reset selections when changing months
    setSelectedTime("");
  };

  // Format date for display
  const formatDate = (date: Date) => {
    return date.toLocaleDateString("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
    });
  };

  // Check if date is today
  const isToday = (date: Date) => {
    const today = new Date();
    return (
      date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear()
    );
  };

  // Check if date is in current month
  const isCurrentMonth = (date: Date) => {
    return date.getMonth() === currentDate.getMonth();
  };

  // Check if date is selected
  const isSelected = (date: Date) => {
    return (
      selectedDate &&
      date.getDate() === selectedDate.getDate() &&
      date.getMonth() === selectedDate.getMonth() &&
      date.getFullYear() === selectedDate.getFullYear()
    );
  };

  // Handle booking completion
  const handleProceedToBook = () => {
    if (selectedDate && selectedTime) {
      // Call the callback if provided
      if (onBookingComplete) {
        onBookingComplete(selectedDate, selectedTime);
      }
      // Navigate to confirmation page
      router.push("/book/confirm");
    }
  };

  const calendarDays = getCalendarDays();

  return (
    <div className="w-full">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="w-5 h-5" />
            Select Date & Time
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6 overflow-y-hidden">
          {/* Calendar Section */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">
                {currentDate.toLocaleDateString("en-US", {
                  month: "long",
                  year: "numeric",
                })}
              </h3>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => navigateMonth("prev")}
                >
                  <ChevronLeft className="w-4 h-4" />
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => navigateMonth("next")}
                >
                  <ChevronRight className="w-4 h-4" />
                </Button>
              </div>
            </div>

            {/* Calendar Grid */}
            <div className="grid grid-cols-7 gap-1 mb-4">
              {/* Day headers */}
              {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
                <div
                  key={day}
                  className="p-3 text-center font-semibold text-gray-600 border-b"
                >
                  {day}
                </div>
              ))}

              {/* Calendar days */}
              {calendarDays.map((date, index) => (
                <button
                  key={index}
                  onClick={() => handleDateSelect(date)}
                  disabled={!isCurrentMonth(date)}
                  className={`
                    p-3 text-sm border rounded-lg transition-colors
                    ${
                      !isCurrentMonth(date)
                        ? "text-gray-400 cursor-not-allowed"
                        : ""
                    }
                    ${isToday(date) ? "bg-blue-100 border-blue-300" : ""}
                    ${
                      isSelected(date)
                        ? "bg-blue-600 text-white hover:bg-blue-700"
                        : ""
                    }
                    ${
                      isCurrentMonth(date) &&
                      !isSelected(date) &&
                      !isToday(date)
                        ? "hover:bg-gray-100"
                        : ""
                    }
                  `}
                >
                  {date.getDate()}
                </button>
              ))}
            </div>
          </div>

          {/* Time Slots Section */}
          {selectedDate && (
            <div>
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <Clock className="w-5 h-5" />
                Available Times for {formatDate(selectedDate)}
              </h3>
              <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
                {timeSlots.map((time) => (
                  <Button
                    key={time}
                    variant={selectedTime === time ? "default" : "outline"}
                    className={`text-xs py-1 px-2
                      ${
                        selectedTime === time
                          ? "bg-blue-600 hover:bg-blue-700"
                          : "hover:bg-gray-100"
                      }
                    `}
                    onClick={() => handleTimeSelect(time)}
                  >
                    {time}
                  </Button>
                ))}
              </div>
            </div>
          )}

          {/* Booking Summary and Proceed Button */}
          {(selectedDate || selectedTime || selectedService) && (
            <div className="border-t pt-6">
              <div className="bg-gray-50 p-4 rounded-lg mb-4">
                <h4 className="font-semibold mb-2">Booking Summary</h4>

                {selectedService && (
                  <div className="mb-3 p-3 bg-blue-50 rounded-lg">
                    <p className="font-medium text-blue-800 mb-1">
                      Selected Service
                    </p>
                    <p className="text-sm text-blue-700">
                      {selectedService.name}
                    </p>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-xs line-through text-gray-500">
                        SAR {selectedService.originalPrice}
                      </span>
                      <span className="text-sm font-bold text-green-600">
                        SAR {selectedService.discountedPrice}
                      </span>
                    </div>
                  </div>
                )}

                {selectedDate && (
                  <p className="text-sm text-gray-600">
                    Date: {formatDate(selectedDate)}
                  </p>
                )}
                {selectedTime && (
                  <p className="text-sm text-gray-600">Time: {selectedTime}</p>
                )}
              </div>

              <Button
                onClick={handleProceedToBook}
                disabled={!selectedDate || !selectedTime}
                className="w-full bg-green-600 hover:bg-green-700 disabled:bg-gray-300"
                size="lg"
              >
                {!selectedDate || !selectedTime
                  ? "Please select date and time"
                  : "Proceed to Book"}
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};
