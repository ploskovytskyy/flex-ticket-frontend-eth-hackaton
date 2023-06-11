import { Address, Chain } from "wagmi";

export const contracts: Record<
  Chain["network"],
  {
    address: Address;
  }
> = {
  mantle_testnet: {
    address: "0xaCdFfA501d33e05E4194D1E3f60ff9Cd618299dc",
  },
  scroll_alpha_testnet: {
    address: "0xe77F854696FE6F7028937b673e051fDD41019c15",
  },
  goerli: {
    address: "0x5E728787a7aEFFe2e6516EA33172CCae84CA9c15",
  },
  "evmos-testnet": {
    address: "0x84576AF4b7d1279e1f7BB8e0b771B77C591760F3",
  },
};
