import { useEffect, useState } from "react";

import { supabase } from "../../lib/supabase";

export default function Leaderboard() {
  const [leaderboard, setLeaderboard] =
    useState([]);

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

        padding: "50px",

        backdropFilter:
          "blur(20px)",
      }}
    >
      <div
        style={{
          fontSize: "11px",

          letterSpacing: "5px",

          opacity: 0.35,

          marginBottom: "18px",
        }}
      >
        GLOBAL REPUTATION INDEX
      </div>

      <div
        style={{
          fontSize: "62px",

          fontWeight: 300,

          marginBottom: "50px",
        }}
      >
        Leaderboard
      </div>

      {leaderboard.length ===
        0 && (
        <div
          style={{
            padding: "80px 0",

            opacity: 0.35,

            letterSpacing: "3px",

            fontSize: "13px",
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
                "140px 1fr 160px 220px",

              padding: "24px",

              borderBottom:
                "1px solid rgba(255,255,255,0.05)",

              alignItems: "center",
            }}
          >
            <div
              style={{
                opacity: 0.4,

                letterSpacing: "2px",
              }}
            >
              #
              {String(
                index + 1
              ).padStart(3, "0")}
            </div>

            <div
              style={{
                fontSize: "15px",

                letterSpacing:
                  "2px",
              }}
            >
              {user.name}
            </div>

            <div
              style={{
                opacity: 0.7,
              }}
            >
              {user.score} PTS
            </div>

            <div
              style={{
                opacity: 0.45,

                letterSpacing:
                  "2px",
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