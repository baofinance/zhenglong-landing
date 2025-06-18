"use client";
import { geo } from "@/utils/fonts";

interface UserAllocationProps {
  discount: number;
  userTotalDeposited: number;
  walletAddress: string;
}

export default function UserAllocation({
  discount,
  userTotalDeposited,
  walletAddress,
}: UserAllocationProps) {
  const maxDiscountedDeposit = discount > 0 ? discount * 0.08 : 0;
  const remainingDiscount = Math.max(
    0,
    maxDiscountedDeposit - userTotalDeposited
  );

  return (
    <div className="bg-[#1A1A1A]/90 border border-[#4A7C59]/20 p-8 h-full">
      <div className="space-y-4">
        <div className="text-center">
          <h3 className={`text-3xl font-bold text-[#4A7C59] ${geo.className}`}>
            YOUR ALLOCATION
          </h3>
        </div>
        {walletAddress ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-center">
            <div className="bg-[#1A1A1A]/90 border border-[#4A7C59]/20 p-3">
              <div className="text-xs text-[#F5F5F5]/60 uppercase mb-1">
                Max STEAM Allocation
              </div>
              <div
                className={`text-[#4A7C59] font-semibold text-2xl ${geo.className}`}
              >
                {discount > 0
                  ? `${discount.toLocaleString()} STEAM`
                  : "Not eligible"}
              </div>
            </div>
            <div className="bg-[#1A1A1A]/90 border border-[#4A7C59]/20 p-3">
              <div className="text-xs text-[#F5F5F5]/60 uppercase mb-1">
                Max Discounted Deposit
              </div>
              <div
                className={`text-[#4A7C59] font-semibold text-2xl ${geo.className}`}
              >
                {discount > 0
                  ? `${maxDiscountedDeposit.toFixed(2)} USDC`
                  : "$0.00 USDC"}
              </div>
            </div>
            <div className="bg-[#1A1A1A]/90 border border-[#4A7C59]/20 p-3">
              <div className="text-xs text-[#F5F5F5]/60 uppercase mb-1">
                Remaining Discount
              </div>
              <div
                className={`text-[#4A7C59] font-semibold text-2xl ${geo.className}`}
              >
                {discount > 0
                  ? `${remainingDiscount.toFixed(2)} USDC`
                  : "$0.00 USDC"}
              </div>
            </div>
          </div>
        ) : (
          <div className="text-center py-8">
            <div className="text-[#F5F5F5]/60">
              Connect your wallet to view your allocation
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
