"use client";
import { useState, useEffect } from "react";
import IdoDashboard from "@/components/IdoDashboard";
import IdoDeposit from "@/components/IdoDeposit";
import Header from "@/components/Header";
import SteamBackground from "@/components/SteamBackground";
import NotificationWrapper from "@/components/NotificationWrapper";
import UserAllocation from "@/components/UserAllocation";
import { FUNCTION_SELECTORS, getIdoContractAddress } from "@/config/contracts";

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
  const [userDiscount, setUserDiscount] = useState<number>(0);
  const [userDeposited, setUserDeposited] = useState<number>(0);

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
              let steamAllocation = 0;
              if (userData.protocol === "veBAO") {
                steamAllocation = userData.rounded * 0.25;
              } else if (userData.protocol === "veFXN") {
                steamAllocation = userData.rounded * 1000;
              } else {
                steamAllocation = userData.rounded;
              }
              setUserDiscount(steamAllocation);
            } else {
              // User is whitelisted but no snapshot data
              setIsEligible(true);
              setUserDiscount(0);
            }
          } else {
            // User not in whitelist
            setIsEligible(false);
            setUserDiscount(0);
          }

          // always fetch current deposit value
          await fetchUserDeposit(address);
        } else {
          // No account connected
          setWalletAddress("");
          setIsEligible(false);
          setUserDiscount(0);
          setUserDeposited(0);
        }
      }
    } catch (error) {
      console.error("Error checking wallet:", error);
      setWalletAddress("");
      setIsEligible(false);
      setUserDiscount(0);
      setUserDeposited(0);
    }
  };

  // Fetch deposited USDC amount for user from IDO contract
  const fetchUserDeposit = async (address: string) => {
    try {
      if (typeof window === "undefined" || !window.ethereum) return;

      const contractAddress = getIdoContractAddress();
      const selector = FUNCTION_SELECTORS.GET_USER_DEPOSIT; // getUserDeposit(address)

      // encode address parameter
      const addrParam = address.slice(2).padStart(64, "0");
      const data = `${selector}${addrParam}`;

      const result = await window.ethereum.request({
        method: "eth_call",
        params: [
          {
            to: contractAddress,
            data,
          },
          "latest",
        ],
      });

      if (result && result !== "0x") {
        const weiVal = BigInt(result);
        const usdcVal = Number(weiVal) / 1e6; // 6 decimals
        setUserDeposited(usdcVal);
      } else {
        setUserDeposited(0);
      }
    } catch (err) {
      console.error("Error fetching user deposit:", err);
      setUserDeposited(0);
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
          checkWalletAndFetchData();
          if (accounts[0]) fetchUserDeposit(accounts[0]);
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
              onSuccessfulDeposit={() => {
                checkWalletAndFetchData();
                if (walletAddress) fetchUserDeposit(walletAddress);
              }}
              connectWallet={connectWallet}
              isConnecting={isConnecting}
            />

            <div className="flex flex-col h-full">
              <UserAllocation
                discount={userDiscount}
                userTotalDeposited={userDeposited}
                walletAddress={walletAddress}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
