import { LucideIcon } from 'lucide-react';

export interface ServiceItem {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  icon?: LucideIcon;
}

export interface NavItem {
  label: string;
  href: string;
  isButton?: boolean;
}

export enum ChatRole {
  USER = 'user',
  MODEL = 'model',
}

export interface ChatMessage {
  role: ChatRole;
  text?: string;
  image?: string; // Base64 string for generated images
}