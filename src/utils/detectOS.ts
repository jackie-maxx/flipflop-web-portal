// utils/detectOS.ts

export const detectOS = (): string => {
  if (typeof window === "undefined") {
    // No access to `window` on the server
    return "Unknown";
  }

  const userAgent = navigator.userAgent || navigator.vendor;

  // Detect iOS devices
  if (/iPad|iPhone|iPod/.test(userAgent) && !/Android/.test(userAgent)) {
    return "iOS";
  }

  // Detect Android devices
  if (/android/i.test(userAgent)) {
    return "Android";
  }

  // Detect Windows PC
  if (/Win/.test(userAgent)) {
    return "Windows PC";
  }

  // Detect Mac PC
  if (/Mac/.test(userAgent)) {
    return "Mac PC";
  }

  // For other cases
  return "Other";
};
