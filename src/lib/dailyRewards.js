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

  const now = Date.now();

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

  const lastClaim =
    Number(
      user.nft_last_claim || 0
    );

  const cooldown =
    24 * 60 * 60 * 1000;

  const remaining =
    cooldown -
    (now - lastClaim);

  if (remaining > 0) {
    return {
      success: false,
      cooldown: remaining,
    };
  }

  const newPoints =
    await awardPoints(
      wallet,
      reward
    );

  await supabase
    .from("users")
    .update({
      nft_last_claim: now,
    })
    .eq("wallet", wallet);

  return {
    success: true,
    reward,
    newPoints,
  };
}