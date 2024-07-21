import { type ClassValue, clsx } from "clsx"
import { eachDayOfInterval, format, isSameDay, subDays } from "date-fns";
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function convertAmountFromMiliUnits(amount: number) {
  return amount / 1000;
}

export function convertAmountToMiliUnits(amount: number) {
  return Math.round(amount * 1000);
}

export function formatCurrency(amount: number) {
  return Intl.NumberFormat("en-US", {
    currency: "USD",
    style: "currency",
    minimumFractionDigits: 2
  }).format(amount);
}

export function calculatePercentageChange(current: number, previous: number) {
  if (previous === 0) {
    return previous === current ? 0 : 100;
  }

  return ((current - previous) / previous) * 100;
}

export const fillMissingDays = (activeDays: {
  date: Date,
  income: number,
  expense: number
}[],
  startDate: Date,
  endDate: Date) => {
  if (activeDays.length === 0) {
    return [];
  }

  const allDays = eachDayOfInterval({
    start: startDate,
    end: endDate
  });

  const transactionsByDay = allDays.map((day) => {
    const found = activeDays.find(d => isSameDay(d.date, day));

    if (found) {
      return found;
    } else {
      return {
        date: day,
        income: 0,
        expense: 0
      }
    }
  })

  return transactionsByDay;
}

export function formatDateRange({ from, to }: {
  from: string | Date | undefined,
  to: string | Date | undefined,
}) {
  const defaultTo = new Date();
  const defaultFrom = subDays(defaultTo, 30);

  if (!from) {
    return `${format(defaultFrom, "LLL dd")} - ${format(defaultTo, "LLL dd, y")}`;
  }

  if (to) {
    return `${format(defaultFrom, "LLL dd")} - ${format(defaultTo, "LLL dd, y")}`;
  }

  return format(from, "LLL dd, y");
}

export function formatPercentage(
  value: number,
  options: { addPrefix?: boolean } = {
    addPrefix: false
  }
) {
  const result = new Intl.NumberFormat("en-US", {
    style: "percent",
  }).format(value / 100);

  if (options.addPrefix && value > 0) {
    return `+${result}`;
  }

  return result;
}