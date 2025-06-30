"use client";
import { useEffect } from "react";
import ShareButton from "@/components/ShareButton";

interface DepositSuccessPopupProps {
  isOpen: boolean;
  onClose: () => void;
  depositAmount: number;
  steamTokens: number;
  walletAddress: string;
}

export default function DepositSuccessPopup({
  isOpen,
  onClose,
  depositAmount,
  steamTokens,
  walletAddress,
}: DepositSuccessPopupProps) {
  // Close popup on Escape key
  useEffect(() => {
    if (!isOpen) return;

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [isOpen, onClose]);

  // Prevent body scroll when popup is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative bg-[#1A1A1A] border border-[#4A7C59] p-8 max-w-md w-full mx-4 max-h-[90vh] overflow-y-auto">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-[#F5F5F5]/60 hover:text-[#F5F5F5] transition-colors"
          aria-label="Close"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>

        <div className="space-y-6">
          {/* Success Icon */}
          <div className="text-center">
            <div className="w-16 h-16 mx-auto bg-[#4A7C59]/20 flex items-center justify-center mb-4">
              <svg
                className="w-8 h-8 text-[#4A7C59]"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>

            <h2
              className={`text-2xl font-bold text-[#4A7C59] mb-2`}
            >
              DEPOSIT SUCCESSFUL!
            </h2>

            <div
              className={`text-[#4A7C59] font-bold text-lg mb-4`}
            >
              <span className="inline-block animate-pulse">💚</span> Thank you
              for your support!{" "}
              <span className="inline-block animate-pulse">💚</span>
            </div>
          </div>

          {/* Purchase Summary */}
          <div className="bg-[#4A7C59]/10 border border-[#4A7C59]/30 p-4 space-y-3">
            <h3
              className={`text-lg font-bold text-[#F5F5F5] mb-3`}
            >
              PURCHASE SUMMARY
            </h3>

            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-[#F5F5F5]/80">Wallet:</span>
                <span className="text-[#4A7C59] font-semibold font-mono">
                  {walletAddress.slice(0, 6)}...{walletAddress.slice(-4)}
                </span>
              </div>

              <div className="flex justify-between">
                <span className="text-[#F5F5F5]/80">Amount Deposited:</span>
                <span className="text-[#4A7C59] font-semibold">
                  ${depositAmount.toFixed(2)} USDC
                </span>
              </div>

              <div className="flex justify-between">
                <span className="text-[#F5F5F5]/80">STEAM Tokens:</span>
                <span className="text-[#4A7C59] font-semibold">
                  {steamTokens.toLocaleString()} STEAM
                </span>
              </div>

              <div className="flex justify-between">
                <span className="text-[#F5F5F5]/80">Price per Token:</span>
                <span className="text-[#4A7C59] font-semibold">$0.08 USDC</span>
              </div>

              <div className="pt-2 border-t border-[#4A7C59]/20">
                <div className="flex justify-between">
                  <span className="text-[#F5F5F5]/80">Discount vs Public:</span>
                  <span className="text-green-400 font-semibold">33% OFF</span>
                </div>
              </div>
            </div>
          </div>

          {/* Share Button */}
          <div className="text-center">
            <div className="mb-4">
              <p className="text-sm text-[#F5F5F5]/80 mb-3">
                Share your participation in the Zhenglong IDO!
              </p>
              <ShareButton />
            </div>
          </div>

          {/* Important Info */}
          <div className="text-xs text-[#F5F5F5]/60 space-y-1 text-center">
            <div>
              • Tokens will be distributed at TGE (Token Generation Event)
            </div>
            <div>• Your position updates automatically</div>
            <div>• Keep your wallet safe until token distribution</div>
          </div>

          {/* Close Button */}
          <button
            onClick={onClose}
            className={`w-full py-3 px-6 bg-[#4A7C59] hover:bg-[#5A8B69] text-white font-bold tracking-wider uppercase transition-colors`}
          >
            CONTINUE
          </button>
        </div>
      </div>
    </div>
  );
}
