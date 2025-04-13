import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatFileName(url: string): string {
  const fileName = url.split('/').pop() || ''; // Get the last part of the URL (the file name)
  return fileName
    .replace(/\.[^/.]+$/, '') // Remove the file extension
    .replace(/[-_]+/g, ' ')   // Replace underscores and hyphens with spaces
    .split(' ')                // Split into words
    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()) // Capitalize the first letter of each word
    .join(' ')                 // Join the words back into a string
    .trim();                   // Trim any leading or trailing spaces
}
