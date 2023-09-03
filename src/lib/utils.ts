import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
 
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
export  function  isBase64Image(dataUrl:string) {
  const regex = /^data:image\/(png|jpeg|jpg|gif);base64,/i;
  return regex.test(dataUrl);
}