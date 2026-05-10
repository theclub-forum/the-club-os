import { supabase } from "./supabase";

async function propagateReferralRewards(
  wallet,
  amount,
  depth = 0
) {
  if (!wallet) return;

  // depth 0 = direct referral (30%)
  // depth 1 = indirect referral (10%)

  if (depth > 1) return;

  const { data: user } =
    await supabase
      .from("users")
      .select("referrer")
      .eq("wallet", wallet)
      .single();

  if (!user?.referrer) return;

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
    .select("points")
    .eq("wallet", user.referrer)
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
    .eq(
      "wallet",
      user.referrer
    );

  await propagateReferralRewards(
    user.referrer,
    amount,
    depth + 1
  );
}

export async function awardPoints(
  wallet,
  amount,
  options = {}
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

  const {
    questId = null,
    skipReferral = false,
  } = options;

  const { data: user } =
    await supabase
      .from("users")
      .select("*")
      .eq("wallet", wallet)
      .single();

  if (!user) return;

  const completedQuests =
    user.completed_quests ||
    {};

  // PREVENT DUPLICATE QUEST CLAIMS

  if (
    questId &&
    completedQuests[questId]
  ) {
    return Number(
      user.points || 0
    );
  }

  const updatedPoints =
    Number(user.points || 0) +
    numericAmount;

  const updatePayload = {
    points: updatedPoints,
  };

  // AUTO MARK QUEST COMPLETE

  if (questId) {
    updatePayload.completed_quests =
      {
        ...completedQuests,

        [questId]: true,
      };
  }

  await supabase
    .from("users")
    .update(updatePayload)
    .eq("wallet", wallet);

  // REFERRAL REWARDS

  if (!skipReferral) {
    await propagateReferralRewards(
      wallet,
      numericAmount
    );
  }

  return updatedPoints;
}