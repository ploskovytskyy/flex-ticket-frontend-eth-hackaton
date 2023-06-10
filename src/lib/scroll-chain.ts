import { Chain } from "wagmi";

export const scroll = {
  id: 534353,
  name: "Scroll Alpha Testnet",
  network: "scroll_alpha_testnet",
  nativeCurrency: {
    decimals: 18,
    name: "ETH",
    symbol: "ETH",
  },
  rpcUrls: {
    public: { http: ["https://alpha-rpc.scroll.io/l2"] },
    default: { http: ["https://alpha-rpc.scroll.io/l2"] },
  },
} as const satisfies Chain;
