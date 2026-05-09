import { supabase } from "./supabase";

async function propagateReferralRewards(
  wallet,
  amount,
  depth = 0
) {
  if (!wallet) return;

  // ONLY 2 LEVELS
  // depth 0 = direct referral (30%)
  // depth 1 = indirect referral (10%)
  // depth 2+ = stop

  if (depth > 1) return;

  const { data: user } =
    await supabase
      .from("users")
      .select("*")
      .eq("wallet", wallet)
      .single();

  if (!user) return;

  const referrer =
    user.referrer;

  if (!referrer) return;

  const percentage =
    depth === 0 ? 0.3 : 0.1;

  const reward = Math.floor(
    Number(amount) * percentage
  );

  if (reward <= 0) return;

  const {
    data: referrerUser,
  } = await supabase
    .from("users")
    .select("*")
    .eq("wallet", referrer)
    .single();

  if (!referrerUser) return;

  const updatedPoints =
    Number(
      referrerUser.points || 0
    ) + reward;

  await supabase
    .from("users")
    .update({
      points: updatedPoints,
    })
    .eq("wallet", referrer);

  // propagate upward
  await propagateReferralRewards(
    referrer,
    amount,
    depth + 1
  );
}

export async function awardPoints(
  wallet,
  amount
) {
  if (!wallet) return;

  const numericAmount =
    Number(amount);

  if (
    isNaN(numericAmount) ||
    numericAmount <= 0
  ) {
    return;
  }

  const { data: user } =
    await supabase
      .from("users")
      .select("*")
      .eq("wallet", wallet)
      .single();

  if (!user) return;

  const updatedPoints =
    Number(user.points || 0) +
    numericAmount;

  await supabase
    .from("users")
    .update({
      points: updatedPoints,
    })
    .eq("wallet", wallet);

  // referral rewards
  await propagateReferralRewards(
    wallet,
    numericAmount
  );

  return updatedPoints;
}