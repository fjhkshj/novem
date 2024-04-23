"use client";

import React, {
  ReactNode,
  createContext, // Why isn't this used?
  useContext,
  useEffect,
  useState,
} from "react";
import { ethers } from "ethers";

declare global {
  interface Window {
    ethereum: any;
  }
}

interface EthereumProviderProps {
  children: ReactNode;
}

interface EthereumContextType {
  provider: ethers.BrowserProvider | null;
  signer: ethers.JsonRpcSigner | null;
}

const EthereumContext = React.createContext<EthereumContextType | null>(null);

export function useEthereum() {
  return useContext(EthereumContext);
}

export const EthereumProvider: React.FC<EthereumProviderProps> = ({
  children,
}) => {
  const [provider, setProvider] = useState<ethers.BrowserProvider | null>(null);
  const [signer, setSigner] = useState<ethers.JsonRpcSigner | null>(null);

  useEffect(() => {
    if (window.ethereum) {
      const newProvider = new ethers.BrowserProvider(window.ethereum);
      setProvider(newProvider);
      newProvider.getSigner().then((newSigner) => {
        setSigner(newSigner);
      });
    }
  }, []);

  return (
    <EthereumContext.Provider value={{ provider, signer }}>
      {children}
    </EthereumContext.Provider>
  );
};