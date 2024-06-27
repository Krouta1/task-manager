import { z } from "zod";

export const CreateWorkspaceFormSchema = z.object({
  name: z.string().min(2).max(50),
  icon: z.enum([
    "KeyRound",
    "Zap",
    "House",
    "DollarSign",
    "UserRound",
    "FolderClosed",
    "Sun",
    "MessageCircle",
    "Gem",
    "Flag",
    "Heart",
    "Settings",
    "Crown",
    "Flame",
    "Pen",
    "Earth",
  ]),
  iconColor: z.string().min(2).max(50),
  user: z.string().min(2).max(50),
});

export type CreateWorkspaceSchemaType = z.infer<
  typeof CreateWorkspaceFormSchema
>;
