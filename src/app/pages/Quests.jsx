import { useEffect, useState } from "react";

import { useAccount } from "wagmi";

import { useAppStore } from "../../store/useAppStore";

import ActivationOverlay from "../../components/ActivationOverlay";

import {
  supabase,
} from "../../lib/supabase";

import { awardPoints } from "../../lib/awardPoints";

export default function Quests() {
  const { address } =
    useAccount();

  const {
    username,
    points,
    role,

    setPoints,
  } = useAppStore();

  const [
    showReward,
    setShowReward,
  ] = useState(false);

  const [
    rewardAmount,
    setRewardAmount,
  ] = useState(0);

  const [
    dailyCooldown,
    setDailyCooldown,
  ] = useState(false);

  const [
    quests,
    setQuests,
  ] = useState({
    connect: false,
    daily: false,
    name: false,
  });

  const [
    claimed,
    setClaimed,
  ] = useState({
    connect: false,
    daily: false,
    name: false,
  });

  useEffect(() => {
    async function loadQuestState() {
      if (!address) return;

      const { data: user } =
        await supabase
          .from("users")
          .select("*")
          .eq("wallet", address)
          .single();

      if (!user) return;

      const completed =
        user.completed_quests ||
        {};

      const lastDaily =
        user.daily_claim_at;

      let dailyReady = true;

      if (lastDaily) {
        const last =
          new Date(lastDaily);

        const now =
          new Date();

        const diff =
          now - last;

        const hours =
          diff /
          1000 /
          60 /
          60;

        if (hours < 24) {
          dailyReady = false;
        }
      }

      setDailyCooldown(
        !dailyReady
      );

      setClaimed({
        connect:
          completed.connect ||
          false,

        daily: false,

        name:
          completed.name ||
          false,
      });

      if (address) {
        setQuests((prev) => ({
          ...prev,
          connect: true,
        }));
      }

      if (
        username &&
        username !==
          "Unnamed Entity"
      ) {
        setQuests((prev) => ({
          ...prev,
          name: true,
        }));
      }

      setQuests((prev) => ({
        ...prev,
        daily: true,
      }));
    }

    loadQuestState();
  }, [address, username]);

  async function rewardQuest(
    type,
    amount
  ) {
    if (!address) return;

    if (
      type === "daily" &&
      dailyCooldown
    )
      return;

    if (
      type !== "daily" &&
      claimed[type]
    )
      return;

    try {
      const updatedPoints =
        await awardPoints(
          address,
          amount
        );

      const newClaimed = {
        ...claimed,
      };

      if (
        type !== "daily"
      ) {
        newClaimed[type] =
          true;
      }

      await supabase
        .from("users")
        .update({
          completed_quests:
            newClaimed,

          daily_claim_at:
            type === "daily"
              ? new Date().toISOString()
              : undefined,
        })
        .eq("wallet", address);

      setPoints(
        updatedPoints
      );

      setClaimed(
        newClaimed
      );

      if (
        type === "daily"
      ) {
        setDailyCooldown(
          true
        );
      }

      setRewardAmount(
        amount
      );

      setShowReward(true);

      setTimeout(() => {
        setShowReward(
          false
        );
      }, 2500);
    } catch (err) {
      console.log(err);
    }
  }

  function renderStatus(
    type,
    amount
  ) {
    if (
      type === "daily" &&
      dailyCooldown
    ) {
      return (
        <div
          style={{
            opacity: 0.4,

            letterSpacing:
              "2px",
          }}
        >
          COOLDOWN
        </div>
      );
    }

    if (claimed[type]) {
      return (
        <div
          style={{
            opacity: 0.4,

            letterSpacing:
              "2px",
          }}
        >
          COMPLETED
        </div>
      );
    }

    if (quests[type]) {
      return (
        <button
          onClick={() =>
            rewardQuest(
              type,
              amount
            )
          }
          className="mint-button"
        >
          COLLECT
        </button>
      );
    }

    return (
      <div
        style={{
          opacity: 0.4,
        }}
      >
        INACTIVE
      </div>
    );
  }

  return (
    <>
      <ActivationOverlay
        visible={showReward}
        amount={rewardAmount}
      />

      <div className="page">
        <div className="page-label">
          QUEST SYSTEM
        </div>

        <h1 className="page-title">
          Operational Tasks
        </h1>

        <div className="terminal-card">
          <div
            style={{
              display: "flex",
              justifyContent:
                "space-between",
              padding: "18px 0",
              borderBottom:
                "1px solid rgba(255,255,255,0.06)",
            }}
          >
            <span
              style={{
                opacity: 0.5,
                letterSpacing:
                  "2px",
                fontSize: "12px",
              }}
            >
              ENTITY
            </span>

            <span>
              {username}
            </span>
          </div>

          <div
            style={{
              display: "flex",
              justifyContent:
                "space-between",
              padding: "18px 0",
              borderBottom:
                "1px solid rgba(255,255,255,0.06)",
            }}
          >
            <span
              style={{
                opacity: 0.5,
                letterSpacing:
                  "2px",
                fontSize: "12px",
              }}
            >
              RANK
            </span>

            <span>
              {role}
            </span>
          </div>

          <div
            style={{
              display: "flex",
              justifyContent:
                "space-between",
              padding: "18px 0",
            }}
          >
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
        </div>

        <div
          style={{
            marginTop: "50px",
          }}
        >
          <div
            className="section-label"
            style={{
              marginBottom: "34px",
            }}
          >
            ACTIVE QUESTS
          </div>

          <div
            className="terminal-card"
            style={{
              marginBottom:
                "24px",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent:
                  "space-between",
                alignItems:
                  "center",
              }}
            >
              <div>
                <div
                  style={{
                    fontSize:
                      "18px",
                    marginBottom:
                      "8px",
                  }}
                >
                  CONNECT WALLET
                </div>

                <div
                  style={{
                    opacity: 0.5,
                    fontSize:
                      "13px",
                  }}
                >
                  Reward:
                  +100 Reputation
                </div>
              </div>

              {renderStatus(
                "connect",
                100
              )}
            </div>
          </div>

          <div
            className="terminal-card"
            style={{
              marginBottom:
                "24px",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent:
                  "space-between",
                alignItems:
                  "center",
              }}
            >
              <div>
                <div
                  style={{
                    fontSize:
                      "18px",
                    marginBottom:
                      "8px",
                  }}
                >
                  DAILY CHECK-IN
                </div>

                <div
                  style={{
                    opacity: 0.5,
                    fontSize:
                      "13px",
                  }}
                >
                  Reward:
                  +10 Reputation
                </div>
              </div>

              {renderStatus(
                "daily",
                10
              )}
            </div>
          </div>

          <div className="terminal-card">
            <div
              style={{
                display: "flex",
                justifyContent:
                  "space-between",
                alignItems:
                  "center",
              }}
            >
              <div>
                <div
                  style={{
                    fontSize:
                      "18px",
                    marginBottom:
                      "8px",
                  }}
                >
                  CHANGE NAME
                </div>

                <div
                  style={{
                    opacity: 0.5,
                    fontSize:
                      "13px",
                  }}
                >
                  Reward:
                  +20 Reputation
                </div>
              </div>

              {renderStatus(
                "name",
                20
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}