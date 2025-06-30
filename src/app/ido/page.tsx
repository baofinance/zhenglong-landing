"use client";
import { useState, useEffect } from "react";
import IdoDashboard from "@/components/IdoDashboard";
import IdoDeposit from "@/components/IdoDeposit";
import Header from "@/components/Header";
import SteamBackground from "@/components/SteamBackground";
import NotificationWrapper from "@/components/NotificationWrapper";

// Import real data
import idoAddresses from "@/data/ido_addresses.json";
import idoSnapshot from "@/data/ido_snapshot_normalized.json";

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

export default function IdoPage() {
  const [walletAddress, setWalletAddress] = useState<string>("");
  const [isEligible, setIsEligible] = useState<boolean>(false);
  const [isConnecting, setIsConnecting] = useState<boolean>(false);

  // Check wallet connection and fetch user data
  const checkWalletAndFetchData = async () => {
    try {
      if (typeof window !== "undefined" && window.ethereum) {
        const accounts = await window.ethereum.request({
          method: "eth_accounts",
        });

        if (accounts && accounts.length > 0) {
          const address = accounts[0];
          setWalletAddress(address);

          // Check if user is in the whitelist
          const normalizedAddresses = idoAddresses.map((addr) =>
            addr.toLowerCase().startsWith("0x")
              ? addr.toLowerCase()
              : `0x${addr.toLowerCase()}`
          );

          const userAddressLower = address.toLowerCase();
          const isWhitelisted = normalizedAddresses.includes(userAddressLower);

          if (isWhitelisted) {
            // Find user data in snapshot
            const userData = (
              idoSnapshot as Record<
                string,
                { raw: string; rounded: number; protocol: string }
              >
            )[userAddressLower];

            if (userData) {
              setIsEligible(true);
            } else {
              // User is whitelisted but no snapshot data
              setIsEligible(true);
            }
          } else {
            // User not in whitelist
            setIsEligible(false);
          }
        } else {
          // No account connected
          setWalletAddress("");
          setIsEligible(false);
        }
      }
    } catch (error) {
      console.error("Error checking wallet:", error);
      setWalletAddress("");
      setIsEligible(false);
    }
  };

  // Connect wallet function
  const connectWallet = async () => {
    try {
      setIsConnecting(true);
      if (typeof window !== "undefined" && window.ethereum) {
        const accounts = await window.ethereum.request({
          method: "eth_requestAccounts",
        });

        if (accounts && accounts.length > 0) {
          await checkWalletAndFetchData();
        }
      }
    } catch (error) {
      console.error("Error connecting wallet:", error);
    } finally {
      setIsConnecting(false);
    }
  };

  // Listen for account changes
  useEffect(() => {
    if (typeof window !== "undefined" && window.ethereum) {
      const handleAccountsChanged = (accounts: any[]) => {
        if (accounts.length === 0) {
          // User disconnected wallet
          setWalletAddress("");
          setIsEligible(false);
        } else {
          // Account changed, refresh data
          checkWalletAndFetchData();
        }
      };

      window.ethereum.on("accountsChanged", handleAccountsChanged);

      // Initial check
      checkWalletAndFetchData();

      return () => {
        window.ethereum?.removeListener(
          "accountsChanged",
          handleAccountsChanged
        );
      };
    }
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#1A1A1A] to-black text-[#F5F5F5] font-sans relative">
      <NotificationWrapper />
      <SteamBackground />
      <Header
        page="ido"
        walletAddress={walletAddress}
        connectWallet={connectWallet}
        disconnectWallet={() => {
          setWalletAddress("");
          setIsEligible(false);
        }}
      />

      <div className="container mx-auto px-6 py-8 pt-24">
        <div className="flex flex-col gap-4">
          <IdoDashboard />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <IdoDeposit
              walletAddress={walletAddress}
              isEligible={isEligible}
              onSuccessfulDeposit={checkWalletAndFetchData}
              connectWallet={connectWallet}
              isConnecting={isConnecting}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
