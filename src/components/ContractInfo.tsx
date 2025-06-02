"use client";

import { useContractReads } from "wagmi";
import { markets } from "../config/contracts";

// ABI for just the read functions we need
const minterABI = [
  {
    inputs: [],
    name: "collateralRatio",
    outputs: [{ type: "uint256", name: "" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "leverageRatio",
    outputs: [{ type: "uint256", name: "" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "leveragedTokenPrice",
    outputs: [{ type: "uint256", name: "" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "peggedTokenPrice",
    outputs: [{ type: "uint256", name: "" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "leveragedToken",
    outputs: [{ type: "address", name: "" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "peggedToken",
    outputs: [{ type: "address", name: "" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "mintPeggedTokenIncentiveRatio",
    outputs: [{ type: "int256", name: "incentiveRatio" }],
    stateMutability: "view",
    type: "function",
  },
] as const;

const erc20ABI = [
  {
    inputs: [],
    name: "symbol",
    outputs: [{ type: "string", name: "" }],
    stateMutability: "view",
    type: "function",
  },
] as const;

interface ContractInfoProps {
  marketId?: string;
}

export default function ContractInfo({
  marketId = "steth-usd",
}: ContractInfoProps) {
  const addresses = markets[marketId].addresses;

  const { data: collateralRatioData } = useContractReads({
    contracts: [
      {
        address: addresses.minter as `0x${string}`,
        abi: minterABI,
        functionName: "collateralRatio",
      },
    ],
    watch: true,
  });

  const { data: leverageRatioData } = useContractReads({
    contracts: [
      {
        address: addresses.minter as `0x${string}`,
        abi: minterABI,
        functionName: "leverageRatio",
      },
    ],
    watch: true,
  });

  const { data: leveragedTokenPriceData } = useContractReads({
    contracts: [
      {
        address: addresses.minter as `0x${string}`,
        abi: minterABI,
        functionName: "leveragedTokenPrice",
      },
    ],
    watch: true,
  });

  const { data: peggedTokenPriceData } = useContractReads({
    contracts: [
      {
        address: addresses.minter as `0x${string}`,
        abi: minterABI,
        functionName: "peggedTokenPrice",
      },
    ],
    watch: true,
  });

  const { data: leveragedTokenAddressData } = useContractReads({
    contracts: [
      {
        address: addresses.minter as `0x${string}`,
        abi: minterABI,
        functionName: "leveragedToken",
      },
    ],
    watch: true,
  });

  const { data: peggedTokenAddressData } = useContractReads({
    contracts: [
      {
        address: addresses.minter as `0x${string}`,
        abi: minterABI,
        functionName: "peggedToken",
      },
    ],
    watch: true,
  });

  const { data: mintFeeData } = useContractReads({
    contracts: [
      {
        address: addresses.minter as `0x${string}`,
        abi: minterABI,
        functionName: "mintPeggedTokenIncentiveRatio",
      },
    ],
    watch: true,
  });

  // Get token addresses
  const leveragedTokenAddress = leveragedTokenAddressData?.[0]?.result as
    | `0x${string}`
    | undefined;
  const peggedTokenAddress = peggedTokenAddressData?.[0]?.result as
    | `0x${string}`
    | undefined;

  console.log("Contract read results:", {
    leveragedToken: leveragedTokenAddress,
    peggedToken: peggedTokenAddress,
    collateralRatio: collateralRatioData?.[0]?.result,
    leverageRatio: leverageRatioData?.[0]?.result,
    leveragedTokenPrice: leveragedTokenPriceData?.[0]?.result,
    peggedTokenPrice: peggedTokenPriceData?.[0]?.result,
    mintFee: mintFeeData?.[0]?.result,
  });

  // Get token symbols
  const { data: symbolsData } = useContractReads({
    contracts:
      leveragedTokenAddress && peggedTokenAddress
        ? [
            {
              address: leveragedTokenAddress,
              abi: erc20ABI,
              functionName: "symbol",
            },
            {
              address: peggedTokenAddress,
              abi: erc20ABI,
              functionName: "symbol",
            },
          ]
        : [],
    watch: true,
  });

  const isLoading =
    !collateralRatioData &&
    !leverageRatioData &&
    !leveragedTokenPriceData &&
    !peggedTokenPriceData &&
    !leveragedTokenAddressData &&
    !peggedTokenAddressData &&
    !mintFeeData;

  if (isLoading) {
    return (
      <div className="animate-pulse space-y-4 p-4">
        <div className="h-4 bg-[#4A7C59]/20 rounded w-3/4"></div>
        <div className="h-4 bg-[#4A7C59]/20 rounded w-1/2"></div>
        <div className="h-4 bg-[#4A7C59]/20 rounded w-2/3"></div>
        <div className="h-4 bg-[#4A7C59]/20 rounded w-1/2"></div>
      </div>
    );
  }

  const formatEther = (value: bigint | undefined) => {
    if (!value) return "0";
    // Check if the value is unreasonably large (likely an error state)
    if (value > BigInt("1" + "0".repeat(30))) return "Error";
    return (Number(value) / 1e18).toFixed(4);
  };

  const formatAddress = (addr: `0x${string}` | undefined) => {
    if (!addr) return "Not available";
    return `${addr.slice(0, 6)}...${addr.slice(-4)}`;
  };

  const formatIncentiveRatio = (value: bigint | undefined) => {
    if (!value) return "0%";
    // Check if the value is unreasonably large (likely an error state)
    if (value > BigInt("1" + "0".repeat(30))) return "Error";
    const ratio = Number(value) / 1e18;
    if (ratio > 0) return `+${(ratio * 100).toFixed(2)}%`;
    return `${(ratio * 100).toFixed(2)}%`;
  };

  const StatusIndicator = ({ isError }: { isError: boolean }) => (
    <span
      className={`inline-block w-2 h-2 rounded-full ${
        isError ? "bg-red-500" : "bg-green-500"
      }`}
    ></span>
  );

  // Helper to check if a value is max uint256 (error state)
  const isMaxUint256 = (value: bigint | undefined) => {
    if (!value) return false;
    return (
      value.toString() ===
      "115792089237316195423570985008687907853269984665640564039457584007913129639935"
    );
  };

  return (
    <div className="space-y-6">
      {/* Token Info */}
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-1">
          <div className="text-sm text-[#F5F5F5]/50 flex items-center gap-2">
            <StatusIndicator
              isError={!leveragedTokenAddressData?.[0]?.result}
            />
            Leveraged Token
          </div>
          <div className="text-lg flex items-center gap-2">
            <span>{symbolsData?.[0]?.result || "..."}</span>
            <span className="text-sm text-[#F5F5F5]/50">
              {formatAddress(leveragedTokenAddress)}
            </span>
          </div>
        </div>
        <div className="space-y-1">
          <div className="text-sm text-[#F5F5F5]/50 flex items-center gap-2">
            <StatusIndicator isError={!peggedTokenAddressData?.[0]?.result} />
            Pegged Token
          </div>
          <div className="text-lg flex items-center gap-2">
            <span>{symbolsData?.[1]?.result || "..."}</span>
            <span className="text-sm text-[#F5F5F5]/50">
              {formatAddress(peggedTokenAddress)}
            </span>
          </div>
        </div>
      </div>

      {/* Ratios and Prices */}
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-1">
          <div className="text-sm text-[#F5F5F5]/50 flex items-center gap-2">
            <StatusIndicator
              isError={isMaxUint256(collateralRatioData?.[0]?.result)}
            />
            Collateral Ratio
          </div>
          <div className="text-lg">
            {formatEther(collateralRatioData?.[0]?.result)}
          </div>
        </div>
        <div className="space-y-1">
          <div className="text-sm text-[#F5F5F5]/50 flex items-center gap-2">
            <StatusIndicator
              isError={isMaxUint256(leverageRatioData?.[0]?.result)}
            />
            Leverage Ratio
          </div>
          <div className="text-lg">
            {formatEther(leverageRatioData?.[0]?.result)}
          </div>
        </div>
        <div className="space-y-1">
          <div className="text-sm text-[#F5F5F5]/50 flex items-center gap-2">
            <StatusIndicator isError={!leveragedTokenPriceData?.[0]?.result} />
            Leveraged Token Price
          </div>
          <div className="text-lg">
            {formatEther(leveragedTokenPriceData?.[0]?.result)}
          </div>
        </div>
        <div className="space-y-1">
          <div className="text-sm text-[#F5F5F5]/50 flex items-center gap-2">
            <StatusIndicator isError={!peggedTokenPriceData?.[0]?.result} />
            Pegged Token Price
          </div>
          <div className="text-lg">
            {formatEther(peggedTokenPriceData?.[0]?.result)}
          </div>
        </div>
      </div>

      {/* Fees */}
      <div className="space-y-1">
        <div className="text-sm text-[#F5F5F5]/50 flex items-center gap-2">
          <StatusIndicator isError={!mintFeeData?.[0]?.result} />
          Mint Fee
        </div>
        <div
          className={`text-lg ${
            Number(mintFeeData?.[0]?.result || 0) > 0
              ? "text-red-400"
              : "text-green-400"
          }`}
        >
          {formatIncentiveRatio(mintFeeData?.[0]?.result)}
        </div>
      </div>
    </div>
  );
}
