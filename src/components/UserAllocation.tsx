"use client";

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
    <div className="flex flex-col gap-4 h-full min-h-0">
      <div className="bg-[#1A1A1A]/90 backdrop-blur-md border border-[#4A7C59]/20 p-8 flex-1 min-h-0">
        <div className="space-y-4">
          <div className="text-center">
            <h3 className={`text-3xl font-normal text-[#4A7C59] font-geo`}>
              YOUR ALLOCATION
            </h3>
          </div>
          {walletAddress ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-center">
              <div className="bg-[#1A1A1A]/90 border border-[#4A7C59]/20 p-3">
                <div className="text-xs text-[#F5F5F5]/60 uppercase mb-1">
                  Max STEAM Allocation
                </div>
                <div className={`text-[#4A7C59] font-normal text-2xl font-geo`}>
                  {discount > 0
                    ? `${discount.toLocaleString()}`
                    : "Not eligible"}
                  <div className="text-xs text-[#4A7C59] mt-1">STEAM</div>
                </div>
              </div>
              <div className="bg-[#1A1A1A]/90 border border-[#4A7C59]/20 p-3">
                <div className="text-xs text-[#F5F5F5]/60 uppercase mb-1">
                  Max Discounted Deposit
                </div>
                <div className={`text-[#4A7C59] font-normal text-2xl font-geo`}>
                  {discount > 0 ? `${maxDiscountedDeposit.toFixed(2)}` : "0.00"}
                  <div className="text-xs text-[#4A7C59] mt-1">USDC</div>
                </div>
              </div>
              <div className="bg-[#1A1A1A]/90 border border-[#4A7C59]/20 p-3">
                <div className="text-xs text-[#F5F5F5]/60 uppercase mb-1">
                  Remaining Discount
                </div>
                <div className={`text-[#4A7C59] font-normal text-2xl font-geo`}>
                  {discount > 0 ? `${remainingDiscount.toFixed(2)}` : "0.00"}
                  <div className="text-xs text-[#4A7C59] mt-1">USDC</div>
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
      {/* Your Deposit Section in its own box */}
      <div className="bg-[#1A1A1A]/90 backdrop-blur-md border border-[#4A7C59]/20 p-8 flex-1 min-h-0">
        <div className="text-center">
          <h3 className="text-3xl font-normal text-[#4A7C59] font-geo mb-2">
            YOUR DEPOSIT
          </h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-center">
          <div className="bg-[#1A1A1A]/90 border border-[#4A7C59]/20 p-3">
            <div className="text-xs text-[#F5F5F5]/60 uppercase mb-1">
              USDC Deposited
            </div>
            <div className="text-[#4A7C59] font-normal text-2xl font-geo">
              {userTotalDeposited.toFixed(2)}
              <div className="text-xs text-[#4A7C59] mt-1">USDC</div>
            </div>
          </div>
          <div className="bg-[#1A1A1A]/90 border border-[#4A7C59]/20 p-3">
            <div className="text-xs text-[#F5F5F5]/60 uppercase mb-1">
              STEAM Allocation
            </div>
            <div className="text-[#4A7C59] font-normal text-2xl font-geo">
              {userTotalDeposited > 0
                ? `${(userTotalDeposited / 0.08).toLocaleString(undefined, {
                    maximumFractionDigits: 2,
                  })}`
                : "0"}
              <div className="text-xs text-[#4A7C59] mt-1">STEAM</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
