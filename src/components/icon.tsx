import { icons } from "lucide-react";

const Icon = ({ name, color }: { name: string; color: string }) => {
  const LucidIcon = icons[name as keyof typeof icons];
  if (!LucidIcon) return null;

  return <LucidIcon color={color} className="h-4 w-4" />;
};

export default Icon;
