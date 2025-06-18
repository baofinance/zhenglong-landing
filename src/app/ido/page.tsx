"use client";
import { useState, useEffect, useCallback } from "react";
import Header from "@/components/Header";
import IdoDashboard from "@/components/IdoDashboard";
import IdoDeposit from "@/components/IdoDeposit";
import UserPosition from "@/components/UserPosition";
import SteamBackground from "@/components/SteamBackground";
import { geo } from "@/utils/fonts";
import Image from "next/image";
import UserAllocation from "@/components/UserAllocation";
import { getIdoContractAddress } from "@/config/contracts";
import idoAddresses from "@/data/ido_addresses.json";
import idoSnapshot from "@/data/ido_snapshot_normalized.json";

export default function IdoPage() {
  const [walletAddress, setWalletAddress] = useState<string>("");
  const [discount, setDiscount] = useState<number>(0);
  const [userTotalDeposited, setUserTotalDeposited] = useState<number>(0);
  const [isEligible, setIsEligible] = useState<boolean>(false);
  const [isConnecting, setIsConnecting] = useState(false);

  const disconnectWallet = async () => {
    // For now, we'll just clear the wallet address to simulate a disconnect
    // A more robust solution might involve interacting with the wallet provider
    setWalletAddress("");
    setDiscount(0);
    setUserTotalDeposited(0);
    setIsEligible(false);
  };

  const connectWallet = async () => {
    setIsConnecting(true);
    try {
      if (typeof window !== "undefined" && window.ethereum) {
        await window.ethereum.request({
          method: "eth_requestAccounts",
        });
        // The 'accountsChanged' event will handle the rest, but we'll also manually refresh
        await checkWalletAndFetchData();
      } else {
        alert("Web3 wallet not detected. Please install MetaMask.");
      }
    } catch (error: any) {
      console.error("Failed to connect wallet:", error);
      if (error.code === 4001) {
        alert("Please approve the connection in your wallet.");
      } else {
        alert("Failed to connect wallet. Please try again.");
      }
    } finally {
      setIsConnecting(false);
    }
  };

  const checkWalletAndFetchData = useCallback(async () => {
    if (typeof window !== "undefined" && window.ethereum) {
      try {
        const accounts = await window.ethereum.request({
          method: "eth_accounts",
        });
        if (accounts.length > 0) {
          const address = accounts[0];
          setWalletAddress(address);

          // --- Start of logic moved from child components ---

          // Check eligibility
          const lowerAddress = address.toLowerCase();
          const eligible = idoAddresses
            .map((addr: string) => addr.toLowerCase())
            .includes(lowerAddress);
          setIsEligible(eligible);

          // Calculate discount allocation
          const entry = idoSnapshot[lowerAddress as keyof typeof idoSnapshot];
          if (entry) {
            const { rounded, protocol } = entry;
            let computed = 0;
            if (protocol === "veFXN") {
              computed = rounded * 150;
            } else if (protocol === "veBAO") {
              computed = rounded * 0.25;
            }
            setDiscount(computed);
          } else {
            setDiscount(0);
          }

          // Fetch user total deposit
          const contractAddress = getIdoContractAddress();
          const functionSelector = "0xc084b10b"; // getUserDeposit(address)
          const userAddressParam = address.slice(2).padStart(64, "0");
          const callData = functionSelector + userAddressParam;
          const result = await window.ethereum.request({
            method: "eth_call",
            params: [{ to: contractAddress, data: callData }, "latest"],
          });
          if (
            result &&
            result !== "0x" &&
            result !==
              "0x0000000000000000000000000000000000000000000000000000000000000000"
          ) {
            setUserTotalDeposited(parseInt(result, 16) / Math.pow(10, 6));
          } else {
            setUserTotalDeposited(0);
          }
          // --- End of logic moved from child components ---
        } else {
          // Clear all data if no account connected
          setWalletAddress("");
          setDiscount(0);
          setUserTotalDeposited(0);
          setIsEligible(false);
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
        setWalletAddress("");
        setDiscount(0);
        setUserTotalDeposited(0);
        setIsEligible(false);
      }
    }
  }, []);

  // This effect will handle wallet connection and fetching all user-specific data
  useEffect(() => {
    checkWalletAndFetchData();

    const handleAccountsChanged = () => {
      checkWalletAndFetchData();
    };

    window.ethereum?.on("accountsChanged", handleAccountsChanged);

    // Refresh data periodically
    const interval = setInterval(checkWalletAndFetchData, 15000);

    return () => {
      window.ethereum?.removeListener("accountsChanged", handleAccountsChanged);
      clearInterval(interval);
    };
  }, [checkWalletAndFetchData]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#1A1A1A] to-black text-[#F5F5F5] font-sans relative">
      <SteamBackground />
      <Header
        geoClassName={geo.className}
        page="ido"
        walletAddress={walletAddress}
        isConnecting={isConnecting}
        connectWallet={connectWallet}
        disconnectWallet={disconnectWallet}
      />

      {/* Main Content */}
      <main className="relative z-10 pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid gap-3">
          {/* IDO Page Header */}
          <div className="py-8 text-center">
            <h1
              className={`text-4xl md:text-6xl font-bold text-[#4A7C59] mb-6 ${geo.className}`}
            >
              DISCOUNTED COMMUNITY SALE
            </h1>

            {/* Collaboration Partners */}
            <div className="mb-3">
              <p className="text-sm text-[#F5F5F5]/60 mb-4 uppercase tracking-wider">
                In Collaboration With
              </p>
              <div className="flex items-center justify-center gap-8">
                <div className="flex items-center gap-2 p-3 bg-[#1A1A1A]/50 border border-[#4A7C59]/20 hover:border-[#4A7C59]/40 transition-colors">
                  <Image
                    src="/bao-logo.svg"
                    alt="BAO Finance"
                    width={40}
                    height={40}
                    className="w-10 h-10"
                  />
                  <span className="text-[#F5F5F5]/80 font-medium">
                    BAO Finance
                  </span>
                </div>
                <div className="flex items-center gap-2 p-3 bg-[#1A1A1A]/50 border border-[#4A7C59]/20 hover:border-[#4A7C59]/40 transition-colors">
                  <Image
                    src="/fxn-logo.svg"
                    alt="F(x) Protocol"
                    width={40}
                    height={40}
                    className="w-10 h-10"
                  />
                  <span className="text-[#F5F5F5]/80 font-medium">
                    F(x) Protocol
                  </span>
                </div>
              </div>
            </div>
          </div>

          <IdoDashboard />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
            <IdoDeposit
              walletAddress={walletAddress}
              isEligible={isEligible}
              onSuccessfulDeposit={checkWalletAndFetchData}
              connectWallet={connectWallet}
              isConnecting={isConnecting}
            />
            <div className="flex flex-col gap-3">
              <UserAllocation
                walletAddress={walletAddress}
                discount={discount}
                userTotalDeposited={userTotalDeposited}
              />
              <UserPosition
                walletAddress={walletAddress}
                userTotalDeposited={userTotalDeposited}
              />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
