import React, { useState, useEffect, useCallback, useMemo } from "react";
import { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { Georama } from "next/font/google";
import clsx from "clsx";
import { ethers } from "ethers";
import { formatEther, parseEther } from "viem";
import {
  useAccount,
  useNetwork,
  useBalance,
  useContractRead,
  useContractReads,
  useContractWrite,
  usePublicClient,
  useWalletClient,
} from "wagmi";
import { ChevronDownIcon, ArrowPathIcon } from "@heroicons/react/24/outline"; // Assuming these are used, adjust if not

// Constants (to be moved from page.tsx)
const tokens = {
  LONG: ["zheUSD", "longBTC", "longETH", "longTSLA", "longSP500"],
  STEAMED: [
    "steamedETH",
    "steamedBTC",
    "steamedTSLA",
    "steamedSP500",
    "steamedETH-DOWN",
    "steamedBTC-DOWN",
    "steamedTSLA-DOWN",
    "steamedSP500-DOWN",
  ],
};

// Corrected minterABI (ensure this is the FULL and CORRECT one from page.tsx)
const minterABI = [
  // ... (ALL OTHER FUNCTIONS FROM THE ORIGINAL minterABI)
  {
    inputs: [],
    name: "leverageRatio",
    outputs: [{ type: "uint256", name: "" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "mintPeggedTokenIncentiveRatio",
    outputs: [{ type: "int256", name: "" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "redeemPeggedTokenIncentiveRatio",
    outputs: [{ type: "int256", name: "" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { name: "collateralIn", type: "uint256" },
      { name: "receiver", type: "address" },
      { name: "minPeggedOut", type: "uint256" },
    ],
    name: "mintPeggedToken",
    outputs: [{ type: "uint256", name: "peggedAmount" }],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { name: "peggedIn", type: "uint256" },
      { name: "receiver", type: "address" },
      { name: "minCollateralOut", type: "uint256" },
    ],
    name: "redeemPeggedToken",
    outputs: [{ type: "uint256", name: "collateralAmount" }],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { name: "collateralIn", type: "uint256" },
      { name: "receiver", type: "address" },
      { name: "minLeveragedOut", type: "uint256" },
    ],
    name: "mintLeveragedToken",
    outputs: [{ type: "uint256", name: "leveragedAmount" }],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { name: "leveragedIn", type: "uint256" },
      { name: "receiver", type: "address" },
      { name: "minCollateralOut", type: "uint256" },
    ],
    name: "redeemLeveragedToken",
    outputs: [{ type: "uint256", name: "collateralAmount" }],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [{ name: "collateralAmount", type: "uint256" }],
    name: "calculateMintPeggedTokenOutput",
    outputs: [{ type: "uint256", name: "peggedAmount" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ name: "peggedAmount", type: "uint256" }],
    name: "calculateRedeemPeggedTokenOutput",
    outputs: [{ type: "uint256", name: "collateralAmount" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ name: "collateralAmount", type: "uint256" }],
    name: "calculateMintLeveragedTokenOutput",
    outputs: [{ type: "uint256", name: "leveragedAmount" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ name: "leveragedAmount", type: "uint256" }],
    name: "calculateRedeemLeveragedTokenOutput",
    outputs: [{ type: "uint256", name: "collateralAmount" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ name: "amount", type: "uint256" }],
    name: "mintPeggedTokenDryRun",
    outputs: [
      { type: "int256", name: "incentiveRatio" },
      { type: "uint256", name: "collateralUsed" },
      { type: "uint256", name: "peggedMinted" },
      { type: "uint256", name: "fee" },
      { type: "uint256", name: "reserveCollateralUsed" },
      { type: "uint256", name: "price" },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ name: "peggedIn", type: "uint256" }],
    name: "redeemPeggedTokenDryRun",
    outputs: [
      { type: "int256", name: "incentiveRatio" },
      { type: "uint256", name: "peggedRedeemed" },
      { type: "uint256", name: "collateralReturned" },
      { type: "uint256", name: "fee" },
      { type: "uint256", name: "reserveCollateralUsed" },
      { type: "uint256", name: "price" },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ name: "leveragedIn", type: "uint256" }],
    name: "redeemLeveragedTokenDryRun",
    outputs: [
      { type: "int256", name: "incentiveRatio" },
      { type: "uint256", name: "leveragedRedeemed" },
      { type: "uint256", name: "collateralReturned" },
      { type: "uint256", name: "fee" },
      { type: "uint256", name: "reserveCollateralUsed" },
      { type: "uint256", name: "price" },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ name: "collateralIn", type: "uint256" }],
    name: "mintLeveragedTokenDryRun",
    outputs: [
      { type: "int256", name: "incentiveRatio" },
      { type: "uint256", name: "collateralUsed" },
      { type: "uint256", name: "leveragedMinted" },
      { type: "uint256", name: "fee" },
      { type: "uint256", name: "reserveCollateralUsed" },
      { type: "uint256", name: "price" },
    ],
    stateMutability: "view",
    type: "function",
  },
  // Add any other missing functions from your original page.tsx minterABI like totalCollateralTokens etc.
] as const;

// Corrected erc20ABI (ensure this is the FULL and CORRECT one from page.tsx)
const erc20ABI = [
  {
    inputs: [{ name: "account", type: "address" }],
    name: "balanceOf",
    outputs: [{ type: "uint256", name: "" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { name: "spender", type: "address" },
      { name: "amount", type: "uint256" },
    ],
    name: "approve",
    outputs: [{ type: "bool", name: "" }],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { name: "owner", type: "address" },
      { name: "spender", type: "address" },
    ],
    name: "allowance",
    outputs: [{ type: "uint256", name: "" }],
    stateMutability: "view",
    type: "function",
  },
] as const;

// Helper Functions (to be moved from page.tsx)
const formatPercent = (value: bigint | number) => {
  if (typeof value === "bigint") value = Number(value);
  if (isNaN(value) || typeof value !== "number") return "-";
  return (value / 1e16).toFixed(2) + "%";
};
const formatEtherValue = (value: bigint | number) => {
  if (typeof value === "bigint") value = Number(value);
  if (isNaN(value) || typeof value !== "number") return "-";
  return (value / 1e18).toFixed(6);
};
const formatMinimal = (value: bigint | number) => {
  if (typeof value === "bigint") value = Number(value) / 1e18;
  if (typeof value === "string") value = Number(value);
  if (isNaN(value)) return "-";
  if (value === 0) return "0";
  return value % 1 === 0
    ? value.toString()
    : value
        .toLocaleString("en-US", { maximumFractionDigits: 6 })
        .replace(/\.?0+$/, "");
};
const formatOraclePrice = (value: bigint | number) => {
  if (typeof value === "bigint") value = Number(value);
  if (isNaN(value) || typeof value !== "number") return "-";
  return "$" + (value / 1e18).toFixed(2);
};
const formatLeverageRatio = (value: bigint | undefined) => {
  if (!value) return "-";
  if (value > BigInt("1" + "0".repeat(30))) return "-"; // Basic overflow check
  return (Number(value) / 1e18).toFixed(2) + "x";
};
const formatFeeRatio = (value: bigint | undefined) => {
  if (!value) return "-";
  const ratio = Number(value) / 1e18;
  return ratio > 0
    ? `+${(ratio * 100).toFixed(2)}%`
    : `${(ratio * 100).toFixed(2)}%`;
};
const formatBalance = (balance: bigint | undefined) => {
  if (!balance) return "-";
  try {
    return Number(formatEther(balance)).toFixed(6);
  } catch {
    return "-";
  }
};

