import { useState, useEffect } from "react";
import { usePublicClient } from "wagmi";
import { formatUnits } from "viem";
import { markets } from "../config/contracts";
import type { PriceDataPoint } from "../config/contracts";

// Chainlink aggregator ABI for historical price data
const aggregatorV3ABI = [
  {
    inputs: [{ name: "roundId", type: "uint80" }],
    name: "getRoundData",
    outputs: [
      { name: "roundId", type: "uint80" },
      { name: "answer", type: "int256" },
      { name: "startedAt", type: "uint256" },
      { name: "updatedAt", type: "uint256" },
      { name: "answeredInRound", type: "uint80" },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "latestRoundData",
    outputs: [
      { name: "roundId", type: "uint80" },
      { name: "answer", type: "int256" },
      { name: "startedAt", type: "uint256" },
      { name: "updatedAt", type: "uint256" },
      { name: "answeredInRound", type: "uint80" },
    ],
    stateMutability: "view",
    type: "function",
  },
] as const;

const ROUNDS_TO_FETCH = 100; // Number of historical price points to fetch

export function useOraclePriceHistory(marketId: string) {
  const [priceHistory, setPriceHistory] = useState<PriceDataPoint[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const publicClient = usePublicClient();

  useEffect(() => {
    async function fetchOraclePriceHistory() {
      setIsLoading(true);
      try {
        // Get latest round data
        const latestRound = await publicClient.readContract({
          address: markets[marketId].addresses.priceOracle as `0x${string}`,
          abi: aggregatorV3ABI,
          functionName: "latestRoundData",
        });

        const pricePoints: PriceDataPoint[] = [];
        const latestRoundId = Number(latestRound[0]);

        // Fetch historical rounds
        for (let i = 0; i < ROUNDS_TO_FETCH; i++) {
          const roundId = latestRoundId - i;
          if (roundId <= 0) break;

          try {
            const roundData = await publicClient.readContract({
              address: markets[marketId].addresses.priceOracle as `0x${string}`,
              abi: aggregatorV3ABI,
              functionName: "getRoundData",
              args: [BigInt(roundId)],
            });

            const price = Number(formatUnits(roundData[1], 8)); // Chainlink prices typically have 8 decimals
            const timestamp = Number(roundData[3]);

            pricePoints.push({
              timestamp,
              price,
              type: "oracle",
              tokenAmount: BigInt(0),
              collateralAmount: BigInt(0),
            });
          } catch (error) {
            console.warn(`Failed to fetch round ${roundId}:`, error);
            continue;
          }
        }

        setPriceHistory(pricePoints.sort((a, b) => a.timestamp - b.timestamp));
      } catch (error) {
        console.error("Error fetching oracle price history:", error);
        setPriceHistory([]);
      } finally {
        setIsLoading(false);
      }
    }

    fetchOraclePriceHistory();
  }, [marketId, publicClient]);

  return {
    priceHistory,
    isLoading,
  };
}
