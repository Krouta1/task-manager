import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { WorkspaceIcon } from "@prisma/client";
import {
  Crown,
  DollarSign,
  Earth,
  Flag,
  Flame,
  FolderClosed,
  Gem,
  Heart,
  HouseIcon,
  KeyRoundIcon,
  LucideIcon,
  MessageCircle,
  Pen,
  Settings,
  Sun,
  UserRound,
  ZapIcon,
} from "lucide-react";

const getIconComponent = (iconName: string) => {
  // Example function to dynamically import or get the icon component
  // Replace with your actual implementation
  switch (iconName) {
    case "KeyRound":
      return KeyRoundIcon;
    case "Zap":
      return ZapIcon;
    case "House":
      return HouseIcon;
    case "UserRound":
      return UserRound;
    case "FolderClosed":
      return FolderClosed;
    case "DollarSign":
      return DollarSign;
    case "Sun":
      return Sun;
    case "MessageCircle":
      return MessageCircle;
    case "Gem":
      return Gem;
    case "Flag":
      return Flag;
    case "Heart":
      return Heart;
    case "Settings":
      return Settings;
    case "Crown":
      return Crown;
    case "Flame":
      return Flame;
    case "Pen":
      return Pen;
    case "Earth":
      return Earth;

    default:
      return null;
  }
};

const transformWorkspaceIcon = (WorkspaceIcon: {
  [key: string]: string;
}): { key: string; value: string; icon: LucideIcon | null }[] => {
  return Object.entries(WorkspaceIcon).map(([key, value]) => ({
    key,
    value,
    icon: getIconComponent(value),
  }));
};

type IconsSelectProps = {
  onValueChange: (value: string) => void;
  defaultValue: string;
  color?: string;
};

const IconsSelect = ({
  onValueChange,
  defaultValue,
  color,
}: IconsSelectProps) => {
  const transformedIcons = transformWorkspaceIcon(WorkspaceIcon); // Call the transformWorkspaceIcon function to get the array of transformed icons
  return (
    <Select onValueChange={onValueChange} defaultValue={defaultValue}>
      <SelectTrigger className="w-[80px]">
        <SelectValue placeholder="Theme" />
      </SelectTrigger>
      <SelectContent>
        {transformedIcons.map(
          (
            item, // Call the map method on the transformedIcons array
          ) => (
            <SelectItem key={item.key} value={item.value}>
              {item.icon && (
                <item.icon
                  className={cn(
                    "mr-2",
                    color === "black" && "text-black",
                    color === "red" && "text-red-500",
                    color === "blue" && "text-blue-500",
                    color === "green" && "text-green-500",
                    color === "purple" && "text-purple-500",
                    color === "yellow" && "text-yellow-500",
                    color === "gray" && "text-gray-500",
                  )}
                />
              )}
            </SelectItem>
          ),
        )}
      </SelectContent>
    </Select>
  );
};

export default IconsSelect;
