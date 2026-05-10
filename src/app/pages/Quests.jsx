import { useEffect, useState } from "react";

import { useAccount } from "wagmi";

import { useAppStore } from "../../store/useAppStore";

import ActivationOverlay from "../../components/ActivationOverlay";

import { supabase } from "../../lib/supabase";

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
    claimed,
    setClaimed,
  ] = useState({});

  const [
    quests,
    setQuests,
  ] = useState({});

  const [
    selectedAnswers,
    setSelectedAnswers,
  ] = useState({});

  const questList = [
    {
      id: "daily",
      title:
        "DAILY CHECK-IN",
      reward: 10,
      category:
        "CONTINUITY",
      description:
        "Maintain persistent presence inside the network.",
    },

    {
      id: "name",
      title:
        "SET IDENTITY NAME",
      reward: 20,
      category:
        "IDENTITY",
      description:
        "Initialize your persistent identity layer.",
    },

    {
      id: "fc_follow",
      title:
        "FOLLOW ON FARCASTER",
      reward: 30,
      category:
        "SOCIAL",
      description:
        "Join the continuity network on Farcaster.",
      link: "https://farcaster.xyz/theclub",
    },

    {
      id: "fc_like",
      title:
        "LIKE OFFICIAL CAST",
      reward: 15,
      category:
        "SOCIAL",
      description:
        "Signal support through interaction.",
      link: "https://farcaster.xyz/theclub",
    },

    {
      id: "fc_recast",
      title:
        "RECAST OFFICIAL CAST",
      reward: 40,
      category:
        "SOCIAL",
      description:
        "Expand persistent visibility across the network.",
      link: "https://farcaster.xyz/theclub",
    },

    {
      id: "fc_reply",
      title:
        "REPLY TO OFFICIAL CAST",
      reward: 50,
      category:
        "SOCIAL",
      description:
        "Participate in continuity discussions.",
      link: "https://farcaster.xyz/theclub",
    },

    {
      id: "x_follow",
      title:
        "FOLLOW ON X",
      reward: 25,
      category:
        "SOCIAL",
      description:
        "Extend identity continuity across platforms.",
      link: "https://x.com/theclubprotocol",
    },

    {
      id: "x_like",
      title:
        "LIKE OFFICIAL POST",
      reward: 10,
      category:
        "SOCIAL",
      description:
        "Support protocol visibility.",
      link: "https://x.com/theclubprotocol",
    },

    {
      id: "x_repost",
      title:
        "REPOST OFFICIAL POST",
      reward: 35,
      category:
        "SOCIAL",
      description:
        "Distribute continuity narratives.",
      link: "https://x.com/theclubprotocol",
    },

    {
      id: "x_comment",
      title:
        "COMMENT ON OFFICIAL POST",
      reward: 45,
      category:
        "SOCIAL",
      description:
        "Create persistent interaction signals.",
      link: "https://x.com/theclubprotocol",
    },

    {
      id: "quiz_identity",
      title:
        "WHAT DEFINES REAL IDENTITY?",
      reward: 40,
      category:
        "RESEARCH",
      description:
        "Choose the continuity principle you align with.",
      options: [
        "Follower count",
        "Persistent reputation",
        "Anonymous virality",
        "Pure automation",
      ],
    },

    {
      id: "quiz_ai",
      title:
        "HOW WILL HUMANS STAY DISTINCT FROM AI?",
      reward: 40,
      category:
        "RESEARCH",
      description:
        "Select the strongest long-term signal.",
      options: [
        "Infinite content",
        "Verified continuity",
        "Faster posting",
        "Anonymous scaling",
      ],
    },
  ];

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

      setClaimed(completed);

      const available = {};

      questList.forEach(
        (quest) => {
          available[
            quest.id
          ] = true;
        }
      );

      if (
        !username ||
        username ===
          "Unnamed Entity"
      ) {
        available.name =
          false;
      }

      setQuests(available);

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
    ) {
      return;
    }

    if (
      type !== "daily" &&
      claimed[type]
    ) {
      return;
    }

    try {
      const updatedPoints =
        await awardPoints(
          address,
          amount
        );

      const updatedClaimed =
        {
          ...claimed,
        };

      if (
        type !== "daily"
      ) {
        updatedClaimed[
          type
        ] = true;
      }

      await supabase
        .from("users")
        .update({
          completed_quests:
            updatedClaimed,

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
        updatedClaimed
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
    quest
  ) {
    if (
      quest.id ===
        "daily" &&
      dailyCooldown
    ) {
      return (
        <div
          style={{
            opacity: 0.35,
            letterSpacing:
              "2px",
            fontSize: "11px",
          }}
        >
          COOLDOWN
        </div>
      );
    }

    if (
      claimed[quest.id]
    ) {
      return (
        <div
          style={{
            opacity: 0.35,
            letterSpacing:
              "2px",
            fontSize: "11px",
          }}
        >
          COMPLETED
        </div>
      );
    }

    const requiresAnswer =
      quest.options;

    const hasAnswer =
      selectedAnswers[
        quest.id
      ];

    return (
      <div
        style={{
          display: "flex",
          gap: "12px",
          alignItems:
            "center",
          flexWrap: "wrap",
          justifyContent:
            "flex-end",
        }}
      >
        {quest.link && (
          <button
            onClick={() =>
              window.open(
                quest.link,
                "_blank"
              )
            }
            className="mint-button"
            style={{
              opacity: 0.7,
              width: "140px",
              marginTop: 0,
            }}
          >
            OPEN
          </button>
        )}

        <button
          disabled={
            requiresAnswer &&
            !hasAnswer
          }
          onClick={() =>
            rewardQuest(
              quest.id,
              quest.reward
            )
          }
          className="mint-button"
          style={{
            width: "140px",
            marginTop: 0,

            opacity:
              requiresAnswer &&
              !hasAnswer
                ? 0.35
                : 1,

            cursor:
              requiresAnswer &&
              !hasAnswer
                ? "not-allowed"
                : "pointer",
          }}
        >
          COLLECT
        </button>
      </div>
    );
  }

  function renderSection(
    category
  ) {
    const filtered =
      questList.filter(
        (quest) =>
          quest.category ===
          category
      );

    return (
      <div
        style={{
          marginBottom:
            "56px",
        }}
      >
        <div
          className="section-label"
          style={{
            marginBottom:
              "26px",
          }}
        >
          {category}
        </div>

        <div
          style={{
            display: "grid",
            gap: "22px",
          }}
        >
          {filtered.map(
            (quest) => (
              <div
                key={quest.id}
                className="terminal-card"
              >
                <div
                  style={{
                    display:
                      "flex",

                    justifyContent:
                      "space-between",

                    alignItems:
                      "flex-start",

                    gap: "20px",

                    flexWrap:
                      "wrap",
                  }}
                >
                  <div
                    style={{
                      flex: 1,
                      minWidth:
                        "240px",
                    }}
                  >
                    <div
                      style={{
                        fontSize:
                          "18px",

                        marginBottom:
                          "10px",

                        letterSpacing:
                          "1px",
                      }}
                    >
                      {
                        quest.title
                      }
                    </div>

                    <div
                      style={{
                        opacity: 0.5,

                        fontSize:
                          "13px",

                        lineHeight:
                          "1.8",

                        marginBottom:
                          "16px",
                      }}
                    >
                      {
                        quest.description
                      }
                    </div>

                    {quest.options && (
                      <div
                        style={{
                          display:
                            "grid",

                          gap: "12px",

                          marginBottom:
                            "18px",
                        }}
                      >
                        {quest.options.map(
                          (
                            option
                          ) => (
                            <button
                              key={
                                option
                              }
                              onClick={() =>
                                setSelectedAnswers(
                                  (
                                    prev
                                  ) => ({
                                    ...prev,
                                    [quest.id]:
                                      option,
                                  })
                                )
                              }
                              style={{
                                width:
                                  "100%",

                                textAlign:
                                  "left",

                                padding:
                                  "14px 18px",

                                borderRadius:
                                  "16px",

                                border:
                                  selectedAnswers[
                                    quest
                                      .id
                                  ] ===
                                  option
                                    ? "1px solid rgba(255,255,255,0.24)"
                                    : "1px solid rgba(255,255,255,0.08)",

                                background:
                                  selectedAnswers[
                                    quest
                                      .id
                                  ] ===
                                  option
                                    ? "rgba(255,255,255,0.08)"
                                    : "rgba(255,255,255,0.03)",

                                color:
                                  "white",

                                fontSize:
                                  "13px",

                                letterSpacing:
                                  "0.5px",

                                cursor:
                                  "pointer",

                                transition:
                                  "0.25s ease",
                              }}
                            >
                              {
                                option
                              }
                            </button>
                          )
                        )}
                      </div>
                    )}

                    <div
                      style={{
                        opacity: 0.35,

                        letterSpacing:
                          "2px",

                        fontSize:
                          "11px",

                        textTransform:
                          "uppercase",
                      }}
                    >
                      Reward +
                      {
                        quest.reward
                      }{" "}
                      Reputation
                    </div>
                  </div>

                  {renderStatus(
                    quest
                  )}
                </div>
              </div>
            )
          )}
        </div>
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
          Reputation Operations
        </h1>

        <div
          className="terminal-card"
          style={{
            marginBottom:
              "60px",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent:
                "space-between",
              padding:
                "18px 0",
              borderBottom:
                "1px solid rgba(255,255,255,0.06)",
            }}
          >
            <span
              style={{
                opacity: 0.5,
                letterSpacing:
                  "2px",
                fontSize:
                  "12px",
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
              padding:
                "18px 0",
              borderBottom:
                "1px solid rgba(255,255,255,0.06)",
            }}
          >
            <span
              style={{
                opacity: 0.5,
                letterSpacing:
                  "2px",
                fontSize:
                  "12px",
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
              padding:
                "18px 0",
            }}
          >
            <span
              style={{
                opacity: 0.5,
                letterSpacing:
                  "2px",
                fontSize:
                  "12px",
              }}
            >
              REPUTATION
            </span>

            <span>
              {points} PTS
            </span>
          </div>
        </div>

        {renderSection(
          "CONTINUITY"
        )}

        {renderSection(
          "IDENTITY"
        )}

        {renderSection(
          "SOCIAL"
        )}

        {renderSection(
          "RESEARCH"
        )}
      </div>
    </>
  );
}