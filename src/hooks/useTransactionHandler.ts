import { useState } from "react";
import { Store as NotifStore } from "react-notifications-component";
import { useTransactionProvider } from "@/contexts/Transactions";

interface TransactionOptions {
  from: string;
  to: string;
  data: string;
  gas?: string;
  value?: string;
}

const useTransactionHandler = () => {
  const { addTransaction, updateTransaction } = useTransactionProvider();
  const [pendingTx, setPendingTx] = useState<string | boolean>(false);
  const [txSuccess, setTxSuccess] = useState<boolean>(false);
  const [txHash, setTxHash] = useState<string>("");
  const [txDescription, setTxDescription] = useState<string>("");

  const clearPendingTx = () => {
    setPendingTx(false);
    setTxSuccess(false);
    setTxHash("");
    setTxDescription("");
  };

  const handlePendingTx = (hash: string, description: string) => {
    addTransaction({
      hash,
      description,
    });
    setPendingTx(hash);
    setTxHash(hash);
    setTxDescription(description);

    // Show pending notification
    NotifStore.addNotification({
      title: "Transaction Sent",
      message: `${description} - Transaction pending...`,
      type: "info",
      insert: "top",
      container: "bottom-right",
      animationIn: ["animate__animated", "animate__fadeIn"],
      animationOut: ["animate__animated", "animate__fadeOut"],
      dismiss: {
        duration: 5000,
        onScreen: true,
      },
    });
  };

  const handleTx = async (
    txOptions: TransactionOptions,
    description: string,
    cb?: () => void
  ) => {
    if (!window.ethereum) {
      throw new Error("No Web3 provider found");
    }

    try {
      setPendingTx(true);

      // Send transaction
      const txHash = await window.ethereum.request({
        method: "eth_sendTransaction",
        params: [txOptions],
      });

      handlePendingTx(txHash, description);

      // Wait for transaction receipt
      let receipt = null;
      let attempts = 0;
      const maxAttempts = 60; // 3 minutes with 3-second intervals

      while (!receipt && attempts < maxAttempts) {
        await new Promise((resolve) => setTimeout(resolve, 3000));

        try {
          receipt = await window.ethereum.request({
            method: "eth_getTransactionReceipt",
            params: [txHash],
          });
          attempts++;
        } catch (error) {
          console.error("Error fetching receipt:", error);
          attempts++;
        }
      }

      if (receipt) {
        const success = receipt.status === "0x1";
        setTxSuccess(success);
        setPendingTx(false);

        // Update transaction with receipt
        updateTransaction(txHash, {
          receipt,
          status: success ? "success" : "failed",
        });

        if (success) {
          NotifStore.addNotification({
            title: "Transaction Successful",
            message: `${description} completed successfully`,
            type: "success",
            insert: "top",
            container: "bottom-right",
            animationIn: ["animate__animated", "animate__fadeIn"],
            animationOut: ["animate__animated", "animate__fadeOut"],
            dismiss: {
              duration: 7000,
              onScreen: true,
            },
          });

          if (cb) cb();
        } else {
          NotifStore.addNotification({
            title: "Transaction Failed",
            message: `${description} failed to execute`,
            type: "danger",
            insert: "top",
            container: "bottom-right",
            animationIn: ["animate__animated", "animate__fadeIn"],
            animationOut: ["animate__animated", "animate__fadeOut"],
            dismiss: {
              duration: 7000,
              onScreen: true,
            },
          });
        }
      } else {
        // Timeout - transaction might still be pending
        setPendingTx(false);
        NotifStore.addNotification({
          title: "Transaction Timeout",
          message: `${description} is taking longer than expected. Check your wallet for status.`,
          type: "warning",
          insert: "top",
          container: "bottom-right",
          animationIn: ["animate__animated", "animate__fadeIn"],
          animationOut: ["animate__animated", "animate__fadeOut"],
          dismiss: {
            duration: 10000,
            onScreen: true,
          },
        });
      }
    } catch (error: any) {
      setPendingTx(false);
      console.error("Transaction error:", error);

      let errorMessage = "Transaction failed";

      if (error?.code === 4001) {
        errorMessage = "User rejected the transaction";
      } else if (error?.message) {
        errorMessage = error.message;
      }

      NotifStore.addNotification({
        title: "Transaction Failed",
        message: errorMessage,
        type: "danger",
        insert: "top",
        container: "bottom-right",
        animationIn: ["animate__animated", "animate__fadeIn"],
        animationOut: ["animate__animated", "animate__fadeOut"],
        dismiss: {
          duration: 7000,
          onScreen: true,
        },
      });
    }
  };

  return {
    clearPendingTx,
    pendingTx,
    handleTx,
    txSuccess,
    txHash,
    txDescription,
  };
};

export default useTransactionHandler;
