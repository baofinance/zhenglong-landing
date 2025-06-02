"use client";

import { useState, useEffect } from "react";
import { Geo } from "next/font/google";
import { useAccount, useContractReads, useContractWrite } from "wagmi";
import { parseEther } from "viem";
import Link from "next/link";
import Image from "next/image";
import ConnectButton from "../../components/ConnectButton";
import Navigation from "../../components/Navigation";

const geo = Geo({
  subsets: ["latin"],
  weight: "400",
  display: "swap",
});

const votingEscrowABI = [
  {
    inputs: [],
    name: "token",
    outputs: [{ type: "address", name: "" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "totalSupply",
    outputs: [{ type: "uint256", name: "" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ name: "addr", type: "address" }],
    name: "balanceOf",
    outputs: [{ type: "uint256", name: "" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ name: "addr", type: "address" }],
    name: "locked__end",
    outputs: [{ type: "uint256", name: "" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { name: "value", type: "uint256" },
      { name: "unlock_time", type: "uint256" },
    ],
    name: "create_lock",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [{ name: "value", type: "uint256" }],
    name: "increase_amount",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [{ name: "unlock_time", type: "uint256" }],
    name: "increase_unlock_time",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "withdraw",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
] as const;

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
  {
    inputs: [],
    name: "symbol",
    outputs: [{ type: "string", name: "" }],
    stateMutability: "view",
    type: "function",
  },
] as const;

interface StakingState {
  amount: string;
  lockDuration: number; // in weeks
  activeTab: "stake" | "increase" | "extend" | "withdraw";
}

export default function Staking() {
  const { isConnected, address } = useAccount();
  const [stakingState, setStakingState] = useState<StakingState>({
    amount: "",
    lockDuration: 1,
    activeTab: "stake",
  });
  const [isPending, setIsPending] = useState(false);

  // Contract reads
  const { data: stakingData } = useContractReads({
    contracts: [
      {
        address: "0xVotingEscrowAddress" as `0x${string}`,
        abi: votingEscrowABI,
        functionName: "totalSupply",
      },
      ...(address
        ? [
            {
              address: "0xVotingEscrowAddress" as `0x${string}`,
              abi: votingEscrowABI,
              functionName: "balanceOf",
              args: [address],
            },
            {
              address: "0xVotingEscrowAddress" as `0x${string}`,
              abi: votingEscrowABI,
              functionName: "locked__end",
              args: [address],
            },
          ]
        : []),
    ],
    watch: true,
  });

  const formatEther = (value: bigint | undefined) => {
    if (!value) return "0";
    return (Number(value) / 1e18).toFixed(4);
  };

  const handleStake = async () => {
    if (!isConnected || !stakingState.amount || !address) return;

    try {
      setIsPending(true);
      const parsedAmount = parseEther(stakingState.amount);
      const unlockTime =
        Math.floor(Date.now() / 1000) +
        stakingState.lockDuration * 7 * 24 * 60 * 60;

      // First approve tokens
      const { writeAsync: approve } = await import("wagmi").then((m) =>
        m.useContractWrite({
          address: "0xTokenAddress" as `0x${string}`,
          abi: erc20ABI,
          functionName: "approve",
        })
      );

      await approve({
        args: ["0xVotingEscrowAddress" as `0x${string}`, parsedAmount],
      });

      // Then create lock
      const { writeAsync: createLock } = await import("wagmi").then((m) =>
        m.useContractWrite({
          address: "0xVotingEscrowAddress" as `0x${string}`,
          abi: votingEscrowABI,
          functionName: "create_lock",
        })
      );

      await createLock({
        args: [parsedAmount, BigInt(unlockTime)],
      });

      setStakingState((prev) => ({ ...prev, amount: "" }));
    } catch (error) {
      console.error("Error staking:", error);
    } finally {
      setIsPending(false);
    }
  };

  const handleIncreaseAmount = async () => {
    if (!isConnected || !stakingState.amount || !address) return;

    try {
      setIsPending(true);
      const parsedAmount = parseEther(stakingState.amount);

      const { writeAsync: increaseAmount } = await import("wagmi").then((m) =>
        m.useContractWrite({
          address: "0xVotingEscrowAddress" as `0x${string}`,
          abi: votingEscrowABI,
          functionName: "increase_amount",
        })
      );

      await increaseAmount({
        args: [parsedAmount],
      });

      setStakingState((prev) => ({ ...prev, amount: "" }));
    } catch (error) {
      console.error("Error increasing amount:", error);
    } finally {
      setIsPending(false);
    }
  };

  const handleExtendLock = async () => {
    if (!isConnected || !address) return;

    try {
      setIsPending(true);
      const unlockTime =
        Math.floor(Date.now() / 1000) +
        stakingState.lockDuration * 7 * 24 * 60 * 60;

      const { writeAsync: increaseLockTime } = await import("wagmi").then((m) =>
        m.useContractWrite({
          address: "0xVotingEscrowAddress" as `0x${string}`,
          abi: votingEscrowABI,
          functionName: "increase_unlock_time",
        })
      );

      await increaseLockTime({
        args: [BigInt(unlockTime)],
      });
    } catch (error) {
      console.error("Error extending lock:", error);
    } finally {
      setIsPending(false);
    }
  };

  const handleWithdraw = async () => {
    if (!isConnected || !address) return;

    try {
      setIsPending(true);

      const { writeAsync: withdraw } = await import("wagmi").then((m) =>
        m.useContractWrite({
          address: "0xVotingEscrowAddress" as `0x${string}`,
          abi: votingEscrowABI,
          functionName: "withdraw",
        })
      );

      await withdraw();
    } catch (error) {
      console.error("Error withdrawing:", error);
    } finally {
      setIsPending(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#1A1A1A] to-black text-[#F5F5F5] font-sans relative">
      {/* Steam Background */}
      <div className="fixed inset-0 pointer-events-none">
        {/* Large base squares */}
        <div className="absolute top-[10%] left-[20%] w-[200px] h-[200px] bg-[#4A7C59]/[0.06]"></div>
        <div className="absolute top-[15%] left-[35%] w-[180px] h-[180px] bg-[#4A7C59]/[0.05]"></div>
        <div className="absolute top-[20%] left-[50%] w-[160px] h-[160px] bg-[#4A7C59]/[0.07]"></div>

        {/* Medium squares - Layer 1 */}
        <div className="absolute top-[30%] left-[15%] w-[150px] h-[150px] bg-[#4A7C59]/[0.04] animate-float-1"></div>
        <div className="absolute top-[35%] left-[30%] w-[140px] h-[140px] bg-[#4A7C59]/[0.045] animate-float-2"></div>
        <div className="absolute top-[40%] left-[45%] w-[130px] h-[130px] bg-[#4A7C59]/[0.055] animate-float-3"></div>

        {/* Medium squares - Layer 2 */}
        <div className="absolute top-[50%] left-[25%] w-[120px] h-[120px] bg-[#4A7C59]/[0.065] animate-float-4"></div>
        <div className="absolute top-[55%] left-[40%] w-[110px] h-[110px] bg-[#4A7C59]/[0.05] animate-float-1"></div>
        <div className="absolute top-[60%] left-[55%] w-[100px] h-[100px] bg-[#4A7C59]/[0.06] animate-float-2"></div>

        {/* Small squares */}
        <div className="absolute top-[70%] left-[20%] w-[80px] h-[80px] bg-[#4A7C59]/[0.075] animate-steam-1"></div>
        <div className="absolute top-[75%] left-[35%] w-[70px] h-[70px] bg-[#4A7C59]/[0.07] animate-steam-2"></div>
        <div className="absolute top-[80%] left-[50%] w-[60px] h-[60px] bg-[#4A7C59]/[0.08] animate-steam-3"></div>
        <div className="absolute top-[85%] left-[65%] w-[50px] h-[50px] bg-[#4A7C59]/[0.065] animate-steam-1"></div>
        <div className="absolute top-[90%] left-[80%] w-[40px] h-[40px] bg-[#4A7C59]/[0.075] animate-steam-2"></div>
        <div className="absolute top-[95%] left-[95%] w-[30px] h-[30px] bg-[#4A7C59]/[0.07] animate-steam-3"></div>
      </div>

      {/* Navigation */}
      <Navigation />

      {/* Main Content */}
      <main className="container mx-auto px-6 pt-32 pb-20 relative z-10">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className={`text-4xl text-[#4A7C59] ${geo.className}`}>
            Stake STEAM
          </h1>
          <p className="text-[#F5F5F5]/60 text-sm mt-2">
            Boost rewards, Share protocol revenue and vote on liquidity
            incentives
          </p>
        </div>

        <div className="max-w-5xl mx-auto space-y-6">
          <div className="bg-[#1A1A1A] p-6 relative">
            {/* Stats */}
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="bg-black p-4 border border-[#4A7C59]/20">
                <p className="text-xs text-[#F5F5F5]/50 mb-0.5">Total Staked</p>
                <p className="text-sm font-medium text-[#4A7C59]">
                  {formatEther(stakingData?.[0]?.result as bigint)} STEAM
                </p>
              </div>
              {address && (
                <div className="bg-black p-4 border border-[#4A7C59]/20">
                  <p className="text-xs text-[#F5F5F5]/50 mb-0.5">
                    Your Voting Power
                  </p>
                  <p className="text-sm font-medium text-[#4A7C59]">
                    {formatEther(stakingData?.[1]?.result as bigint)} vSTEAM
                  </p>
                </div>
              )}
            </div>

            {/* Tabs */}
            <div className="flex space-x-4 mb-6">
              <button
                onClick={() =>
                  setStakingState((prev) => ({ ...prev, activeTab: "stake" }))
                }
                className={`px-4 py-2 text-sm font-medium border border-[#4A7C59]/20 ${
                  stakingState.activeTab === "stake"
                    ? "bg-[#4A7C59] text-white"
                    : "bg-black text-[#4A7C59] hover:bg-[#4A7C59]/10"
                }`}
              >
                Stake
              </button>
              <button
                onClick={() =>
                  setStakingState((prev) => ({
                    ...prev,
                    activeTab: "increase",
                  }))
                }
                className={`px-4 py-2 text-sm font-medium border border-[#4A7C59]/20 ${
                  stakingState.activeTab === "increase"
                    ? "bg-[#4A7C59] text-white"
                    : "bg-black text-[#4A7C59] hover:bg-[#4A7C59]/10"
                }`}
              >
                Increase
              </button>
              <button
                onClick={() =>
                  setStakingState((prev) => ({
                    ...prev,
                    activeTab: "extend",
                  }))
                }
                className={`px-4 py-2 text-sm font-medium border border-[#4A7C59]/20 ${
                  stakingState.activeTab === "extend"
                    ? "bg-[#4A7C59] text-white"
                    : "bg-black text-[#4A7C59] hover:bg-[#4A7C59]/10"
                }`}
              >
                Extend
              </button>
              <button
                onClick={() =>
                  setStakingState((prev) => ({
                    ...prev,
                    activeTab: "withdraw",
                  }))
                }
                className={`px-4 py-2 text-sm font-medium border border-[#4A7C59]/20 ${
                  stakingState.activeTab === "withdraw"
                    ? "bg-[#4A7C59] text-white"
                    : "bg-black text-[#4A7C59] hover:bg-[#4A7C59]/10"
                }`}
              >
                Withdraw
              </button>
            </div>

            {/* Tab Content */}
            {isConnected ? (
              <div className="space-y-4">
                {(stakingState.activeTab === "stake" ||
                  stakingState.activeTab === "increase") && (
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <label className="text-sm text-[#F5F5F5]/70">
                          Amount
                        </label>
                        <span className="text-sm text-[#F5F5F5]/50">
                          Balance: 0 STEAM
                        </span>
                      </div>
                      <input
                        type="text"
                        value={stakingState.amount}
                        onChange={(e) =>
                          setStakingState((prev) => ({
                            ...prev,
                            amount: e.target.value,
                          }))
                        }
                        placeholder="Enter amount in STEAM"
                        className="w-full bg-black text-white p-3 border border-[#4A7C59]/20 focus:outline-none focus:border-[#4A7C59]"
                      />
                    </div>

                    {stakingState.activeTab === "stake" && (
                      <div className="space-y-2">
                        <label className="text-sm text-[#F5F5F5]/70">
                          Lock Duration (weeks)
                        </label>
                        <input
                          type="range"
                          min="1"
                          max="208"
                          value={stakingState.lockDuration}
                          onChange={(e) =>
                            setStakingState((prev) => ({
                              ...prev,
                              lockDuration: parseInt(e.target.value),
                            }))
                          }
                          className="w-full"
                        />
                        <div className="flex justify-between text-sm text-[#F5F5F5]/50">
                          <span>1 week</span>
                          <span>{stakingState.lockDuration} weeks</span>
                          <span>4 years</span>
                        </div>
                      </div>
                    )}

                    <button
                      onClick={
                        stakingState.activeTab === "stake"
                          ? handleStake
                          : handleIncreaseAmount
                      }
                      disabled={isPending || !stakingState.amount}
                      className="w-full py-3 bg-[#4A7C59] text-white font-medium disabled:opacity-50 disabled:cursor-not-allowed hover:bg-[#4A7C59]/90"
                    >
                      {isPending
                        ? "Pending..."
                        : stakingState.activeTab === "stake"
                        ? "Stake"
                        : "Increase"}
                    </button>
                  </div>
                )}

                {stakingState.activeTab === "extend" && (
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <label className="text-sm text-[#F5F5F5]/70">
                        New Lock Duration (weeks)
                      </label>
                      <input
                        type="range"
                        min="1"
                        max="208"
                        value={stakingState.lockDuration}
                        onChange={(e) =>
                          setStakingState((prev) => ({
                            ...prev,
                            lockDuration: parseInt(e.target.value),
                          }))
                        }
                        className="w-full"
                      />
                      <div className="flex justify-between text-sm text-[#F5F5F5]/50">
                        <span>1 week</span>
                        <span>{stakingState.lockDuration} weeks</span>
                        <span>4 years</span>
                      </div>
                    </div>

                    <button
                      onClick={handleExtendLock}
                      disabled={isPending}
                      className="w-full py-3 bg-[#4A7C59] text-white font-medium disabled:opacity-50 disabled:cursor-not-allowed hover:bg-[#4A7C59]/90"
                    >
                      {isPending ? "Pending..." : "Extend Lock"}
                    </button>
                  </div>
                )}

                {stakingState.activeTab === "withdraw" && (
                  <div className="space-y-4">
                    <div className="bg-black p-4 border border-[#4A7C59]/20">
                      <p className="text-sm text-[#F5F5F5]/50 mb-1">
                        Lock End Time
                      </p>
                      <p className="text-lg font-medium text-[#4A7C59]">
                        {new Date(
                          Number(stakingData?.[2]?.result ?? 0) * 1000
                        ).toLocaleString()}
                      </p>
                    </div>

                    <button
                      onClick={handleWithdraw}
                      disabled={
                        isPending ||
                        (stakingData?.[2]?.result !== undefined &&
                          Number(stakingData[2].result) > Date.now() / 1000)
                      }
                      className="w-full py-3 bg-[#4A7C59] text-white font-medium disabled:opacity-50 disabled:cursor-not-allowed hover:bg-[#4A7C59]/90"
                    >
                      {isPending
                        ? "Pending..."
                        : stakingData?.[2]?.result !== undefined &&
                          Number(stakingData[2].result) > Date.now() / 1000
                        ? "Lock Not Expired"
                        : "Withdraw"}
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="text-center">
                <ConnectButton />
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
