"use client";
import { useState, useEffect } from "react";
import { geo } from "@/utils/fonts";
import useTransactionHandler from "@/hooks/useTransactionHandler";
import { useTxReceiptUpdater } from "@/contexts/Transactions";
import DepositSuccessPopup from "@/components/DepositSuccessPopup";
import {
  CONTRACTS,
  getIdoContractAddress,
  FUNCTION_SELECTORS,
} from "@/config/contracts";
import idoAddresses from "@/data/ido_addresses.json";

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

interface IdoDepositProps {
  walletAddress: string;
  isEligible: boolean;
  onSuccessfulDeposit: () => void;
  connectWallet: () => Promise<void>;
  isConnecting: boolean;
}

export default function IdoDeposit({
  walletAddress,
  isEligible,
  onSuccessfulDeposit,
  connectWallet,
  isConnecting,
}: IdoDepositProps) {
  const [usdcBalance, setUsdcBalance] = useState<string>("0");
  const [usdcAllowance, setUsdcAllowance] = useState<string>("0");
  const [depositAmount, setDepositAmount] = useState<string>("");
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const [lastDepositDetails, setLastDepositDetails] = useState<{
    amount: number;
    steamTokens: number;
  } | null>(null);

  // Transaction handler
  const { handleTx, pendingTx } = useTransactionHandler();
  const isApproving = typeof pendingTx === "string" || pendingTx === true;

  // Refresh balances after transactions complete
  useTxReceiptUpdater(async () => {
    if (walletAddress) {
      await fetchUSDCBalance(walletAddress);
      await fetchUSDCAllowance(walletAddress);
    }
  });

  // Fetch USDC balance
  const fetchUSDCBalance = async (address: string) => {
    try {
      if (!window.ethereum) return;
      const data = `0x70a08231000000000000000000000000${address.slice(2)}`;
      const result = await window.ethereum.request({
        method: "eth_call",
        params: [{ to: CONTRACTS.USDC, data: data }, "latest"],
      });
      if (result) {
        const balanceWei = parseInt(result, 16);
        const balanceUSDC = balanceWei / Math.pow(10, 6);
        setUsdcBalance(balanceUSDC.toString());
      }
    } catch (error) {
      console.error("Error fetching USDC balance:", error);
      setUsdcBalance("0");
    }
  };

  // Fetch USDC allowance for IDO contract
  const fetchUSDCAllowance = async (address: string) => {
    try {
      if (!window.ethereum) return;
      const contractAddress = getIdoContractAddress();

      // allowance(address owner, address spender) -> 0xdd62ed3e
      const ownerParam = address.slice(2).padStart(64, "0");
      const spenderParam = contractAddress.slice(2).padStart(64, "0");
      const data = `0xdd62ed3e${ownerParam}${spenderParam}`;

      const result = await window.ethereum.request({
        method: "eth_call",
        params: [{ to: CONTRACTS.USDC, data: data }, "latest"],
      });

      if (result) {
        const allowanceWei = parseInt(result, 16);
        const allowanceUSDC = allowanceWei / Math.pow(10, 6);
        setUsdcAllowance(allowanceUSDC.toString());
        console.log(`USDC allowance for IDO contract: ${allowanceUSDC} USDC`);
      }
    } catch (error) {
      console.error("Error fetching USDC allowance:", error);
      setUsdcAllowance("0");
    }
  };

  useEffect(() => {
    if (walletAddress) {
      fetchUSDCBalance(walletAddress);
      fetchUSDCAllowance(walletAddress);
    } else {
      setUsdcBalance("0");
      setUsdcAllowance("0");
    }
  }, [walletAddress]);

  const handleApprove = async () => {
    if (!walletAddress || !window.ethereum) return;

    try {
      const contractAddress = getIdoContractAddress();
      const maxApproval =
        "ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff";
      const data = `0x095ea7b3${contractAddress
        .slice(2)
        .padStart(64, "0")}${maxApproval}`;

      console.log(`Approving IDO contract ${contractAddress} to spend USDC`);

      await handleTx(
        {
          from: walletAddress,
          to: CONTRACTS.USDC,
          data: data,
          gas: "0x15F90", // 90,000 gas limit for approval
        },
        "USDC Approval",
        async () => {
          // Callback executed on success
          await fetchUSDCAllowance(walletAddress);
        }
      );
    } catch (error: any) {
      console.error("Failed to approve USDC:", error);
    }
  };

  // Generate merkle proof for user address (client-side only)
  const generateMerkleProof = async (
    userAddress: string
  ): Promise<string[]> => {
    // Only run on client side
    if (typeof window === "undefined") {
      console.warn("Merkle proof generation only available on client side");
      return [];
    }

    try {
      // Dynamic imports to avoid server-side issues
      const { MerkleTree } = await import("merkletreejs");
      const keccak256 = (await import("keccak256")).default;

      // Normalize all addresses to lowercase and ensure they start with 0x
      const normalizedAddresses = idoAddresses.map((addr) =>
        addr.toLowerCase().startsWith("0x")
          ? addr.toLowerCase()
          : `0x${addr.toLowerCase()}`
      );

      // Create leaves by hashing each address
      const leaves = normalizedAddresses.map((addr) => keccak256(addr));

      // Build the merkle tree
      const tree = new MerkleTree(leaves, keccak256, { sortPairs: true });

      // Normalize the user address
      const normalizedUserAddress = userAddress.toLowerCase().startsWith("0x")
        ? userAddress.toLowerCase()
        : `0x${userAddress.toLowerCase()}`;

      // Generate proof for the user's address
      const leaf = keccak256(normalizedUserAddress);
      const proof = tree.getHexProof(leaf);

      console.log("Merkle tree root:", tree.getHexRoot());
      console.log(`Generated proof for ${normalizedUserAddress}:`, proof);
      console.log(
        `Proof verification:`,
        tree.verify(proof, leaf, tree.getRoot())
      );

      return proof;
    } catch (error) {
      console.error("Error generating merkle proof:", error);
      console.warn(
        "Falling back to empty proof - transaction will likely fail"
      );
      return [];
    }
  };

  const handleDeposit = async () => {
    if (!walletAddress || !window.ethereum) return;

    // Check eligibility first
    if (!isEligible) {
      alert(
        "You need a veBAO or veFXN position to be eligible for the community sale. Eligibility is updated daily."
      );
      return;
    }

    try {
      const contractAddress = getIdoContractAddress();
      const amountInWei = Math.floor(
        parseFloat(depositAmount) * Math.pow(10, 6)
      ); // Convert to 6-decimal USDC format

      // Generate merkle proof for the user
      const proof = await generateMerkleProof(walletAddress.toLowerCase());

      console.log(
        `Depositing ${depositAmount} USDC (${amountInWei} wei) to contract ${contractAddress}`
      );
      console.log("Merkle proof:", proof);

      // Encode deposit function call: deposit(uint256 amount, bytes32[] proof)
      const amountHex = amountInWei.toString(16).padStart(64, "0");

      // Encode the proof array (bytes32[])
      // Offset to where array data starts (after amount parameter)
      const arrayOffset =
        "0000000000000000000000000000000000000000000000000000000000000040"; // 64 bytes

      // Array length
      const arrayLength = proof.length.toString(16).padStart(64, "0");

      // Array elements (each proof element is 32 bytes)
      const proofData = proof
        .map((p: string) => p.replace("0x", "").padStart(64, "0"))
        .join("");

      const callData =
        FUNCTION_SELECTORS.DEPOSIT +
        amountHex +
        arrayOffset +
        arrayLength +
        proofData;

      await handleTx(
        {
          from: walletAddress,
          to: contractAddress,
          data: callData,
          gas: "0x493E0", // 300,000 gas limit (higher for merkle proof verification)
        },
        `Deposit ${depositAmount} USDC`,
        async () => {
          // Callback executed on success
          const depositAmountNum = parseFloat(depositAmount);
          const steamTokens = depositAmountNum * 12.5; // $0.08 per token = 12.5 tokens per dollar

          // Set deposit details for popup
          setLastDepositDetails({
            amount: depositAmountNum,
            steamTokens: steamTokens,
          });

          // Show success popup
          setShowSuccessPopup(true);

          // Refresh balances
          await fetchUSDCBalance(walletAddress);
          await fetchUSDCAllowance(walletAddress);
          setDepositAmount("");

          // Call the onSuccessfulDeposit callback
          onSuccessfulDeposit();
        }
      );
    } catch (error: any) {
      console.error("Failed to deposit:", error);
    }
  };

  const parsedAmount = parseFloat(depositAmount || "0");
  const hasEnoughBalance = parsedAmount <= parseFloat(usdcBalance);
  const isApproved = parsedAmount <= parseFloat(usdcAllowance);

  if (!walletAddress) {
    return (
      <div className="bg-[#1A1A1A]/90 border border-[#4A7C59]/20 p-8">
        <div className="text-center space-y-6">
          <div className="w-16 h-16 mx-auto bg-[#4A7C59]/20 flex items-center justify-center">
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
                d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
              />
            </svg>
          </div>
          <div>
            <h3
              className={`text-2xl font-bold mb-2 text-[#4A7C59] ${geo.className}`}
            >
              CONNECT WALLET
            </h3>
            <p className="text-[#F5F5F5]/80 mb-6">
              Connect your Web3 wallet to participate in the Zhenglong IDO
            </p>
          </div>
          <button
            onClick={connectWallet}
            disabled={isConnecting}
            className={`py-4 px-8 bg-[#4A7C59] hover:bg-[#5A8B69] disabled:bg-[#4A7C59]/50 text-white font-bold tracking-wider uppercase transition-colors ${
              geo.className
            } ${isConnecting ? "animate-pulse" : ""}`}
          >
            {isConnecting ? "Connecting..." : "Connect Wallet"}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#1A1A1A]/90 border border-[#4A7C59]/20 p-8">
      <div className="space-y-6">
        <div className="text-center">
          <h3 className={`text-3xl font-bold text-[#4A7C59] ${geo.className}`}>
            DEPOSIT USDC
          </h3>
          <div className="mt-2 flex items-center justify-center gap-3 text-sm">
            <span className="text-[#F5F5F5]/60">
              Connected: {walletAddress.slice(0, 6)}...{walletAddress.slice(-4)}
            </span>
            <span
              className={`inline-flex items-center gap-1 px-3 py-1 text-xs font-bold tracking-wider uppercase border ${
                geo.className
              } ${
                isEligible
                  ? "text-[#4A7C59] border-[#4A7C59]/30 bg-[#4A7C59]/10"
                  : "text-red-400 border-red-400/30 bg-red-400/10"
              }`}
            >
              {isEligible ? "✓ ELIGIBLE" : "✗ NOT ELIGIBLE"}
            </span>
          </div>
        </div>

        {isEligible ? (
          <>
            <div>
              <label className="block text-sm font-bold mb-2 text-[#F5F5F5]/80">
                Amount (USDC)
              </label>
              <input
                type="number"
                step="0.01"
                min="0"
                value={depositAmount}
                onChange={(e) => setDepositAmount(e.target.value)}
                placeholder="Enter amount"
                className="w-full p-4 bg-[#1A1A1A] border border-[#4A7C59]/30 text-[#F5F5F5] focus:border-[#4A7C59] focus:outline-none"
              />
              <div className="space-y-1 text-sm text-[#F5F5F5]/60 mt-2">
                <div className="flex justify-between">
                  <span>
                    Balance: {parseFloat(usdcBalance).toFixed(2)} USDC
                  </span>
                  <button
                    onClick={() => setDepositAmount(usdcBalance)}
                    className="text-[#4A7C59] hover:text-[#5A8B69] transition-colors"
                  >
                    Max
                  </button>
                </div>
                <div className="flex justify-between">
                  <span>
                    Approved:{" "}
                    {(() => {
                      const allowance = parseFloat(usdcAllowance);
                      // Check if allowance is very large (max approval)
                      if (allowance > 1e15) {
                        return "Unlimited";
                      }
                      return `${allowance.toFixed(2)} USDC`;
                    })()}
                  </span>
                  <span
                    className={`text-xs ${
                      isApproved ? "text-green-400" : "text-red-400"
                    }`}
                  >
                    {isApproved ? "✓ Sufficient" : "⚠ Need approval"}
                  </span>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              {/* Additional Info */}
              <div className="text-xs text-center text-[#F5F5F5]/60 space-y-1 pt-2">
                <div>• Tokens distributed at TGE (Token Generation Event)</div>
                <div>• Unused funds returned after sale concludes</div>
              </div>

              {!hasEnoughBalance ? (
                <button
                  disabled={true}
                  className={`w-full py-4 px-6 bg-red-600/50 text-white font-bold tracking-wider uppercase transition-colors cursor-not-allowed ${geo.className}`}
                >
                  Insufficient Balance
                </button>
              ) : !isApproved ? (
                <button
                  onClick={handleApprove}
                  disabled={isApproving || parsedAmount <= 0}
                  className={`w-full py-4 px-6 bg-[#4A7C59] hover:bg-[#5A8B69] disabled:bg-[#4A7C59]/50 text-white font-bold tracking-wider uppercase transition-colors ${geo.className}`}
                >
                  {isApproving ? "Approving..." : "Approve USDC"}
                </button>
              ) : (
                <button
                  onClick={handleDeposit}
                  disabled={isApproving || parsedAmount <= 0 || !isEligible}
                  className={`w-full py-4 px-6 bg-[#4A7C59] hover:bg-[#5A8B69] disabled:bg-[#4A7C59]/50 text-white font-bold tracking-wider uppercase transition-colors ${geo.className}`}
                >
                  {isApproving ? "Depositing..." : "Deposit USDC"}
                </button>
              )}
            </div>
          </>
        ) : (
          <div className="bg-[#4A7C59]/10 border border-[#4A7C59]/30 p-6 text-center">
            <p className="text-[#4A7C59] text-sm font-semibold mb-2">
              You need a veBAO or veFXN position to be eligible for the
              community sale.
            </p>
            <p className="text-[#F5F5F5]/80 text-xs">
              Eligibility is updated daily. If you acquire veBAO or veFXN
              tokens, check back tomorrow.
            </p>
          </div>
        )}
      </div>

      {/* Success Popup */}
      {lastDepositDetails && (
        <DepositSuccessPopup
          isOpen={showSuccessPopup}
          onClose={() => setShowSuccessPopup(false)}
          depositAmount={lastDepositDetails.amount}
          steamTokens={lastDepositDetails.steamTokens}
          walletAddress={walletAddress}
        />
      )}
    </div>
  );
}
