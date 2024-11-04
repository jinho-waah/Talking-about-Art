import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Upload, X } from "lucide-react";

interface AddOrdinaryImageProps {
  images: File[];
  onImageUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onRemoveImage: (index: number) => void;
}

export function AddOrdinaryImage({
  images,
  onImageUpload,
  onRemoveImage,
}: AddOrdinaryImageProps) {
  return (
    <div className="space-y-2">
      <Label htmlFor="image-upload">이미지 업로드</Label>
      <div className="flex items-center space-x-2">
        <Label htmlFor="image-upload" className="cursor-pointer">
          <div className="flex items-center space-x-2 bg-secondary text-secondary-foreground hover:bg-secondary/80 h-10 px-4 py-2 rounded-md">
            <Upload className="w-4 h-4" />
            <span>이미지 추가</span>
          </div>
        </Label>
        <Input
          id="image-upload"
          type="file"
          accept="image/*"
          multiple
          className="hidden"
          onChange={onImageUpload}
        />
      </div>
      <div className="grid grid-cols-3 gap-4 mt-4">
        {images.map((file, index) => (
          <div key={index} className="relative">
            <img
              src={URL.createObjectURL(file)}
              alt={`Uploaded image ${index + 1}`}
              className="w-full h-32 object-cover rounded-md"
            />
            <Button
              variant="destructive"
              size="icon"
              className="absolute top-1 right-1 h-6 w-6"
              onClick={() => onRemoveImage(index)}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
}
