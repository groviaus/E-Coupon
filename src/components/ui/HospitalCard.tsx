import Link from "next/link";
import Image from "next/image";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star, MapPin, Clock } from "lucide-react";

interface HospitalCardProps {
  id: string;
  name: string;
  imageUrl: string;
  discountTag: string;
  location?: string;
  rating?: number;
  specialties?: string[];
  workingHours?: string;
}

export const HospitalCard = ({
  id,
  name,
  imageUrl,
  discountTag,
  location,
  rating = 4.5,
  specialties = [],
  workingHours,
}: HospitalCardProps) => {
  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, index) => (
      <Star
        key={index}
        className={`w-4 h-4 ${
          index < Math.floor(rating)
            ? "fill-yellow-400 text-yellow-400"
            : "text-gray-300"
        }`}
      />
    ));
  };

  return (
    <Link href={`/hospitals/${id}`}>
      <Card className="overflow-hidden py-0 hover:shadow-lg transition-shadow duration-300 cursor-pointer h-full">
        <CardHeader className="p-0">
          <div className="relative aspect-video">
            <Image src={imageUrl} alt={name} fill className="object-cover" />
            <Badge className="absolute top-2 right-2 bg-green-600 hover:bg-green-700 text-white">
              {discountTag}
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="px-4 pb-4 flex flex-col flex-1">
          <h3 className="font-semibold text-lg mb-2 line-clamp-2">{name}</h3>

          {location && (
            <div className="flex items-center text-sm text-gray-600 mb-2">
              <MapPin className="w-4 h-4 mr-1 flex-shrink-0" />
              <span className="line-clamp-1">{location}</span>
            </div>
          )}

          <div className="flex items-center mb-3">
            <div className="flex items-center mr-2">{renderStars(rating)}</div>
            <span className="text-sm text-gray-600">({rating})</span>
          </div>

          {specialties && specialties.length > 0 && (
            <div className="mb-3">
              <div className="flex flex-wrap gap-1">
                {specialties.slice(0, 3).map((specialty, index) => (
                  <Badge key={index} variant="secondary" className="text-xs">
                    {specialty}
                  </Badge>
                ))}
                {specialties.length > 3 && (
                  <Badge variant="outline" className="text-xs">
                    +{specialties.length - 3} more
                  </Badge>
                )}
              </div>
            </div>
          )}

          {workingHours && (
            <div className="flex items-center text-sm text-gray-600 mt-auto">
              <Clock className="w-4 h-4 mr-1 flex-shrink-0" />
              <span>{workingHours}</span>
            </div>
          )}
        </CardContent>
      </Card>
    </Link>
  );
};
