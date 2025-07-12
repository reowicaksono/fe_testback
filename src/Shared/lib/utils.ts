import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}




export type ErrorMap = {
  [field: string]: string;
};


export const translateErrorMessage = (error: any): ErrorMap =>{
  const errors: ErrorMap = {};

  if (error?.response?.data) {
    const data = error.response.data;

    // Jika data langsung objek field-error
    if (typeof data === 'object' && !Array.isArray(data)) {
      Object.keys(data).forEach((key) => {
        errors[key] = data[key];
      });
    }

    // Jika ada pesan umum
    if (data.message && typeof data.message === 'string') {
      errors.general = data.message;
    }
  } else if (error?.message) {
    errors.general = error.message;
  } else {
    errors.general = 'Terjadi kesalahan tidak diketahui.';
  }

  return errors;
}
