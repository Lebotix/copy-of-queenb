
import { ServiceOption, ServiceType } from './types';

// ==========================================
// ASSETS & IMAGES
// ==========================================
// Using a relative path to the image file for better performance and reliability.
export const LOGO_URL = "images/logo.png";

export const SERVICES: ServiceOption[] = [
  {
    id: ServiceType.STANDARD,
    title: "Standard Maintenance",
    description: "Perfect for recurring cleanings. Dusting, vacuuming, mopping, and bathroom sanitation.",
    iconName: "House"
  },
  {
    id: ServiceType.DEEP,
    title: "Royal Deep Clean",
    description: "Thorough top-to-bottom cleaning. Includes baseboards, ceiling fans, and inside appliances.",
    iconName: "Sparkles"
  },
  {
    id: ServiceType.MOVE_IN_OUT,
    title: "Move In / Move Out",
    description: "Ensure the home is spotless for the next chapter. Empty home cleaning specialist.",
    iconName: "Truck"
  },
  {
    id: ServiceType.POST_CONSTRUCTION,
    title: "Post-Construction",
    description: "Removing dust and debris after renovation work. Heavy duty cleaning.",
    iconName: "HardHat"
  }
];

export const TESTIMONIALS = [
  {
    name: "Sarah Jenkins",
    text: "Queen B's transformed my apartment! The attention to detail is unmatched.",
    rating: 5
  },
  {
    name: "Marcus Thorne",
    text: "Professional, punctual, and the online booking was incredibly easy.",
    rating: 5
  },
  {
    name: "Elena Rodriguez",
    text: "I used the AI quote feature and it was spot on with the final price. Highly recommend!",
    rating: 4
  }
];