type Market = {
  id: string;
  name: string;
  addresses: {
    collateralToken: string;
    peggedToken: string;
    leveragedToken: string;
    minter: string;
    priceOracle: string;
  };
};

type TokenType = "LONG" | "STEAMED";

interface MintRedeemFormProps {
  geoClassName: string;
  currentMarket: Market;
  isConnected: boolean;
  userAddress: string | undefined;
  // publicClient: any; // Not passing publicClient, component will get its own
}

const MintRedeemForm: React.FC<MintRedeemFormProps> = ({
  geoClassName,
  currentMarket,
  isConnected,
  userAddress,
}) => {
  const [mounted, setMounted] = useState(false);
  const { chain } = useNetwork();
  const { data: walletClient } = useWalletClient({ chainId: chain?.id });
  const publicClient = usePublicClient({ chainId: chain?.id });

  // State variables previously in App component, now local to MintRedeemForm
  const [isFlipped, setIsFlipped] = useState(false);
  const [selectedType, setSelectedType] = useState<TokenType>("LONG");
  const [isCollateralAtTop, setIsCollateralAtTop] = useState(true);
  const [inputAmount, setInputAmount] = useState<string>("");
  const [outputAmount, setOutputAmount] = useState<string>("");
  const [isPending, setIsPending] = useState(false);
  const [shakeCollateralNeeded, setShakeCollateralNeeded] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [pendingStep, setPendingStep] = useState<string | null>(null);

  // Default to the first token in the selected type
  const [selectedToken, setSelectedToken] = useState<string>(
    tokens[selectedType][0]
  );

  // Wagmi hooks (useContractRead, useContractReads, useContractWrite)
  // These will use currentMarket.addresses directly

  const { data: collateralBalance } = useContractReads({
    contracts: [
      {
        address: currentMarket.addresses.collateralToken as `0x${string}`,
        abi: erc20ABI,
        functionName: "balanceOf",
        args: userAddress ? [userAddress as `0x${string}`] : undefined,
      },
      {
        address: currentMarket.addresses.collateralToken as `0x${string}`,
        abi: erc20ABI,
        functionName: "allowance",
        args: userAddress
          ? [
              userAddress as `0x${string}`,
              currentMarket.addresses.minter as `0x${string}`,
            ]
          : undefined,
      },
    ],
    watch: true,
    enabled: mounted && !!userAddress,
  });

  const { data: peggedBalance } = useContractReads({
    contracts: [
      {
        address: currentMarket.addresses.peggedToken as `0x${string}`,
        abi: erc20ABI,
        functionName: "balanceOf",
        args: userAddress ? [userAddress as `0x${string}`] : undefined,
      },
      {
        address: currentMarket.addresses.peggedToken as `0x${string}`,
        abi: erc20ABI,
        functionName: "allowance",
        args: userAddress
          ? [
              userAddress as `0x${string}`,
              currentMarket.addresses.minter as `0x${string}`,
            ]
          : undefined,
      },
    ],
    watch: true,
    enabled: mounted && !!userAddress && selectedType === "LONG",
  });

  const { data: leveragedBalance } = useContractReads({
    contracts: [
      {
        address: currentMarket.addresses.leveragedToken as `0x${string}`,
        abi: erc20ABI,
        functionName: "balanceOf",
        args: userAddress ? [userAddress as `0x${string}`] : undefined,
      },
      {
        address: currentMarket.addresses.leveragedToken as `0x${string}`,
        abi: erc20ABI,
        functionName: "allowance",
        args: userAddress
          ? [
              userAddress as `0x${string}`,
              currentMarket.addresses.minter as `0x${string}`,
            ]
          : undefined,
      },
    ],
    watch: true,
    enabled: mounted && !!userAddress && selectedType === "STEAMED",
  });

  const { data } = useContractReads({
    contracts: [
      {
        address: currentMarket.addresses.minter as `0x${string}`,
        abi: minterABI,
        functionName: "leverageRatio",
      },
      {
        address: currentMarket.addresses.minter as `0x${string}`,
        abi: minterABI,
        functionName: "mintPeggedTokenIncentiveRatio",
      },
      {
        address: currentMarket.addresses.minter as `0x${string}`,
        abi: minterABI,
        functionName: "redeemPeggedTokenIncentiveRatio",
      },
    ],
    watch: true,
    enabled: mounted,
  });

  const { data: mintPeggedDryRunResult, refetch: refetchMintPeggedDryRun } =
    useContractRead({
      address: currentMarket.addresses.minter as `0x${string}`,
      abi: minterABI,
      functionName: "mintPeggedTokenDryRun",
      args: [inputAmount ? parseEther(inputAmount) : BigInt(0)],
      watch: true,
      enabled:
        mounted &&
        isCollateralAtTop &&
        selectedType === "LONG" &&
        !!inputAmount &&
        parseFloat(inputAmount) > 0,
    });

  const { data: redeemPeggedDryRunResult, error: redeemPeggedDryRunError } =
    useContractRead({
      address: currentMarket.addresses.minter as `0x${string}`,
      abi: minterABI,
      functionName: "redeemPeggedTokenDryRun",
      args: [inputAmount ? parseEther(inputAmount) : BigInt(0)],
      watch: true,
      enabled:
        mounted &&
        !isCollateralAtTop &&
        selectedType === "LONG" &&
        !!inputAmount &&
        parseFloat(inputAmount) > 0,
    });

  const {
    data: redeemLeveragedDryRunResult,
    error: redeemLeveragedDryRunError,
  } = useContractRead({
    address: currentMarket.addresses.minter as `0x${string}`,
    abi: minterABI,
    functionName: "redeemLeveragedTokenDryRun",
    args: [inputAmount ? parseEther(inputAmount) : BigInt(0)],
    watch: true,
    enabled:
      mounted &&
      !isCollateralAtTop &&
      selectedType === "STEAMED" &&
      !!inputAmount &&
      parseFloat(inputAmount) > 0,
  });

  const {
    data: mintLeveragedDryRunResult,
    refetch: refetchMintLeveragedDryRun,
  } = useContractRead({
    address: currentMarket.addresses.minter as `0x${string}`,
    abi: minterABI,
    functionName: "mintLeveragedTokenDryRun",
    args: [inputAmount ? parseEther(inputAmount) : BigInt(0)],
    watch: true,
    enabled:
      mounted &&
      isCollateralAtTop &&
      selectedType === "STEAMED" &&
      !!inputAmount &&
      parseFloat(inputAmount) > 0,
  });

  useEffect(() => {
    if (
      isCollateralAtTop &&
      selectedType === "LONG" &&
      inputAmount &&
      Array.isArray(mintPeggedDryRunResult) &&
      mintPeggedDryRunResult.length > 1
    ) {
      try {
        const parsedInputAmount = parseEther(inputAmount);
        const collateralNeededFromDryRun = mintPeggedDryRunResult[1] as bigint;
        if (
          typeof collateralNeededFromDryRun === "bigint" &&
          collateralNeededFromDryRun < parsedInputAmount
        ) {
          setShakeCollateralNeeded(true);
          setTimeout(() => setShakeCollateralNeeded(false), 500);
        }
      } catch (e) {
        console.error("Error parsing input amount for shake effect:", e);
      }
    }
  }, [
    inputAmount,
    mintPeggedDryRunResult,
    isCollateralAtTop,
    selectedType,
    setShakeCollateralNeeded,
  ]);

  const { data: outputData, refetch: refetchOutput } = useContractReads({
    contracts: [
      {
        address: currentMarket.addresses.minter as `0x${string}`,
        abi: minterABI,
        functionName: isCollateralAtTop
          ? selectedType === "LONG"
            ? "calculateMintPeggedTokenOutput"
            : "calculateMintLeveragedTokenOutput"
          : selectedType === "LONG"
          ? "calculateRedeemPeggedTokenOutput"
          : "calculateRedeemLeveragedTokenOutput",
        args: [inputAmount ? parseEther(inputAmount) : BigInt(0)],
      },
    ],
    enabled:
      mounted &&
      !!inputAmount &&
      parseFloat(inputAmount) > 0 &&
      !(isCollateralAtTop && selectedType === "LONG"), // Disable if using dry run
    watch: true,
  });

  const { writeAsync: mintPeggedToken } = useContractWrite({
    address: currentMarket.addresses.minter as `0x${string}`,
    abi: minterABI,
    functionName: "mintPeggedToken",
  });
  const { writeAsync: redeemPeggedToken } = useContractWrite({
    address: currentMarket.addresses.minter as `0x${string}`,
    abi: minterABI,
    functionName: "redeemPeggedToken",
  });
  const { writeAsync: mintLeveragedToken } = useContractWrite({
    address: currentMarket.addresses.minter as `0x${string}`,
    abi: minterABI,
    functionName: "mintLeveragedToken",
  });
  const { writeAsync: redeemLeveragedToken } = useContractWrite({
    address: currentMarket.addresses.minter as `0x${string}`,
    abi: minterABI,
    functionName: "redeemLeveragedToken",
  });
  const { writeAsync: approveCollateral } = useContractWrite({
    address: currentMarket.addresses.collateralToken as `0x${string}`,
    abi: erc20ABI,
    functionName: "approve",
  });
  const { writeAsync: approvePegged } = useContractWrite({
    address: currentMarket.addresses.peggedToken as `0x${string}`,
    abi: erc20ABI,
    functionName: "approve",
  });
  const { writeAsync: approveLeveraged } = useContractWrite({
    address: currentMarket.addresses.leveragedToken as `0x${string}`,
    abi: erc20ABI,
    functionName: "approve",
  });

  // Effect Hooks
  useEffect(() => setMounted(true), []);

  useEffect(() => {
    if (isCollateralAtTop) {
      // Mint mode
      if (
        selectedType === "LONG" &&
        Array.isArray(mintPeggedDryRunResult) &&
        mintPeggedDryRunResult.length > 2
      ) {
        const peggedMinted = mintPeggedDryRunResult[2] as bigint;
        if (typeof peggedMinted === "bigint")
          setOutputAmount(formatEther(peggedMinted));
        else setOutputAmount("");
      } else if (
        selectedType === "STEAMED" && // Minting Leveraged
        Array.isArray(mintLeveragedDryRunResult) &&
        mintLeveragedDryRunResult.length > 2
      ) {
        const leveragedMinted = mintLeveragedDryRunResult[2] as bigint;
        if (typeof leveragedMinted === "bigint")
          setOutputAmount(formatEther(leveragedMinted));
        else setOutputAmount("");
      } else if (
        outputData &&
        outputData[0]?.status === "success" &&
        typeof outputData[0]?.result === "bigint"
      ) {
        setOutputAmount(formatEther(outputData[0].result as bigint));
      } else if (!inputAmount) {
        setOutputAmount("");
      }
    } else {
      // Redeem mode
      if (
        selectedType === "LONG" &&
        Array.isArray(redeemPeggedDryRunResult) &&
        redeemPeggedDryRunResult.length > 2
      ) {
        const collateralReturned = redeemPeggedDryRunResult[2] as bigint;
        if (typeof collateralReturned === "bigint")
          setOutputAmount(formatEther(collateralReturned));
        else setOutputAmount("");
      } else if (
        selectedType === "STEAMED" &&
        Array.isArray(redeemLeveragedDryRunResult) &&
        redeemLeveragedDryRunResult.length > 2
      ) {
        const collateralReturned = redeemLeveragedDryRunResult[2] as bigint;
        if (typeof collateralReturned === "bigint")
          setOutputAmount(formatEther(collateralReturned));
        else setOutputAmount("");
      } else if (!inputAmount) {
        setOutputAmount("");
      }
    }
  }, [
    mintPeggedDryRunResult,
    redeemPeggedDryRunResult,
    redeemLeveragedDryRunResult,
    outputData,
    inputAmount,
    isCollateralAtTop,
    selectedType,
    setOutputAmount,
  ]);

  useEffect(() => {
    setInputAmount("");
    setOutputAmount("");
  }, [isCollateralAtTop, selectedType, currentMarket.id]);

  // Event Handlers
  const handleInputAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (/^\d*\.?\d*$/.test(value)) {
      // Allow only numbers and a single dot
      setInputAmount(value);
      if (!value || parseFloat(value) === 0) {
        setOutputAmount("");
      }
    }
  };

  const handleOutputAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (/^\d*\.?\d*$/.test(value)) {
      setOutputAmount(value);
      // Future: Implement reverse calculation if needed
      if (!value || parseFloat(value) === 0) {
        setInputAmount("");
      }
    }
  };

  const handleMaxClick = () => {
    const balanceToSetResult = isCollateralAtTop
      ? collateralBalance?.[0]?.result
      : selectedType === "LONG"
      ? peggedBalance?.[0]?.result
      : leveragedBalance?.[0]?.result;

    if (typeof balanceToSetResult === "bigint") {
      setInputAmount(formatEther(balanceToSetResult));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (
      !inputAmount ||
      parseFloat(inputAmount) <= 0 ||
      !userAddress ||
      !walletClient
    )
      return;
    setIsPending(true);
    setPendingStep(null);
    try {
      const parsedAmount = parseEther(inputAmount);
      let currentAllowanceBigInt: bigint = BigInt(0);
      let approveFn,
        approveArgs,
        needsApproval = false;
      if (isCollateralAtTop) {
        currentAllowanceBigInt =
          (collateralBalance?.[1]?.result as bigint) ?? BigInt(0);
        approveFn = approveCollateral;
        approveArgs = [
          currentMarket.addresses.minter as `0x${string}`,
          parsedAmount,
        ] as const;
        needsApproval = currentAllowanceBigInt < parsedAmount;
      } else if (selectedType === "LONG") {
        currentAllowanceBigInt =
          (peggedBalance?.[1]?.result as bigint) ?? BigInt(0);
        approveFn = approvePegged;
        approveArgs = [
          currentMarket.addresses.minter as `0x${string}`,
          parsedAmount,
        ] as const;
        needsApproval = currentAllowanceBigInt < parsedAmount;
      } else {
        currentAllowanceBigInt =
          (leveragedBalance?.[1]?.result as bigint) ?? BigInt(0);
        approveFn = approveLeveraged;
        approveArgs = [
          currentMarket.addresses.minter as `0x${string}`,
          parsedAmount,
        ] as const;
        needsApproval = currentAllowanceBigInt < parsedAmount;
      }
      // 1. If approval is needed, send approval and wait for confirmation
      if (needsApproval) {
        setPendingStep("approval");
        const tx = await approveFn({ args: approveArgs });
        // Wait for the approval tx to be mined if possible
        if (tx && tx.hash && publicClient) {
          await publicClient.waitForTransactionReceipt({ hash: tx.hash });
        } else {
          // fallback: wait a few seconds
          await new Promise((res) => setTimeout(res, 5000));
        }
      }
      // 2. Proceed with mint/redeem
      setPendingStep("mintOrRedeem");
      if (isCollateralAtTop) {
        if (selectedType === "LONG") {
          let minPeggedOut = parsedAmount;
          if (
            Array.isArray(mintPeggedDryRunResult) &&
            mintPeggedDryRunResult.length > 2 &&
            typeof mintPeggedDryRunResult[2] === "bigint"
          ) {
            minPeggedOut = mintPeggedDryRunResult[2] as bigint;
          }
          await mintPeggedToken({
            args: [parsedAmount, userAddress as `0x${string}`, minPeggedOut],
          });
        } else {
          // Minting Leveraged Token
          let minLeveragedOut = parsedAmount; // Default to input amount
          if (
            // Prefer dry run result if available
            Array.isArray(mintLeveragedDryRunResult) &&
            mintLeveragedDryRunResult.length > 2 &&
            typeof mintLeveragedDryRunResult[2] === "bigint"
          ) {
            minLeveragedOut = mintLeveragedDryRunResult[2] as bigint;
          } else if (outputAmount && parseFloat(outputAmount) > 0) {
            // Fallback to calculated outputAmount
            try {
              minLeveragedOut = parseEther(outputAmount);
            } catch (e) {
              console.error(
                "Error parsing outputAmount for minLeveragedOut:",
                e
              );
            }
          }
          await mintLeveragedToken({
            args: [parsedAmount, userAddress as `0x${string}`, minLeveragedOut],
          });
        }
      } else {
        if (selectedType === "LONG") {
          let minCollateralOut = parsedAmount;
          if (
            Array.isArray(redeemPeggedDryRunResult) &&
            redeemPeggedDryRunResult.length > 2 &&
            typeof redeemPeggedDryRunResult[2] === "bigint"
          ) {
            minCollateralOut = redeemPeggedDryRunResult[2] as bigint;
          }
          await redeemPeggedToken({
            args: [
              parsedAmount,
              userAddress as `0x${string}`,
              minCollateralOut,
            ],
          });
        } else {
          let minCollateralOut = parsedAmount;
          if (
            Array.isArray(redeemLeveragedDryRunResult) &&
            redeemLeveragedDryRunResult.length > 2 &&
            typeof redeemLeveragedDryRunResult[2] === "bigint"
          ) {
            minCollateralOut = redeemLeveragedDryRunResult[2] as bigint;
          }
          await redeemLeveragedToken({
            args: [
              parsedAmount,
              userAddress as `0x${string}`,
              minCollateralOut,
            ],
          });
        }
      }
      setInputAmount("");
      setOutputAmount("");
    } catch (error) {
      console.error("Transaction failed:", error);
      // Enhanced error logging for debugging
      if (error && typeof error === "object" && error !== null) {
        const errObj = error as Record<string, unknown>;
        for (const key in errObj) {
          if (Object.prototype.hasOwnProperty.call(errObj, key)) {
            console.error(`[ERROR DETAIL] ${key}:`, errObj[key]);
          }
        }
        try {
          console.error(
            "[ERROR STRINGIFIED]",
            JSON.stringify(error, Object.getOwnPropertyNames(error))
          );
        } catch (stringifyErr) {
          console.error("[ERROR STRINGIFY FAILED]", stringifyErr);
        }
      }
      alert("Transaction failed. See console for details.");
    } finally {
      setIsPending(false);
      setPendingStep(null);
    }
  };

  const leverageRatioResult = data?.[0]?.result as bigint | undefined;
  const mintFeeResult = data?.[1]?.result as bigint | undefined; // This is mintPeggedTokenIncentiveRatio
  const redeemFeeResult = data?.[2]?.result as bigint | undefined; // This is redeemPeggedTokenIncentiveRatio

  if (!mounted) {
    // Optional: render a simpler loading state for this component if needed
    return (
      <div className="bg-[#1A1A1A] p-6 rounded-lg shadow-custom-dark">
        <h2 className={`text-2xl text-[#F5F5F5] mb-4 ${geoClassName}`}>
          Loading Form...
        </h2>
      </div>
    );
  }

  // JSX for Mint & Redeem section (to be copied from page.tsx)
  return (
    <div className="bg-neutral-800 p-4 shadow-custom-dark">
      <div className="w-full max-w-xl mx-auto">
        {/* Tabs row above the form, left-aligned with form content */}
        <div className="flex border-b border-[#333] mb-6">
          <button
            onClick={() => {
              setSelectedType("LONG");
              setIsFlipped(false);
            }}
            className={clsx(
              `px-6 py-2 text-lg font-medium transition-all duration-200 ease-in-out outline-none focus:outline-none border-b-2 ${geoClassName}`,
              selectedType === "LONG"
                ? "border-[#4A7C59] text-[#4A7C59]"
                : "border-transparent text-[#F5F5F5]/70 hover:text-[#F5F5F5]"
            )}
          >
            PEGGED
          </button>
          <button
            onClick={() => {
              setSelectedType("STEAMED");
              setIsFlipped(true);
            }}
            className={clsx(
              `px-6 py-2 text-lg font-medium transition-all duration-200 ease-in-out outline-none focus:outline-none border-b-2 ${geoClassName}`,
              selectedType === "STEAMED"
                ? "border-[#4A7C59] text-[#4A7C59]"
                : "border-transparent text-[#F5F5F5]/70 hover:text-[#F5F5F5]"
            )}
          >
            LEVERAGE
          </button>
        </div>
        <div className="relative [perspective:1000px] w-full">
          <div
            className="relative [transform-style:preserve-3d] transition-transform duration-500 h-[600px]"
            style={{
              transform: isFlipped ? "rotateY(180deg)" : "rotateY(0deg)",
            }}
          >
            {/* Front Side (PEGGED) */}
            <div className="absolute inset-0 bg-[#0A0A0A]/90 before:absolute before:inset-0 before:bg-black/90 shadow-[0_0_15px_rgba(74,124,89,0.1)] [backface-visibility:hidden] transform-gpu">
              <div
                className={`relative z-10 h-full transition-opacity duration-50 delay-[145ms] ${
                  selectedType === "LONG" ? "opacity-100" : "opacity-0"
                }`}
              >
                <div className="p-6">
                  <div className="text-center mb-6">
                    <h1
                      className={`text-3xl text-[#4A7C59] mb-1 ${geoClassName}`}
                    >
                      zheUSD
                    </h1>
                  </div>
                  <form onSubmit={handleSubmit} className="space-y-8">
                    <div className="space-y-6 relative">
                      <div className="relative h-[360px]">
                        {" "}
                        {/* Input Boxes Container */}
                        {/* First Token Input (wstETH) */}
                        <div
                          className={`absolute w-full space-y-2 transition-all duration-200 ${
                            isCollateralAtTop
                              ? "translate-y-0"
                              : "translate-y-[calc(260%+2rem)]"
                          }`}
                        >
                          <div className="flex items-center justify-between">
                            <label className="text-sm text-[#F5F5F5]/80">
                              From
                            </label>
                            <span className="text-sm text-[#F5F5F5]/60">
                              Balance:{" "}
                              {formatBalance(
                                collateralBalance?.[0]?.result as
                                  | bigint
                                  | undefined
                              )}{" "}
                              wstETH
                            </span>
                          </div>
                          <div className="flex-1 relative">
                            <input
                              type="text"
                              value={
                                isCollateralAtTop ? inputAmount : outputAmount
                              }
                              onChange={
                                isCollateralAtTop
                                  ? handleInputAmountChange
                                  : undefined
                              }
                              placeholder="0.0"
                              className="w-full bg-[#202020] text-[#F5F5F5] border border-[#4A7C59]/30 focus:border-[#4A7C59] outline-none transition-all p-4 pr-24"
                              readOnly={!isCollateralAtTop}
                            />
                            <div className="absolute right-4 top-1/2 -translate-y-1/2 flex flex-col items-end">
                              <div className="flex items-center gap-2">
                                {isCollateralAtTop && (
                                  <button
                                    type="button"
                                    onClick={handleMaxClick}
                                    className="text-[#4A7C59] hover:text-[#3A6147] text-sm transition-colors"
                                  >
                                    MAX
                                  </button>
                                )}
                                <span className="text-[#F5F5F5]/70">
                                  wstETH
                                </span>
                              </div>
                              {isCollateralAtTop && (
                                <button
                                  onClick={() =>
                                    window.open(
                                      "https://swap.defillama.com/?chain=ethereum&from=0x0000000000000000000000000000000000000000&tab=swap&to=0x7f39c581f595b53c5cb19bd0b3f8da6c935e2ca0",
                                      "_blank"
                                    )
                                  }
                                  className="text-[#4A7C59] hover:text-[#3A6147] text-[10px] transition-colors mt-1"
                                >
                                  Get wstETH
                                </button>
                              )}
                            </div>
                          </div>
                          {/* Collateral Needed: Move below input, style like Balance unless shakeCollateralNeeded */}
                          {isCollateralAtTop && selectedType === "LONG" && (
                            <div
                              className={
                                shakeCollateralNeeded
                                  ? "text-sm text-red-500 font-semibold mt-1"
                                  : "text-sm text-[#F5F5F5]/60 mt-1"
                              }
                            >
                              Collateral Needed:{" "}
                              {!inputAmount || parseFloat(inputAmount) === 0
                                ? "-"
                                : Array.isArray(mintPeggedDryRunResult) &&
                                  mintPeggedDryRunResult.length > 1 &&
                                  typeof mintPeggedDryRunResult[1] === "bigint"
                                ? formatMinimal(mintPeggedDryRunResult[1])
                                : "-"}
                            </div>
                          )}
                        </div>
                        {/* Swap Direction and Fee */}
                        <div className="absolute top-[160px] left-0 right-0 flex items-center w-full">
                          {/* Left: Fee */}
                          <div className="text-xs text-left min-w-[80px] flex items-center justify-start gap-1">
                            {!isCollateralAtTop && ( // Fee display for redeeming
                              <>
                                <span className="text-[#F5F5F5]/70">Fee:</span>
                                <span className="text-[#4A7C59]">
                                  {selectedType === "STEAMED" &&
                                  Array.isArray(redeemLeveragedDryRunResult) &&
                                  redeemLeveragedDryRunResult.length > 0 &&
                                  typeof redeemLeveragedDryRunResult[0] ===
                                    "bigint"
                                    ? formatFeeRatio(
                                        redeemLeveragedDryRunResult[0] as bigint
                                      )
                                    : selectedType === "LONG"
                                    ? formatFeeRatio(redeemFeeResult)
                                    : "-"}
                                </span>
                              </>
                            )}
                            {isCollateralAtTop && ( // Fee display for minting (PEGGED or LEVERAGED)
                              <>
                                <span className="text-[#F5F5F5]/70">Fee:</span>
                                <span className="text-[#4A7C59]">
                                  {selectedType === "LONG"
                                    ? formatFeeRatio(mintFeeResult) // Pegged mint fee
                                    : selectedType === "STEAMED" && // Leveraged mint fee
                                      Array.isArray(
                                        mintLeveragedDryRunResult
                                      ) &&
                                      mintLeveragedDryRunResult.length > 0 &&
                                      typeof mintLeveragedDryRunResult[0] ===
                                        "bigint"
                                    ? formatFeeRatio(
                                        mintLeveragedDryRunResult[0] as bigint
                                      )
                                    : "-"}
                                </span>
                              </>
                            )}
                          </div>
                          {/* Center: Mint/Arrows/Redeem */}
                          <div className="flex-grow flex items-center justify-center gap-x-4">
                            <span
                              className={`text-sm font-medium transition-colors duration-200 ${
                                isCollateralAtTop
                                  ? "text-[#4A7C59]"
                                  : "text-[#F5F5F5]/40"
                              }`}
                            >
                              Mint
                            </span>
                            <button
                              type="button"
                              onClick={() =>
                                setIsCollateralAtTop(!isCollateralAtTop)
                              }
                              className="group relative flex items-center justify-center px-2 py-2 mx-2 bg-[#4A7C59] hover:bg-[#3A6147] transition-colors"
                            >
                              <svg
                                viewBox="0 0 24 24"
                                fill="none"
                                className={`w-5 h-5 transition-transform duration-200 ${
                                  !isCollateralAtTop ? "rotate-180" : "rotate-0"
                                }`}
                              >
                                <path
                                  d="M12 4V20M19 13L12 20L5 13"
                                  stroke="#F5F5F5"
                                  strokeOpacity={
                                    isCollateralAtTop ? "1" : "0.3"
                                  }
                                  strokeWidth="2"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                              </svg>
                              <svg
                                viewBox="0 0 24 24"
                                fill="none"
                                className={`w-5 h-5 transition-transform duration-200 ${
                                  !isCollateralAtTop ? "rotate-180" : "rotate-0"
                                }`}
                              >
                                <path
                                  d="M12 20V4M5 11L12 4L19 11"
                                  stroke="#F5F5F5"
                                  strokeOpacity={
                                    !isCollateralAtTop ? "1" : "0.3"
                                  }
                                  strokeWidth="2"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                              </svg>
                            </button>
                            <span
                              className={`text-sm font-medium transition-colors duration-200 ${
                                !isCollateralAtTop
                                  ? "text-[#4A7C59]"
                                  : "text-[#F5F5F5]/40"
                              }`}
                            >
                              Redeem
                            </span>
                          </div>
                          {/* Right: Spacer, same width as left */}
                          <div className="min-w-[80px]"></div>
                        </div>
                        {/* Second Token Input (zheUSD) */}
                        <div
                          className={`absolute w-full space-y-2 transition-all duration-200 ${
                            isCollateralAtTop
                              ? "translate-y-[calc(260%+2rem)]"
                              : "translate-y-0"
                          }`}
                        >
                          <div className="flex items-center justify-between">
                            <label className="text-sm text-[#F5F5F5]/80">
                              To
                            </label>
                            <span className="text-sm text-[#F5F5F5]/60">
                              Balance:{" "}
                              {formatBalance(
                                peggedBalance?.[0]?.result as bigint | undefined
                              )}{" "}
                              zheUSD
                            </span>
                          </div>
                          <div className="relative">
                            <input
                              type="number"
                              value={
                                isCollateralAtTop ? outputAmount : inputAmount
                              }
                              onChange={
                                isCollateralAtTop
                                  ? handleOutputAmountChange
                                  : handleInputAmountChange
                              }
                              placeholder="0.0"
                              className="w-full p-4 bg-[#202020] text-[#F5F5F5] border border-[#4A7C59]/30 focus:border-[#4A7C59] outline-none transition-all pr-24 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                              readOnly={isCollateralAtTop}
                            />
                            <div className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center gap-2">
                              {!isCollateralAtTop &&
                                selectedType === "LONG" && (
                                  <button
                                    type="button"
                                    onClick={handleMaxClick}
                                    className="text-[#4A7C59] hover:text-[#3A6147] text-sm transition-colors"
                                  >
                                    MAX
                                  </button>
                                )}
                              <span className="text-[#F5F5F5]/70">zheUSD</span>
                            </div>
                          </div>
                          {!isCollateralAtTop &&
                            selectedType === "LONG" &&
                            redeemPeggedDryRunError && (
                              <div className="text-sm text-red-500 font-semibold mt-1">
                                Invalid amount or not enough balance
                              </div>
                            )}
                        </div>
                      </div>
                      {/* Transaction Details Panel & Submit Button */}
                      <div className="relative [perspective:1000px]">
                        {!isConnected ? (
                          <button
                            type="submit"
                            disabled
                            className={`w-full p-4 text-center text-2xl bg-[#1F3529] text-[#4A7C59] cursor-not-allowed ${geoClassName}`}
                          >
                            Connect Wallet
                          </button>
                        ) : isPending && pendingStep === "approval" ? (
                          <button
                            type="submit"
                            disabled
                            className={`w-full p-4 text-center text-2xl bg-[#1F3529] text-[#4A7C59] cursor-not-allowed ${geoClassName}`}
                          >
                            Waiting for approval transaction...
                          </button>
                        ) : isPending && pendingStep === "mintOrRedeem" ? (
                          <button
                            type="submit"
                            disabled
                            className={`w-full p-4 text-center text-2xl bg-[#1F3529] text-[#4A7C59] cursor-not-allowed ${geoClassName}`}
                          >
                            Waiting for mint/redeem transaction...
                          </button>
                        ) : (
                          <div
                            className="[transform-style:preserve-3d] transition-transform duration-200 relative h-[60px]"
                            style={{
                              transformOrigin: "center center",
                              transform: isCollateralAtTop
                                ? "rotateX(0deg)"
                                : "rotateX(180deg)",
                            }}
                          >
                            <button
                              onClick={handleSubmit}
                              disabled={
                                !inputAmount || parseFloat(inputAmount) <= 0
                              }
                              className={`w-full p-4 text-center text-2xl bg-[#4A7C59] hover:bg-[#5A8C69] text-white absolute inset-0 [backface-visibility:hidden] [transform-style:preserve-3d] shadow-[0_0_20px_rgba(74,124,89,0.2)] disabled:bg-[#1F3529] disabled:text-[#4A7C59] disabled:cursor-not-allowed ${geoClassName}`}
                            >
                              <span className={geoClassName}>
                                {(() => {
                                  if (
                                    !inputAmount ||
                                    parseFloat(inputAmount) <= 0
                                  )
                                    return "Enter Amount";
                                  return isCollateralAtTop ? "MINT" : "REDEEM";
                                })()}
                              </span>
                            </button>
                            <button
                              onClick={handleSubmit}
                              disabled={
                                !inputAmount || parseFloat(inputAmount) <= 0
                              }
                              className={`w-full p-4 text-center text-2xl bg-[#4A7C59] hover:bg-[#5A8C69] text-white absolute inset-0 [transform:rotateX(180deg)] [backface-visibility:hidden] [transform-style:preserve-3d] disabled:bg-[#1F3529] disabled:text-[#4A7C59] disabled:cursor-not-allowed ${geoClassName}`}
                            >
                              <span className={geoClassName}>
                                {(() => {
                                  if (
                                    !inputAmount ||
                                    parseFloat(inputAmount) <= 0
                                  )
                                    return "Enter Amount";
                                  return isCollateralAtTop ? "MINT" : "REDEEM";
                                })()}
                              </span>
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>

            {/* Back Side (LEVERAGE) */}
            <div className="absolute inset-0 bg-[#0A0A0A]/90 before:absolute before:inset-0 before:bg-black/90 shadow-[0_0_15px_rgba(74,124,89,0.1)] [backface-visibility:hidden] [transform:rotateY(180deg)] transform-gpu">
              <div
                className={`relative z-10 h-full transition-opacity duration-50 delay-[145ms] ${
                  selectedType === "STEAMED" ? "opacity-100" : "opacity-0"
                }`}
              >
                <div className="p-6">
                  <div className="text-center mb-4">
                    <h1
                      className={`text-3xl text-[#4A7C59] mb-1 ${geoClassName}`}
                    >
                      steamedETH {/* Dynamic for selected leveraged token */}
                    </h1>
                    <div className="text-[#F5F5F5]/50 text-sm -mt-1">
                      <span className="block text-[10px] mb-0.5">Leverage</span>
                      {formatLeverageRatio(leverageRatioResult)}
                    </div>
                  </div>
                  <form onSubmit={handleSubmit} className="space-y-8 mt-2">
                    <div className="space-y-6 relative">
                      <div className="relative h-[360px]">
                        {" "}
                        {/* Input Boxes Container */}
                        {/* First Token Input (wstETH) */}
                        <div
                          className={`absolute w-full space-y-2 transition-all duration-200 ${
                            isCollateralAtTop
                              ? "translate-y-0"
                              : "translate-y-[calc(260%+2rem)]"
                          }`}
                        >
                          <div className="flex items-center justify-between">
                            <label className="text-sm text-[#F5F5F5]/80">
                              From
                            </label>
                            <span className="text-sm text-[#F5F5F5]/60">
                              Balance:{" "}
                              {formatBalance(
                                collateralBalance?.[0]?.result as
                                  | bigint
                                  | undefined
                              )}{" "}
                              wstETH
                            </span>
                          </div>
                          <div className="flex-1 relative">
                            <input
                              type="text"
                              value={
                                isCollateralAtTop ? inputAmount : outputAmount
                              }
                              onChange={
                                isCollateralAtTop
                                  ? handleInputAmountChange
                                  : undefined
                              }
                              placeholder="0.0"
                              className="w-full bg-[#202020] text-[#F5F5F5] border border-[#4A7C59]/30 focus:border-[#4A7C59] outline-none transition-all p-4 pr-24"
                              readOnly={!isCollateralAtTop}
                            />
                            <div className="absolute right-4 top-1/2 -translate-y-1/2 flex flex-col items-end">
                              <div className="flex items-center gap-2">
                                {isCollateralAtTop && (
                                  <button
                                    type="button"
                                    onClick={handleMaxClick}
                                    className="text-[#4A7C59] hover:text-[#3A6147] text-sm transition-colors"
                                  >
                                    MAX
                                  </button>
                                )}
                                <span className="text-[#F5F5F5]/70">
                                  wstETH
                                </span>
                              </div>
                              {isCollateralAtTop && (
                                <button
                                  onClick={() =>
                                    window.open(
                                      "https://swap.defillama.com/?chain=ethereum&from=0x0000000000000000000000000000000000000000&tab=swap&to=0x7f39c581f595b53c5cb19bd0b3f8da6c935e2ca0",
                                      "_blank"
                                    )
                                  }
                                  className="text-[#4A7C59] hover:text-[#3A6147] text-[10px] transition-colors mt-1"
                                >
                                  Get wstETH
                                </button>
                              )}
                            </div>
                          </div>
                        </div>
                        {/* Swap Direction and Fee - LEVERAGE */}
                        <div className="absolute top-[160px] left-0 right-0 flex items-center w-full">
                          {/* Left: Fee */}
                          <div className="text-xs text-left min-w-[80px] flex items-center justify-start gap-1">
                            {!isCollateralAtTop && ( // Fee display for redeeming
                              <>
                                <span className="text-[#F5F5F5]/70">Fee:</span>
                                <span className="text-[#4A7C59]">
                                  {selectedType === "STEAMED" &&
                                  Array.isArray(redeemLeveragedDryRunResult) &&
                                  redeemLeveragedDryRunResult.length > 0 &&
                                  typeof redeemLeveragedDryRunResult[0] ===
                                    "bigint"
                                    ? formatFeeRatio(
                                        redeemLeveragedDryRunResult[0] as bigint
                                      )
                                    : selectedType === "LONG"
                                    ? formatFeeRatio(redeemFeeResult)
                                    : "-"}
                                </span>
                              </>
                            )}
                            {isCollateralAtTop && ( // Fee display for minting (PEGGED or LEVERAGED)
                              <>
                                <span className="text-[#F5F5F5]/70">Fee:</span>
                                <span className="text-[#4A7C59]">
                                  {selectedType === "LONG"
                                    ? formatFeeRatio(mintFeeResult) // Pegged mint fee
                                    : selectedType === "STEAMED" && // Leveraged mint fee
                                      Array.isArray(
                                        mintLeveragedDryRunResult
                                      ) &&
                                      mintLeveragedDryRunResult.length > 0 &&
                                      typeof mintLeveragedDryRunResult[0] ===
                                        "bigint"
                                    ? formatFeeRatio(
                                        mintLeveragedDryRunResult[0] as bigint
                                      )
                                    : "-"}
                                </span>
                              </>
                            )}
                          </div>
                          {/* Center: Mint/Arrows/Redeem */}
                          <div className="flex-grow flex items-center justify-center gap-x-4">
                            <span
                              className={`text-sm font-medium transition-colors duration-200 ${
                                isCollateralAtTop
                                  ? "text-[#4A7C59]"
                                  : "text-[#F5F5F5]/40"
                              }`}
                            >
                              Mint
                            </span>
                            <button
                              type="button"
                              onClick={() =>
                                setIsCollateralAtTop(!isCollateralAtTop)
                              }
                              className="group relative flex items-center justify-center px-2 py-2 mx-2 bg-[#4A7C59] hover:bg-[#3A6147] transition-colors"
                            >
                              <svg
                                viewBox="0 0 24 24"
                                fill="none"
                                className={`w-5 h-5 transition-transform duration-200 ${
                                  !isCollateralAtTop ? "rotate-180" : "rotate-0"
                                }`}
                              >
                                <path
                                  d="M12 4V20M19 13L12 20L5 13"
                                  stroke="#F5F5F5"
                                  strokeOpacity={
                                    isCollateralAtTop ? "1" : "0.3"
                                  }
                                  strokeWidth="2"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                              </svg>
                              <svg
                                viewBox="0 0 24 24"
                                fill="none"
                                className={`w-5 h-5 transition-transform duration-200 ${
                                  !isCollateralAtTop ? "rotate-180" : "rotate-0"
                                }`}
                              >
                                <path
                                  d="M12 20V4M5 11L12 4L19 11"
                                  stroke="#F5F5F5"
                                  strokeOpacity={
                                    !isCollateralAtTop ? "1" : "0.3"
                                  }
                                  strokeWidth="2"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                              </svg>
                            </button>
                            <span
                              className={`text-sm font-medium transition-colors duration-200 ${
                                !isCollateralAtTop
                                  ? "text-[#4A7C59]"
                                  : "text-[#F5F5F5]/40"
                              }`}
                            >
                              Redeem
                            </span>
                          </div>
                          {/* Right: Spacer, same width as left */}
                          <div className="min-w-[80px]"></div>
                        </div>
                        {/* Second Token Input (steamedETH) */}
                        <div
                          className={`absolute w-full space-y-2 transition-all duration-200 ${
                            isCollateralAtTop
                              ? "translate-y-[calc(260%+2rem)]"
                              : "translate-y-0"
                          }`}
                        >
                          <div className="flex items-center justify-between">
                            <label className="text-sm text-[#F5F5F5]/80">
                              To
                            </label>
                            <span className="text-sm text-[#F5F5F5]/60">
                              Balance:{" "}
                              {formatBalance(
                                leveragedBalance?.[0]?.result as
                                  | bigint
                                  | undefined
                              )}{" "}
                              steamedETH {/* Dynamic */}
                            </span>
                          </div>
                          <div className="relative">
                            <input
                              type="number"
                              value={
                                isCollateralAtTop ? outputAmount : inputAmount
                              }
                              onChange={
                                isCollateralAtTop
                                  ? handleOutputAmountChange
                                  : handleInputAmountChange
                              }
                              placeholder="0.0"
                              className="w-full p-4 bg-[#202020] text-[#F5F5F5] border border-[#4A7C59]/30 focus:border-[#4A7C59] outline-none transition-all pr-24 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                              readOnly={isCollateralAtTop}
                            />
                            <div className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center gap-2">
                              {!isCollateralAtTop &&
                                selectedType === "STEAMED" && (
                                  <button
                                    type="button"
                                    onClick={handleMaxClick}
                                    className="text-[#4A7C59] hover:text-[#3A6147] text-sm transition-colors"
                                  >
                                    MAX
                                  </button>
                                )}
                              <span className="text-[#F5F5F5]/70">
                                steamedETH
                              </span>
                            </div>
                          </div>
                          {!isCollateralAtTop &&
                            selectedType === "STEAMED" &&
                            redeemLeveragedDryRunError && (
                              <div className="text-sm text-red-500 font-semibold mt-1">
                                Invalid amount or not enough balance
                              </div>
                            )}
                        </div>
                      </div>
                      {/* Submit Button for LEVERAGE */}
                      <div className="relative [perspective:1000px]">
                        {!isConnected ? (
                          <button
                            type="submit"
                            disabled
                            className={`w-full p-4 text-center text-2xl bg-[#1F3529] text-[#4A7C59] cursor-not-allowed ${geoClassName}`}
                          >
                            Connect Wallet
                          </button>
                        ) : isPending && pendingStep === "approval" ? (
                          <button
                            type="submit"
                            disabled
                            className={`w-full p-4 text-center text-2xl bg-[#1F3529] text-[#4A7C59] cursor-not-allowed ${geoClassName}`}
                          >
                            Waiting for approval transaction...
                          </button>
                        ) : isPending && pendingStep === "mintOrRedeem" ? (
                          <button
                            type="submit"
                            disabled
                            className={`w-full p-4 text-center text-2xl bg-[#1F3529] text-[#4A7C59] cursor-not-allowed ${geoClassName}`}
                          >
                            Waiting for mint/redeem transaction...
                          </button>
                        ) : (
                          <div
                            className="[transform-style:preserve-3d] transition-transform duration-200 relative h-[60px]"
                            style={{
                              transformOrigin: "center center",
                              transform: isCollateralAtTop
                                ? "rotateX(0deg)"
                                : "rotateX(180deg)",
                            }}
                          >
                            <button
                              onClick={handleSubmit}
                              disabled={
                                !inputAmount || parseFloat(inputAmount) <= 0
                              }
                              className={`w-full p-4 text-center text-2xl bg-[#4A7C59] hover:bg-[#5A8C69] text-white absolute inset-0 [backface-visibility:hidden] [transform-style:preserve-3d] shadow-[0_0_20px_rgba(74,124,89,0.2)] disabled:bg-[#1F3529] disabled:text-[#4A7C59] disabled:cursor-not-allowed ${geoClassName}`}
                            >
                              <span className={geoClassName}>
                                {(() => {
                                  if (
                                    !inputAmount ||
                                    parseFloat(inputAmount) <= 0
                                  )
                                    return "Enter Amount";
                                  return isCollateralAtTop ? "MINT" : "REDEEM";
                                })()}
                              </span>
                            </button>
                            <button
                              onClick={handleSubmit}
                              disabled={
                                !inputAmount || parseFloat(inputAmount) <= 0
                              }
                              className={`w-full p-4 text-center text-2xl bg-[#4A7C59] hover:bg-[#5A8C69] text-white absolute inset-0 [transform:rotateX(180deg)] [backface-visibility:hidden] [transform-style:preserve-3d] disabled:bg-[#1F3529] disabled:text-[#4A7C59] disabled:cursor-not-allowed ${geoClassName}`}
                            >
                              <span className={geoClassName}>
                                {(() => {
                                  if (
                                    !inputAmount ||
                                    parseFloat(inputAmount) <= 0
                                  )
                                    return "Enter Amount";
                                  return isCollateralAtTop ? "MINT" : "REDEEM";
                                })()}
                              </span>
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Modal skeleton */}
        {showConfirmModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
            <div className="bg-[#181818] p-8 rounded-lg shadow-lg w-full max-w-md">
              <h3 className="text-xl font-bold mb-4 text-[#F5F5F5]">
                Confirm Mint Transaction
              </h3>
              <div className="space-y-2 text-[#F5F5F5] text-sm">
                <div className="flex justify-between">
                  <span>Collateral Used:</span>
                  <span>{/* TODO: Show value */}</span>
                </div>
                <div className="flex justify-between">
                  <span>Fee:</span>
                  <span>{/* TODO: Show value */}</span>
                </div>
                <div className="flex justify-between">
                  <span>Oracle Price:</span>
                  <span>{/* TODO: Show value */}</span>
                </div>
                <div className="flex justify-between">
                  <span>Pegged Minted:</span>
                  <span>{/* TODO: Show value */}</span>
                </div>
              </div>
              <div className="flex justify-end gap-4 mt-6">
                <button
                  className="px-4 py-2 bg-[#2A2A2A] text-[#F5F5F5] rounded hover:bg-[#333]"
                  onClick={() => setShowConfirmModal(false)}
                >
                  Cancel
                </button>
                <button
                  className="px-4 py-2 bg-[#4A7C59] text-white rounded hover:bg-[#5A8C69] font-bold"
                  // TODO: Wire up to actual mint
                >
                  Confirm
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MintRedeemForm;
