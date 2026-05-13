import { useEffect, useState } from "react";

import { useAccount } from "wagmi";

import { supabase } from "../../lib/supabase";

export default function Leaderboard() {
  const { address } =
    useAccount();

  const [leaderboard, setLeaderboard] =
    useState([]);

  const [currentUser, setCurrentUser] =
    useState(null);

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
          })
          .limit(100);

      if (error) {
        console.log(error);
        return;
      }

      const formatted =
        (data || []).map(
          (user, index) => ({
            id: user.wallet,

            rank: index + 1,

            wallet:
              user.wallet,

            name:
              user.username ||
              "Unnamed Entity",

            score:
              Number(
                user.points
              ) || 0,

            status:
              user.role ||
              "Visitor",
          })
        );

      setLeaderboard(
        formatted
      );

      if (address) {
        const existing =
          formatted.find(
            (u) =>
              u.wallet ===
              address
          );

        if (existing) {
          setCurrentUser(
            existing
          );
        } else {
          const {
            data: self,
          } = await supabase
            .from("users")
            .select("*")
            .eq(
              "wallet",
              address
            )
            .single();

          if (self) {
            const higherUsers =
              formatted.filter(
                (u) =>
                  u.score >
                  Number(
                    self.points
                  )
              ).length;

            setCurrentUser({
              id: self.wallet,

              wallet:
                self.wallet,

              rank:
                higherUsers +
                1,

              name:
                self.username ||
                "Unnamed Entity",

              score:
                Number(
                  self.points
                ) || 0,

              status:
                self.role ||
                "Visitor",
            });
          }
        }
      }
    }

    loadLeaderboard();
  }, [address]);

  function renderRow(
    user,
    sticky = false
  ) {
    return (
      <div
        key={user.id}
        style={{
          display: "grid",

          gridTemplateColumns:
            isMobile
              ? "70px 1fr auto"
              : "140px 1fr 320px",

          gap: isMobile
            ? "12px"
            : "0",

          padding: isMobile
            ? "18px 12px"
            : "24px",

          borderBottom:
            sticky
              ? "1px solid rgba(255,255,255,0.08)"
              : "1px solid rgba(255,255,255,0.05)",

          alignItems:
            "center",

          background:
            sticky
              ? "rgba(255,255,255,0.04)"
              : "transparent",

          backdropFilter:
            sticky
              ? "blur(20px)"
              : undefined,

          position: sticky
            ? "sticky"
            : "relative",

          top: sticky
            ? 0
            : undefined,

          zIndex: sticky
            ? 5
            : 1,
        }}
      >
        <div
          style={{
            opacity: 0.4,

            letterSpacing:
              "2px",

            fontSize:
              isMobile
                ? "11px"
                : undefined,

            whiteSpace:
              "nowrap",
          }}
        >
          #
          {String(
            user.rank
          ).padStart(3, "0")}
        </div>

        <div
          style={{
            fontSize:
              isMobile
                ? "13px"
                : "15px",

            letterSpacing:
              isMobile
                ? "1px"
                : "2px",

            overflow:
              "hidden",

            textOverflow:
              "ellipsis",

            whiteSpace:
              "nowrap",
          }}
        >
          {user.name}
        </div>

        <div
          style={{
            display: "flex",

            justifyContent:
              "space-between",

            alignItems:
              "center",

            gap: "40px",

            paddingLeft:
              isMobile
                ? "0"
                : "40px",

            whiteSpace:
              "nowrap",
          }}
        >
          <div
            style={{
              opacity: 0.7,

              textAlign:
                "right",

              fontSize:
                isMobile
                  ? "12px"
                  : undefined,
            }}
          >
            {user.score} PTS
          </div>

          {!isMobile && (
            <div
              style={{
                opacity: 0.45,

                letterSpacing:
                  "2px",

                minWidth:
                  "120px",

                textAlign:
                  "right",
              }}
            >
              {user.status}
            </div>
          )}
        </div>
      </div>
    );
  }

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

          letterSpacing:
            isMobile
              ? "3px"
              : "5px",

          opacity: 0.35,

          marginBottom:
            isMobile
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

          lineHeight:
            isMobile
              ? "1"
              : undefined,

          fontWeight: 300,

          marginBottom:
            isMobile
              ? "30px"
              : "50px",
        }}
      >
        Leaderboard
      </div>

      {currentUser && (
        <div
          style={{
            marginBottom:
              "30px",
          }}
        >
          <div
            style={{
              opacity: 0.35,

              letterSpacing:
                "3px",

              fontSize:
                "11px",

              marginBottom:
                "10px",
            }}
          >
            YOUR POSITION
          </div>

          {renderRow(
            currentUser,
            true
          )}
        </div>
      )}

      {leaderboard.length ===
        0 && (
        <div
          style={{
            padding: isMobile
              ? "50px 0"
              : "80px 0",

            opacity: 0.35,

            letterSpacing:
              "3px",

            fontSize: isMobile
              ? "11px"
              : "13px",
          }}
        >
          NO REGISTERED ENTITIES
          DETECTED
        </div>
      )}

      <div
        style={{
          display: "grid",
        }}
      >
        {leaderboard.map(
          (user) =>
            renderRow(user)
        )}
      </div>
    </div>
  );
}