import { ClassValue, clsx } from "clsx";
import { format } from "date-fns";
import { twMerge } from "tailwind-merge";
import { Hex, hexToBigInt } from "viem";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function dateToUint256(date: Date) {
  const unixTimestamp = ("0x" +
    Math.floor(date.getTime() / 1000).toString(16)) as Hex;
  const bigNumber = hexToBigInt(unixTimestamp);
  return bigNumber;
}

export function bigIntToDate(date: bigint | number) {
  return format(+BigInt(date).toString() * 1000, "LLL dd, y");
}

export function generateId() {
  return "" + Math.floor(Math.random() * 10000000000000001);
}
