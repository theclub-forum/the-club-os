import { getDefaultConfig } from "@rainbow-me/rainbowkit";

import {
  injectedWallet,
  metaMaskWallet,
  walletConnectWallet,
} from "@rainbow-me/rainbowkit/wallets";

import { mainnet } from "wagmi/chains";

export const config = getDefaultConfig({
  appName: "THE CLUB",

  projectId: "theclub",

  chains: [mainnet],

  wallets: [
    {
      groupName: "Recommended",
      wallets: [
        injectedWallet,
        metaMaskWallet,
        walletConnectWallet,
      ],
    },
  ],

  ssr: false,
});