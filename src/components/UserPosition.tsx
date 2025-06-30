"use client";

interface UserPositionProps {
  walletAddress: string;
  userTotalDeposited: number;
}

export default function UserPosition({
  walletAddress,
  userTotalDeposited,
}: UserPositionProps) {
  const isCheckingWallet = !walletAddress;
  const userDeposited = userTotalDeposited;

  return (
    <div className="bg-[#1A1A1A]/90 border border-[#4A7C59]/20 p-8 h-full">
      <div className="space-y-6">
        <div className="text-center">
          <h3 className={`text-3xl font-bold text-[#4A7C59]`}>
            YOUR POSITION
          </h3>
        </div>

        <div className="space-y-4">
          {/* Show connecting state */}
          {isCheckingWallet && (
            <div className="text-center py-8">
              <div className="text-[#F5F5F5]/60">
                Connect your wallet to view your position and eligibility
              </div>
            </div>
          )}

          {/* Show wallet connected content */}
          {!isCheckingWallet && walletAddress && (
            <div className="space-y-4">
              {/* Position Summary */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-center">
                <div className="bg-[#1A1A1A]/90 border border-[#4A7C59]/20 p-3">
                  <div className="text-xs text-[#F5F5F5]/60 uppercase mb-1">
                    Deposited
                  </div>
                  <div
                    className={`text-[#4A7C59] font-semibold text-2xl`}
                  >
                    ${userDeposited.toFixed(2)} USDC
                  </div>
                </div>
                <div className="bg-[#1A1A1A]/90 border border-[#4A7C59]/20 p-3">
                  <div className="text-xs text-[#F5F5F5]/60 uppercase mb-1">
                    Est. STEAM Tokens
                  </div>
                  <div
                    className={`text-[#4A7C59] font-semibold text-2xl`}
                  >
                    {(userDeposited * 12.5).toLocaleString()}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
