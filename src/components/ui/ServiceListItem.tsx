import { Button } from "@/components/ui/button";

interface ServiceListItemProps {
  serviceName: string;
  originalPrice: number;
  discountedPrice: number;
  onSelect?: () => void;
}

export const ServiceListItem = ({
  serviceName,
  originalPrice,
  discountedPrice,
  onSelect,
}: ServiceListItemProps) => {
  const savings = originalPrice - discountedPrice;
  const discountPercentage = Math.round((savings / originalPrice) * 100);

  return (
    <div className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors">
      <div className="flex-1">
        <h3 className="font-semibold text-lg mb-2">{serviceName}</h3>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-500 line-through">
              SAR {originalPrice}
            </span>
            <span className="text-lg font-bold text-green-600">
              SAR {discountedPrice}
            </span>
          </div>
          <div className="text-sm text-green-600 font-medium">
            Save SAR {savings} ({discountPercentage}%)
          </div>
        </div>
      </div>
      <Button className="ml-4 bg-blue-600 hover:bg-blue-700" onClick={onSelect}>
        Select
      </Button>
    </div>
  );
};
