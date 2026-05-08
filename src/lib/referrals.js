export function generateReferralCode(
  wallet
) {
  if (!wallet) return "";

  return (
    wallet.slice(2, 6) +
    wallet.slice(-4)
  ).toUpperCase();
}