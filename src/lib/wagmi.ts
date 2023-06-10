import { configureChains, createConfig } from "wagmi";
import { goerli, evmosTestnet } from "wagmi/chains";
import { MetaMaskConnector } from "wagmi/connectors/metaMask";
import { WalletConnectConnector } from "wagmi/connectors/walletConnect";

import { publicProvider } from "wagmi/providers/public";
import { mantle } from "./mantle-chain";
import { scroll } from "./scroll-chain";

const walletConnectProjectId = "34728813447c5e117bf95089c4d87510";

const { chains, publicClient, webSocketPublicClient } = configureChains(
  [
    goerli,
    mantle,
    scroll,
    evmosTestnet,
    // ...(process.env.NODE_ENV === "development" ? [goerli] : []),
  ],
  [publicProvider()]
);

export const config = createConfig({
  autoConnect: true,
  connectors: [
    new MetaMaskConnector({ chains }),
    new WalletConnectConnector({
      chains,
      options: {
        projectId: walletConnectProjectId,
      },
    }),
  ],
  publicClient,
  webSocketPublicClient,
});
