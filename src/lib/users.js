import { supabase } from "./supabase";

import { generateReferralCode } from "./referrals";

export async function getUser(
  wallet
) {
  const { data, error } =
    await supabase
      .from("users")
      .select("*")
      .eq("wallet", wallet)
      .maybeSingle();

  if (error) {
    console.log(error);

    return null;
  }

  return data;
}

export async function getUserByReferralCode(
  code
) {
  const { data, error } =
    await supabase
      .from("users")
      .select("*")
      .eq(
        "referral_code",
        code
      )
      .maybeSingle();

  if (error) {
    console.log(error);

    return null;
  }

  return data;
}

export async function createOrLoadUser(
  wallet,
  referralCode = null
) {
  const existing =
    await getUser(wallet);

  if (existing) {
    return {
      user: existing,
      isNew: false,
    };
  }

  let referrer = null;

  if (referralCode) {
    const referringUser =
      await getUserByReferralCode(
        referralCode
      );

    if (referringUser) {
      referrer =
        referringUser.wallet;
    }
  }

  const generatedCode =
    generateReferralCode(
      wallet
    );

  const { data, error } =
    await supabase
      .from("users")
      .insert([
        {
          wallet,

          username:
            "Unnamed Entity",

          points: 100,

          role: "Visitor",

          referral_code:
            generatedCode,

          referrer,
        },
      ])
      .select()
      .single();

  if (error) {
    console.log(error);

    return null;
  }

  return {
    user: data,
    isNew: true,
  };
}

export async function updateUsername(
  wallet,
  username
) {
  const { error } =
    await supabase
      .from("users")
      .update({
        username,
      })
      .eq("wallet", wallet);

  if (error) {
    console.log(error);
  }
}