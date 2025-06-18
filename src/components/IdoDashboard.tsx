"use client";
import { useState, useEffect } from "react";
import { geo } from "@/utils/fonts";

// Type declarations for Ethereum provider
declare global {
  interface Window {
    ethereum?: {
      request: (args: { method: string; params?: any[] }) => Promise<any>;
      on: (event: string, callback: (...args: any[]) => void) => void;
      removeListener: (
        event: string,
        callback: (...args: any[]) => void
      ) => void;
    };
  }
}

// Import real data
import idoAddresses from "@/data/ido_addresses.json";
import idoSnapshot from "@/data/ido_snapshot_normalized.json";

// Import contract configuration
import {
  CONTRACTS,
  getIdoContractAddress,
  isTestMode,
  getContractModeDisplay,
} from "@/config/contracts";

// Helper function to encode function calls for actual contract functions
const encodeFunctionCall = (functionName: string): string | null => {
  // Real function selectors from the deployed test contract
  const functionSelectors: { [key: string]: string } = {
    // Actual contract functions (from contract read interface)
    saleStart: "0xbe9a6555", // start() -> returns timestamp
    saleEnd: "0xefbe1c1c", // end() -> returns timestamp
    totalParticipants: "0x418f3128", // totalDepositors() -> returns count
    totalRaised: "0xff50abdc", // totalDeposited() -> returns total USDC in 6 decimals
    saleActive: "0x564566a8", // isSaleActive() -> returns bool
    getUserDeposit: "0xc084b10b", // getUserDeposit(address) -> returns user deposit
  };

  return functionSelectors[functionName] || null;
};

// Type declarations for user data
type DiscountEntry = {
  raw: string;
  rounded: number;
  protocol: string;
};

// Contract data reading function
const readIdoContract = async (
  functionName: string,
  params: any[] = []
): Promise<{ value: any; isReal: boolean }> => {
  try {
    if (typeof window === "undefined" || !window.ethereum) {
      console.warn("No Web3 provider available");
      return { value: null, isReal: false };
    }

    const contractAddress = getIdoContractAddress();
    const functionSelector = encodeFunctionCall(functionName);

    // If function doesn't exist in contract, return null
    if (!functionSelector) {
      console.warn(`Function ${functionName} not available in contract`);
      return { value: null, isReal: false };
    }

    console.log(
      `Calling ${functionName} on ${contractAddress} with selector ${functionSelector}`
    );

    const result = await window.ethereum.request({
      method: "eth_call",
      params: [
        {
          to: contractAddress,
          data: functionSelector,
        },
        "latest",
      ],
    });

    console.log(`Result for ${functionName}:`, result);

    if (!result || result === "0x") {
      console.warn(`No data returned for ${functionName}. Result: ${result}`);
      return { value: null, isReal: false };
    }

    // Parse the result based on function type
    const parsedValue = parseContractResult(functionName, result);
    console.log(`Parsed ${functionName}:`, parsedValue);
    return { value: parsedValue, isReal: true };
  } catch (error) {
    console.error(`Error calling ${functionName}:`, error);
    return { value: null, isReal: false };
  }
};

// Parse contract results based on return type
const parseContractResult = (functionName: string, result: string): any => {
  // Remove 0x prefix
  const cleanResult = result.slice(2);

  // Boolean functions
  if (functionName === "saleActive" || functionName === "saleCompleted") {
    return parseInt(cleanResult, 16) === 1;
  }

  // Timestamp functions (return as number for seconds)
  if (functionName === "saleStart" || functionName === "saleEnd") {
    return parseInt(cleanResult, 16);
  }

  // Number functions that should remain as numbers (not strings)
  if (functionName === "totalParticipants") {
    return parseInt(cleanResult, 16);
  }

  // Large number functions (return as strings to preserve precision)
  if (
    functionName === "totalSupply" ||
    functionName === "tokensSold" ||
    functionName === "totalRaised" ||
    functionName === "remainingTokens" ||
    functionName === "salePrice"
  ) {
    // Convert hex to string representation
    const value = BigInt("0x" + cleanResult);
    return value.toString();
  }

  // Default: return as number
  return parseInt(cleanResult, 16);
};

// Format large numbers
const formatNumber = (num: string | number, decimals = 18): string => {
  const value =
    typeof num === "string" ? parseFloat(num) / Math.pow(10, decimals) : num;
  if (value >= 1e6) return `${(value / 1e6).toFixed(1)}M`;
  if (value >= 1e3) return `${(value / 1e3).toFixed(1)}K`;
  return value.toFixed(2);
};

// Format time remaining
const formatTimeRemaining = (endTime: number): string => {
  const now = Math.floor(Date.now() / 1000);
  const remaining = endTime - now;
  if (remaining <= 0) return "Ended";

  const days = Math.floor(remaining / (24 * 60 * 60));
  const hours = Math.floor((remaining % (24 * 60 * 60)) / (60 * 60));

  if (days > 0) return `${days}d ${hours}h`;
  return `${hours}h ${Math.floor((remaining % (60 * 60)) / 60)}m`;
};

