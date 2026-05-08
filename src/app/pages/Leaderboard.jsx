import { useEffect, useState } from "react";

import { supabase } from "../../lib/supabase";

export default function Leaderboard() {
  const [leaderboard, setLeaderboard] =
    useState([]);

  const isMobile =
    window.innerWidth <= 900;

  useEffect(() => {
    async function loadLeaderboard() {
      const { data, error } =
        await supabase
          .from("users")
          .select("*")
          .order("points", {
            ascending: false,
          });

      if (error) {
        console.log(error);
        return;
      }

      const formatted =
        (data || []).map((user) => ({
          id: user.wallet,

          name:
            user.username ||
            "Unnamed Entity",

          score:
            Number(user.points) || 0,

          status:
            user.role || "Visitor",
        }));

      setLeaderboard(formatted);
    }

    loadLeaderboard();
  }, []);

  return (
    <div
      style={{
        border:
          "1px solid rgba(255,255,255,0.06)",

        background:
          "linear-gradient(to bottom right, rgba(255,255,255,0.04), rgba(255,255,255,0.015))",

        padding: isMobile
          ? "22px"
          : "50px",

        backdropFilter:
          "blur(20px)",

        overflow: "hidden",
      }}
    >
      <div
        style={{
          fontSize: isMobile
            ? "9px"
            : "11px",

          letterSpacing: isMobile
            ? "3px"
            : "5px",

          opacity: 0.35,

          marginBottom: isMobile
            ? "12px"
            : "18px",
        }}
      >
        GLOBAL REPUTATION INDEX
      </div>

      <div
        style={{
          fontSize: isMobile
            ? "42px"
            : "62px",

          lineHeight: isMobile
            ? "1"
            : undefined,

          fontWeight: 300,

          marginBottom: isMobile
            ? "30px"
            : "50px",
        }}
      >
        Leaderboard
      </div>

      {leaderboard.length ===
        0 && (
        <div
          style={{
            padding: isMobile
              ? "50px 0"
              : "80px 0",

            opacity: 0.35,

            letterSpacing: "3px",

            fontSize: isMobile
              ? "11px"
              : "13px",
          }}
        >
          NO REGISTERED ENTITIES
          DETECTED
        </div>
      )}

      {leaderboard.map(
        (user, index) => (
          <div
            key={user.id}
            style={{
              display: "grid",

              gridTemplateColumns:
                isMobile
                  ? "1fr"
                  : "140px 1fr 160px 220px",

              gap: isMobile
                ? "10px"
                : undefined,

              padding: isMobile
                ? "18px 0"
                : "24px",

              borderBottom:
                "1px solid rgba(255,255,255,0.05)",

              alignItems: "center",
            }}
          >
            <div
              style={{
                opacity: 0.4,

                letterSpacing: "2px",

                fontSize: isMobile
                  ? "11px"
                  : undefined,
              }}
            >
              #
              {String(
                index + 1
              ).padStart(3, "0")}
            </div>

            <div
              style={{
                fontSize: isMobile
                  ? "14px"
                  : "15px",

                letterSpacing:
                  isMobile
                    ? "1px"
                    : "2px",

                wordBreak:
                  "break-word",
              }}
            >
              {user.name}
            </div>

            <div
              style={{
                opacity: 0.7,

                fontSize: isMobile
                  ? "13px"
                  : undefined,
              }}
            >
              {user.score} PTS
            </div>

            <div
              style={{
                opacity: 0.45,

                letterSpacing:
                  isMobile
                    ? "1px"
                    : "2px",

                fontSize: isMobile
                  ? "11px"
                  : undefined,
              }}
            >
              {user.status}
            </div>
          </div>
        )
      )}
    </div>
  );
}