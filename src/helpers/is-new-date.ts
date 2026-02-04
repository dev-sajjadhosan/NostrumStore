export const isRecent = (date: string | Date, days: number = 30): boolean => {
  if (!date) return false;

  const targetDate = new Date(date).getTime();
  const now = new Date().getTime();
  const diffInMs = now - targetDate;

  const diffInDays = diffInMs / (1000 * 60 * 60 * 24);

  return diffInDays <= days && diffInDays >= 0;
};

export const calculateTimeLeft = (expiryDate: string | Date) => {
  const difference = new Date(expiryDate).getTime() - new Date().getTime();

  if (difference <= 0) return null; // Offer expired

  return {
    hours: Math.floor((difference / (1000 * 60 * 60))),
    minutes: Math.floor((difference / 1000 / 60) % 60),
    seconds: Math.floor((difference / 1000) % 60),
  };
};

export const formatNumber = (num: number) => String(num).padStart(2, "0");