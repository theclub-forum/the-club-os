import { createPublicClient,
  http } from "viem";

import { base } from "viem/chains";

import { NFT_COLLECTIONS }
  from "../config/nftConfig";

const erc721Abi = [
  {
    constant: true,

    inputs: [
      {
        name: "owner",
        type: "address",
      },
    ],

    name: "balanceOf",

    outputs: [
      {
        name: "",
        type: "uint256",
      },
    ],

    payable: false,

    stateMutability: "view",

    type: "function",
  },
];

const client =
  createPublicClient({
    chain: base,

    transport: http(),
  });

export async function checkNFTs(
  wallet
) {
  if (!wallet) return [];

  const owned = [];

  for (const nft of NFT_COLLECTIONS) {
    try {
      const balance =
        await client.readContract({
          address:
            nft.address,

          abi: erc721Abi,

          functionName:
            "balanceOf",

          args: [wallet],
        });

      if (
        Number(balance) > 0
      ) {
        owned.push(nft.name);
      }
    } catch (err) {
      console.log(
        "NFT CHECK ERROR:",
        nft.name,
        err
      );
    }
  }

  return owned;
}