type ContractData = {
  saleStart: number;
  saleEnd: number;
  salePrice: string;
  totalSupply: string;
  tokensSold: string;
  totalRaised: string;
  totalParticipants: number;
  remainingTokens: string;
  saleActive: boolean;
  saleCompleted: boolean;
};

export default function IdoDashboard() {
  const [contractData, setContractData] = useState<ContractData | null>(null);
  const [isLoadingContract, setIsLoadingContract] = useState(true);
  const [timeRemaining, setTimeRemaining] = useState<string>("");
  const [isMounted, setIsMounted] = useState(false);

  // Handle client-side mounting to prevent hydration errors
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Update time remaining every second to avoid hydration errors
  useEffect(() => {
    if (!contractData || !isMounted) return;

    const updateTime = () => {
      setTimeRemaining(formatTimeRemaining(contractData.saleEnd));
    };

    updateTime(); // Initial update
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, [contractData, isMounted]);

  // Load contract data
  useEffect(() => {
    const loadContractData = async () => {
      try {
        console.log(`Loading data from contract: ${getIdoContractAddress()}`);

        // Call only the functions that exist in the contract
        const [
          saleStartResult,
          saleEndResult,
          totalParticipantsResult,
          totalRaisedResult,
          saleActiveResult,
        ] = await Promise.all([
          readIdoContract("saleStart"),
          readIdoContract("saleEnd"),
          readIdoContract("totalParticipants"),
          readIdoContract("totalRaised"),
          readIdoContract("saleActive"),
        ]);

        // Only proceed if we have real data
        const hasRealData = [
          saleStartResult,
          saleEndResult,
          totalParticipantsResult,
          totalRaisedResult,
          saleActiveResult,
        ].some((result) => result.isReal);

        if (!hasRealData) {
          console.warn("No real contract data available");
          setContractData(null);
          return;
        }

        const now = Math.floor(Date.now() / 1000);
        const saleStartTimestamp = (saleStartResult.value as number) || 0;
        const saleEndTimestamp = (saleEndResult.value as number) || 0;
        const totalRaisedRaw = (totalRaisedResult.value as number) || 0; // This is already in 6-decimal USDC format

        // Calculate derived values
        const isActive = (saleActiveResult.value as boolean) || false;
        const isCompleted = saleEndTimestamp ? saleEndTimestamp < now : false;

        // Convert totalRaisedRaw from 6-decimal format to actual USD amount
        const totalRaisedUSD = totalRaisedRaw / Math.pow(10, 6); // 10000000 -> $10.00

        // Calculate tokens sold based on $0.08 price (12.5 tokens per dollar)
        const tokensSoldAmount = totalRaisedUSD * 12.5; // $10 * 12.5 = 125 tokens
        const tokensSoldWei = (tokensSoldAmount * Math.pow(10, 18)).toString(); // Convert to 18-decimal format

        // Calculate remaining tokens
        const totalSupplyAmount = 125000000; // 125M tokens
        const remainingTokensAmount = totalSupplyAmount - tokensSoldAmount;
        const remainingTokensWei = (
          remainingTokensAmount * Math.pow(10, 18)
        ).toString();

        // Use real data where available
        const data: ContractData = {
          saleStart: saleStartTimestamp,
          saleEnd: saleEndTimestamp,
          salePrice: "80000", // $0.08 USDC (6 decimals: 0.08 * 10^6)
          totalSupply: "125000000000000000000000000", // 125M tokens (18 decimals)
          tokensSold: tokensSoldWei,
          totalRaised: totalRaisedRaw.toString(), // Keep in 6-decimal format for display
          totalParticipants: (totalParticipantsResult.value as number) || 0,
          remainingTokens: remainingTokensWei,
          saleActive: isActive,
          saleCompleted: isCompleted,
        };

        console.log("Contract data loaded:", data);
        setContractData(data);
      } catch (error) {
        console.error("Error loading contract data:", error);
        setContractData(null);
      } finally {
        setIsLoadingContract(false);
      }
    };

    loadContractData();
    const interval = setInterval(loadContractData, 30000); // Update every 30 seconds
    return () => clearInterval(interval);
  }, []);

  // Don't render anything until we have contract data
  if (!contractData) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#1A1A1A]/90 border border-[#4A7C59]/20 p-8 text-center">
          {isLoadingContract ? (
            <div className="text-[#F5F5F5]/60">
              Loading contract data from {getIdoContractAddress().slice(0, 8)}
              ...
            </div>
          ) : (
            <div className="text-[#F5F5F5]/60">
              No contract data available. Please connect your wallet to Ethereum
              mainnet.
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        <div className="bg-[#1A1A1A]/90 border border-[#4A7C59]/20 p-2 hover:border-[#4A7C59]/40 transition-colors text-center">
          <div className="text-xs text-[#F5F5F5]/60 uppercase tracking-wider mb-1">
            Tokens Sold
          </div>
          <div className={`text-[#4A7C59] text-2xl font-bold ${geo.className}`}>
            {formatNumber(contractData.tokensSold)}
          </div>
          <div className="text-[#F5F5F5]/40 text-xs">
            of {formatNumber(contractData.totalSupply)} total
          </div>
        </div>

        <div className="bg-[#1A1A1A]/90 border border-[#4A7C59]/20 p-2 hover:border-[#4A7C59]/40 transition-colors text-center">
          <div className="text-xs text-[#F5F5F5]/60 uppercase tracking-wider mb-1">
            Total Raised
          </div>
          <div className={`text-[#4A7C59] text-2xl font-bold ${geo.className}`}>
            ${formatNumber(contractData.totalRaised, 6)}
          </div>
          <div className="text-[#F5F5F5]/40 text-xs">USDC raised</div>
        </div>

        <div className="bg-[#1A1A1A]/90 border border-[#4A7C59]/20 p-2 hover:border-[#4A7C59]/40 transition-colors text-center">
          <div className="text-xs text-[#F5F5F5]/60 uppercase tracking-wider mb-1">
            Participants
          </div>
          <div className={`text-[#4A7C59] text-2xl font-bold ${geo.className}`}>
            {contractData.totalParticipants.toLocaleString()}
          </div>
          <div className="text-[#F5F5F5]/40 text-xs">unique wallets</div>
        </div>

        <div className="bg-[#1A1A1A]/90 border border-[#4A7C59]/20 p-2 hover:border-[#4A7C59]/40 transition-colors text-center">
          <div className="text-xs text-[#F5F5F5]/60 uppercase tracking-wider mb-1">
            Time Left
          </div>
          <div className={`text-[#4A7C59] text-2xl font-bold ${geo.className}`}>
            {isMounted ? timeRemaining : "Loading..."}
          </div>
          <div className="text-[#F5F5F5]/40 text-xs">until sale ends</div>
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
        <div className="bg-[#1A1A1A]/90 border border-[#4A7C59]/20 p-8 hover:border-[#4A7C59]/40 transition-colors">
          <div className="flex items-center justify-between mb-2">
            <h3
              className={`text-base font-bold text-[#F5F5F5] ${geo.className}`}
            >
              Eligibility Info
            </h3>
            <span
              className={`relative group inline-flex items-center gap-1 px-3 py-1 text-xs font-bold tracking-wider uppercase border text-[#4A7C59] border-[#4A7C59]/30 bg-[#4A7C59]/10 ${geo.className}`}
            >
              UPDATED DAILY
              <span className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 w-max px-3 py-2 text-xs bg-[#1A1A1A] border border-[#4A7C59]/30 text-[#F5F5F5] rounded shadow-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10">
                Update your allocation and eligibility; changes apply the next
                day.
              </span>
            </span>
          </div>
          <div className="space-y-1 text-sm">
            <div className="text-[#F5F5F5]/80 text-xs mb-2">
              Eligible tokens:{" "}
              <span className="text-[#4A7C59] font-semibold">
                veBAO, veFXN, and liquid lockers
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-[#F5F5F5]/60">Eligible Users:</span>
              <span className="text-[#4A7C59] text-xs font-semibold">
                {idoAddresses.length.toLocaleString()}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#F5F5F5]/60">1 veBAO =</span>
              <span className="text-[#4A7C59] font-semibold font-mono text-xs">
                0.25 STEAM
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#F5F5F5]/60">1 veFXN =</span>
              <span className="text-[#4A7C59] font-semibold font-mono text-xs">
                150 STEAM
              </span>
            </div>
            <div className="pt-2 border-t border-[#4A7C59]/20 text-xs space-y-1">
              <div className="text-[#F5F5F5]/70">
                Did we miss a liquid wrapper?{" "}
                <a
                  href="https://discord.com/invite/BW3P62vJXT"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#4A7C59] hover:text-[#5A8B69] underline transition-colors"
                >
                  Reach out on Discord
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-[#1A1A1A]/90 border border-[#4A7C59]/20 p-8 hover:border-[#4A7C59]/40 transition-colors">
          <h3
            className={`text-base font-bold text-[#F5F5F5] mb-2 ${geo.className}`}
          >
            Pricing & Allocation
          </h3>
          <div className="space-y-1 text-sm">
            <div className="flex justify-between">
              <span className="text-[#F5F5F5]/60">Community Price:</span>
              <span className="text-[#4A7C59] font-semibold">$0.08</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#F5F5F5]/60">Public Price:</span>
              <span className="text-[#F5F5F5]/80 font-semibold">$0.12</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#F5F5F5]/60">Discount:</span>
              <span className="text-green-400 font-semibold">33% off</span>
            </div>
            <div className="pt-2 border-t border-[#4A7C59]/20 text-xs space-y-1">
              <div className="text-[#F5F5F5]/70">
                Note: Discounted allocations are filled first. All deposits are
                filled equally to ensure fair distribution.
              </div>
              <div className="text-[#F5F5F5]/70">
                You can deposit more than your max allocation - additional funds
                are used to purchase tokens at the public sale price.
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
