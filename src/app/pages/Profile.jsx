import { useEffect, useState } from "react";

import { useAccount } from "wagmi";

import { useAppStore } from "../../store/useAppStore";

import ActivationOverlay from "../../components/ActivationOverlay";

import {
  createOrLoadUser,
  updateUsername,
} from "../../lib/users";

import { checkNFTs } from "../../lib/checkNFTs";

import {
  claimDailyRewards,
  calculateDailyRewards,
} from "../../lib/dailyRewards";

import { supabase } from "../../lib/supabase";

export default function Profile() {
  const { address } = useAccount();

  const isMobile =
    window.innerWidth <= 900;

  const {
    username,
    points,
    role,
    ownedNFTs,

    referralCode,
    referralEarnings,
    invitedUsers,

    setWallet,
    setUsername,
    setPoints,
    setOwnedNFTs,

    setReferralCode,
    setReferralEarnings,
    setInvitedUsers,
  } = useAppStore();

  const [input, setInput] =
    useState("");

  const [claiming, setClaiming] =
    useState(false);

  const [dailyAmount, setDailyAmount] =
    useState(0);

  const [rewardCooldown, setRewardCooldown] =
    useState(null);

  const [
    showActivation,
    setShowActivation,
  ] = useState(false);

  useEffect(() => {
    async function loadUser() {
      if (!address) return;

      try {
        const savedReferral =
          localStorage.getItem(
            "theclub_referral"
          );

        const result =
          await createOrLoadUser(
            address,
            savedReferral
          );

        if (!result) return;

        const { user, isNew } =
          result;

        setWallet(address);

        setUsername(
          user.username ||
            "Unnamed Entity"
        );

        setPoints(
          Number(user.points) ||
            0
        );

        setReferralCode(
          user.referral_code ||
            ""
        );

        const { data: invited } =
          await supabase
            .from("users")
            .select("*")
            .eq(
              "referrer",
              address
            );

        setInvitedUsers(
          invited || []
        );

        let earnings = 0;

        if (invited) {
          invited.forEach(
            (user) => {
              earnings += Math.floor(
                Number(
                  user.points || 0
                ) * 0.3
              );
            }
          );
        }

        setReferralEarnings(
          earnings
        );

        const owned =
          await checkNFTs(
            address
          );

        setOwnedNFTs(
          owned || []
        );

        setDailyAmount(
          calculateDailyRewards(
            owned || []
          )
        );

        if (user.nft_last_claim) {
          const lastClaim =
            new Date(
              user.nft_last_claim
            ).getTime();

          const now =
            Date.now();

          const cooldown =
            24 *
            60 *
            60 *
            1000;

          const remaining =
            cooldown -
            (now -
              lastClaim);

          if (
            remaining > 0
          ) {
            setRewardCooldown(
              remaining
            );
          }
        }

        if (
          isNew &&
          savedReferral
        ) {
          localStorage.removeItem(
            "theclub_referral"
          );
        }

        if (isNew) {
          setShowActivation(
            true
          );

          setTimeout(() => {
            setShowActivation(
              false
            );
          }, 2500);
        }
      } catch (err) {
        console.log(err);
      }
    }

    loadUser();
  }, [address]);

  async function handleClaim() {
    if (!address) return;

    setClaiming(true);

    try {
      const result =
        await claimDailyRewards({
          wallet: address,
          ownedNFTs,
        });

      if (result.success) {
        setPoints(
          result.newPoints
        );

        setRewardCooldown(
          24 *
            60 *
            60 *
            1000
        );

        alert(
          `+${result.reward} reputation added`
        );
      } else {
        if (result.cooldown) {
          setRewardCooldown(
            result.cooldown
          );

          const hours =
            Math.ceil(
              result.cooldown /
                1000 /
                60 /
                60
            );

          alert(
            `Daily rewards available in ${hours}h`
          );
        }
      }
    } catch (err) {
      console.log(err);
    }

    setClaiming(false);
  }

  async function saveUsername() {
    if (!address) return;

    try {
      await updateUsername(
        address,
        input
      );

      setUsername(input);

      setInput("");
    } catch (err) {
      console.log(err);
    }
  }

  function copyReferralLink() {
    const link = `${window.location.origin}/?ref=${referralCode}`;

    navigator.clipboard.writeText(
      link
    );

    alert(
      "Referral link copied"
    );
  }

  const rowStyle = {
    display: "flex",

    justifyContent:
      "space-between",

    alignItems:
      isMobile
        ? "flex-start"
        : "center",

    flexDirection:
      isMobile
        ? "column"
        : "row",

    gap: isMobile
      ? "10px"
      : "0",

    padding: "18px 0",

    borderBottom:
      "1px solid rgba(255,255,255,0.06)",
  };

  return (
    <>
      <ActivationOverlay
        visible={showActivation}
      />

      <div className="page">
        <div className="page-label">
          IDENTITY PROFILE
        </div>

        <h1
          className="page-title"
          style={{
            fontSize: isMobile
              ? "44px"
              : undefined,

            lineHeight: isMobile
              ? "1"
              : undefined,

            wordBreak:
              "break-word",
          }}
        >
          {username}
        </h1>

        <div
          className="terminal-card"
          style={{
            padding: isMobile
              ? "22px"
              : undefined,
          }}
        >
          <div style={rowStyle}>
            <span
              style={{
                opacity: 0.5,
                letterSpacing:
                  "2px",
                fontSize: "12px",
              }}
            >
              WALLET
            </span>

            <span
              style={{
                fontFamily:
                  "monospace",

                fontSize:
                  isMobile
                    ? "12px"
                    : undefined,

                wordBreak:
                  "break-all",
              }}
            >
              {address
                ? `${address.slice(
                    0,
                    6
                  )}...${address.slice(-4)}`
                : "NOT CONNECTED"}
            </span>
          </div>

          <div style={rowStyle}>
            <span
              style={{
                opacity: 0.5,
                letterSpacing:
                  "2px",
                fontSize: "12px",
              }}
            >
              STATUS
            </span>

            <span>{role}</span>
          </div>

          <div style={rowStyle}>
            <span
              style={{
                opacity: 0.5,
                letterSpacing:
                  "2px",
                fontSize: "12px",
              }}
            >
              REPUTATION
            </span>

            <span>
              {points} PTS
            </span>
          </div>

          <div style={rowStyle}>
            <span
              style={{
                opacity: 0.5,
                letterSpacing:
                  "2px",
                fontSize: "12px",
              }}
            >
              DAILY GENERATION
            </span>

            <span>
              +{dailyAmount} / day
            </span>
          </div>

          <div style={rowStyle}>
            <span
              style={{
                opacity: 0.5,
                letterSpacing:
                  "2px",
                fontSize: "12px",
              }}
            >
              REFERRAL CODE
            </span>

            <span
              style={{
                wordBreak:
                  "break-all",
              }}
            >
              {referralCode}
            </span>
          </div>

          <div style={rowStyle}>
            <span
              style={{
                opacity: 0.5,
                letterSpacing:
                  "2px",
                fontSize: "12px",
              }}
            >
              INVITED USERS
            </span>

            <span>
              {
                invitedUsers.length
              }
            </span>
          </div>

          <div style={rowStyle}>
            <span
              style={{
                opacity: 0.5,
                letterSpacing:
                  "2px",
                fontSize: "12px",
              }}
            >
              REFERRAL EARNINGS
            </span>

            <span>
              +
              {
                referralEarnings
              }{" "}
              PTS
            </span>
          </div>

          <div
            style={{
              marginTop: "24px",
            }}
          >
            <button
              onClick={
                copyReferralLink
              }
              className="mint-button"
              style={{
                width: "100%",

                marginBottom:
                  "24px",

                fontSize:
                  isMobile
                    ? "12px"
                    : undefined,

                letterSpacing:
                  isMobile
                    ? "2px"
                    : undefined,
              }}
            >
              COPY REFERRAL LINK
            </button>
          </div>

          <div
            style={{
              paddingTop: "24px",
            }}
          >
            <div
              style={{
                opacity: 0.5,
                fontSize: "12px",
                letterSpacing:
                  "2px",
                marginBottom:
                  "18px",
              }}
            >
              OWNED KEYS
            </div>

            {ownedNFTs.length ===
            0 ? (
              <div
                style={{
                  opacity: 0.35,
                  fontSize:
                    isMobile
                      ? "13px"
                      : undefined,
                }}
              >
                NO KEYS DETECTED
              </div>
            ) : (
              <div
                style={{
                  display: "flex",

                  flexWrap:
                    "wrap",

                  gap: "12px",
                }}
              >
                {ownedNFTs.map(
                  (nft) => (
                    <div
                      key={nft}
                      style={{
                        border:
                          "1px solid rgba(255,255,255,0.08)",

                        background:
                          "rgba(255,255,255,0.03)",

                        padding:
                          "10px 16px",

                        fontSize:
                          "12px",

                        letterSpacing:
                          "2px",

                        width:
                          isMobile
                            ? "100%"
                            : "auto",

                        textAlign:
                          "center",
                      }}
                    >
                      {nft}
                    </div>
                  )
                )}
              </div>
            )}

            <div
              style={{
                marginTop: "28px",
              }}
            >
              <button
                onClick={
                  handleClaim
                }
                disabled={
                  claiming ||
                  rewardCooldown
                }
                className="mint-button"
                style={{
                  width: "100%",

                  opacity:
                    rewardCooldown
                      ? 0.4
                      : 1,

                  cursor:
                    rewardCooldown
                      ? "not-allowed"
                      : "pointer",

                  fontSize:
                    isMobile
                      ? "12px"
                      : undefined,

                  letterSpacing:
                    isMobile
                      ? "2px"
                      : undefined,
                }}
              >
                {claiming
                  ? "PROCESSING..."
                  : rewardCooldown
                  ? "COOLDOWN"
                  : `CLAIM +${dailyAmount} PTS`}
              </button>
            </div>
          </div>
        </div>

        <div
          className="terminal-card"
          style={{
            marginTop: "40px",

            padding: isMobile
              ? "22px"
              : undefined,
          }}
        >
          <div
            style={{
              marginBottom: "20px",

              letterSpacing:
                "2px",

              fontSize: "12px",

              opacity: 0.5,
            }}
          >
            CHANGE IDENTITY
          </div>

          <input
            value={input}
            onChange={(e) =>
              setInput(
                e.target.value
              )
            }
            placeholder="ENTER ENTITY NAME"
            className="identity-input"
          />

          <button
            onClick={
              saveUsername
            }
            className="mint-button"
            style={{
              marginTop: "20px",

              fontSize:
                isMobile
                  ? "12px"
                  : undefined,

              letterSpacing:
                isMobile
                  ? "2px"
                  : undefined,
            }}
          >
            SAVE IDENTITY
          </button>
        </div>
      </div>
    </>
  );
}