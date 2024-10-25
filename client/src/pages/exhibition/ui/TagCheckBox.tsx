import React, { useEffect, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Check } from "lucide-react";

interface TagsCheckBoxProps {
  items: Record<string, number>;
  handleCheckedItems: (checkedItems: number[]) => void;
}

function TagsCheckBox({ items, handleCheckedItems }: TagsCheckBoxProps) {
  const [checkedItems, setCheckedItems] = useState<number[]>([]);

  const objectKeys = Object.keys(items);

  useEffect(() => {
    handleCheckedItems(checkedItems);
  }, [checkedItems, handleCheckedItems]);

  const handleItemClick = (index: number) => {
    setCheckedItems((prev) =>
      prev.includes(index)
        ? prev.filter((text) => text !== index)
        : [...prev, index]
    );
  };

  return (
    <div className="flex flex-col justify-between items-start">
      <div className="flex flex-wrap">
        {objectKeys.map((item) => (
          <Badge
            key={items[item]}
            variant={
              checkedItems.includes(items[item]) ? "default" : "secondary"
            }
            className={`flex items-center mr-2 mb-2 cursor-pointer }`}
            onClick={() => handleItemClick(items[item])}
          >
            {checkedItems.includes(items[item]) && (
              <Check className="mr-1 h-4 w-4" />
            )}
            {item}
          </Badge>
        ))}
      </div>
    </div>
  );
}

export default React.memo(TagsCheckBox);
