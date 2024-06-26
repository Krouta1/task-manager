import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type IconsColorSelectProps = {
  onValueChange: (value: string) => void;
  defaultValue: string;
};

const IconColorSelect = ({
  onValueChange,
  defaultValue,
}: IconsColorSelectProps) => {
  return (
    <Select onValueChange={onValueChange} defaultValue={defaultValue}>
      <SelectTrigger className="w-[80px]">
        <SelectValue placeholder="Theme" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="red">
          <div className="h-5 w-5 rounded-full bg-red-500" />
        </SelectItem>
        <SelectItem value="green">
          <div className="h-5 w-5 rounded-full bg-green-500" />
        </SelectItem>
        <SelectItem value="blue">
          <div className="h-5 w-5 rounded-full bg-blue-500" />
        </SelectItem>
        <SelectItem value="yellow">
          <div className="h-5 w-5 rounded-full bg-yellow-500" />
        </SelectItem>
        <SelectItem value="purple">
          <div className="h-5 w-5 rounded-full bg-purple-500" />
        </SelectItem>
        <SelectItem value="gray">
          <div className="h-5 w-5 rounded-full bg-gray-500" />
        </SelectItem>
        <SelectItem value="black">
          <div className="h-5 w-5 rounded-full bg-slate-900" />
        </SelectItem>
      </SelectContent>
    </Select>
  );
};

export default IconColorSelect;
