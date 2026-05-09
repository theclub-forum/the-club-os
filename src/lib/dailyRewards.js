import { supabase } from "./supabase";

import { awardPoints } from "./awardPoints";

const NFT_REWARDS = {
  "Bronze Key": 10,
  "Silver Key": 80,
  "Gold Key": 300,
  "Diamond Key": 1750,
  "Obsidian Key": 10000,
};

export function calculateDailyRewards(
  ownedNFTs = []
) {
  let total = 0;

  for (const nft of ownedNFTs) {
    total +=
      NFT_REWARDS[nft] || 0;
  }

  return total;
}

export async function claimDailyRewards({
  wallet,
  ownedNFTs,
}) {
  if (!wallet) {
    return {
      success: false,
    };
  }

  const reward =
    calculateDailyRewards(
      ownedNFTs
    );

  if (reward <= 0) {
    return {
      success: false,
    };
  }

  const { data: user } =
    await supabase
      .from("users")
      .select("*")
      .eq("wallet", wallet)
      .single();

  if (!user) {
    return {
      success: false,
    };
  }

  const now = new Date();

  const lastClaim =
    user.nft_last_claim
      ? new Date(
          user.nft_last_claim
        )
      : null;

  if (lastClaim) {
    const diff =
      now.getTime() -
      lastClaim.getTime();

    const cooldown =
      24 * 60 * 60 * 1000;

    if (diff < cooldown) {
      return {
        success: false,
        cooldown:
          cooldown - diff,
      };
    }
  }

  const newPoints =
    await awardPoints(
      wallet,
      reward
    );

  await supabase
    .from("users")
    .update({
      nft_last_claim:
        now.toISOString(),
    })
    .eq("wallet", wallet);

  return {
    success: true,
    reward,
    newPoints,
  };
}