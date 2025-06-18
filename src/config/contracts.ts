// Contract Configuration
// Easy switching between test and live contracts

export const CONTRACTS = {
  // USDC contract address on Ethereum mainnet
  USDC: "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48",

  // IDO Contract addresses
  IDO: {
    // Test contract (currently active)
    TEST: "0x4d5bb90ef6dae6c587c9accc3409fafcf33f7004",

    // Live contract (update when ready to go live)
    LIVE: "0xa21136acd34cbbc2b795da091de6a254ba1f6b40", // Update this when deploying live contract
  },
};

// Environment flag to control which contract to use
// Set to 'LIVE' when ready to go live
export const CONTRACT_MODE: "TEST" | "LIVE" = "LIVE";

// Get the current IDO contract address based on mode
export const getIdoContractAddress = (): string => {
  return CONTRACTS.IDO[CONTRACT_MODE];
};

// Helper to check if we're using test contract
export const isTestMode = (): boolean => {
  return false;
};

// Display name for current mode (for UI indicators)
export const getContractModeDisplay = (): string => {
  return "Live Contract";
};

// Function selectors for contract interactions
export const FUNCTION_SELECTORS = {
  // Write functions
  DEPOSIT: "0x35ac79c3", // deposit(uint256 amount, bytes32[] proof)

  // Read functions
  GET_USER_DEPOSIT: "0xc084b10b", // getUserDeposit(address)
  TOTAL_DEPOSITED: "0xff50abdc", // totalDeposited()
  TOTAL_DEPOSITORS: "0x418f3128", // totalDepositors()
  SALE_START: "0xbe9a6555", // start()
  SALE_END: "0xefbe1c1c", // end()
  IS_SALE_ACTIVE: "0x564566a8", // isSaleActive()
};
