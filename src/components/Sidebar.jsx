import { useState, useEffect } from "react";

export default function Sidebar({
  active,
  setActive,
}) {
  const [systemOpen, setSystemOpen] =
    useState(true);

  const [mobileOpen, setMobileOpen] =
    useState(false);

  const [isMobile, setIsMobile] =
    useState(
      window.innerWidth <= 900
    );

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(
        window.innerWidth <= 900
      );
    };

    window.addEventListener(
      "resize",
      handleResize
    );

    return () =>
      window.removeEventListener(
        "resize",
        handleResize
      );
  }, []);

  const systemItems = [
    "Vision",
    "Roadmap",
    "How It Works",
    "Research",
  ];

  const mainItems = [
    "Leaderboard",
    "Profile",
    "Forum",
    "Quests",
    "NFT",
  ];

  const navItemStyle = (
    item
  ) => ({
    marginBottom: "16px",

    padding: isMobile
      ? "16px 18px"
      : "14px 18px",

    cursor: "pointer",

    border:
      active === item
        ? "1px solid rgba(255,255,255,0.14)"
        : "1px solid transparent",

    background:
      active === item
        ? "rgba(255,255,255,0.05)"
        : "transparent",

    opacity:
      active === item
        ? 1
        : 0.45,

    letterSpacing: "2px",

    fontSize: isMobile
      ? "12px"
      : "11px",

    textTransform:
      "uppercase",

    transition:
      "0.25s ease",

    backdropFilter:
      "blur(12px)",

    borderRadius: "16px",

    display: "flex",

    alignItems: "center",

    minHeight: "52px",

    flexShrink: 0,
  });

  return (
    <>
      {/* MOBILE TOPBAR */}

      {isMobile && (
        <div
          style={{
            position: "fixed",

            top: 0,
            left: 0,
            right: 0,

            height: "74px",

            display: "flex",

            alignItems: "center",

            justifyContent:
              "space-between",

            padding: "0 20px",

            background:
              "rgba(0,0,0,0.82)",

            backdropFilter:
              "blur(24px)",

            borderBottom:
              "1px solid rgba(255,255,255,0.06)",

            zIndex: 120,
          }}
        >
          <div
            style={{
              fontSize: "18px",

              letterSpacing:
                "6px",

              fontWeight: 300,
            }}
          >
            THE CLUB
          </div>

          <div
            onClick={() =>
              setMobileOpen(
                !mobileOpen
              )
            }
            style={{
              width: "42px",

              height: "42px",

              border:
                "1px solid rgba(255,255,255,0.08)",

              display: "flex",

              alignItems:
                "center",

              justifyContent:
                "center",

              background:
                "rgba(255,255,255,0.03)",

              cursor: "pointer",

              fontSize: "18px",

              borderRadius:
                "14px",

              transition:
                "0.25s ease",
            }}
          >
            {mobileOpen
              ? "×"
              : "≡"}
          </div>
        </div>
      )}

      {/* MOBILE OVERLAY */}

      {mobileOpen &&
        isMobile && (
          <div
            onClick={() =>
              setMobileOpen(
                false
              )
            }
            style={{
              position: "fixed",

              inset: 0,

              background:
                "rgba(0,0,0,0.72)",

              backdropFilter:
                "blur(4px)",

              zIndex: 110,
            }}
          />
        )}

      {/* SIDEBAR */}

      <div
        style={{
          width: isMobile
            ? "86%"
            : "280px",

          maxWidth: "320px",

          height: "100vh",

          borderRight:
            "1px solid rgba(255,255,255,0.06)",

          background:
            "linear-gradient(to bottom, rgba(255,255,255,0.04), rgba(255,255,255,0.015))",

          backdropFilter:
            "blur(28px)",

          padding: isMobile
            ? "34px 24px 120px"
            : "40px 32px",

          position: isMobile
            ? "fixed"
            : "relative",

          top: 0,

          left: isMobile
            ? mobileOpen
              ? "0"
              : "-100%"
            : "0",

          transition:
            "0.35s ease",

          zIndex: 115,

          overflowY: "auto",

          overflowX: "hidden",

          WebkitOverflowScrolling:
            "touch",

          boxShadow:
            isMobile
              ? "0 0 80px rgba(0,0,0,0.6)"
              : "none",
        }}
      >
        <div
          style={{
            fontSize: isMobile
              ? "24px"
              : "28px",

            fontWeight: 300,

            letterSpacing:
              "8px",

            marginBottom:
              "60px",

            marginTop: isMobile
              ? "48px"
              : "0",
          }}
        >
          THE CLUB
        </div>

        <div
          style={{
            fontSize: "10px",

            letterSpacing:
              "4px",

            opacity: 0.35,

            marginBottom:
              "30px",
          }}
        >
          OPERATIONAL SYSTEM
        </div>

        <div
          onClick={() =>
            setSystemOpen(
              !systemOpen
            )
          }
          style={{
            marginBottom:
              "14px",

            padding:
              "14px 18px",

            cursor: "pointer",

            border:
              "1px solid rgba(255,255,255,0.08)",

            background:
              "rgba(255,255,255,0.03)",

            letterSpacing:
              "2px",

            fontSize: "11px",

            textTransform:
              "uppercase",

            transition:
              "0.25s ease",

            backdropFilter:
              "blur(12px)",

            display: "flex",

            justifyContent:
              "space-between",

            alignItems:
              "center",

            borderRadius:
              "16px",
          }}
        >
          <span>SYSTEM</span>

          <span
            style={{
              opacity: 0.4,
            }}
          >
            {systemOpen
              ? "−"
              : "+"}
          </span>
        </div>

        {systemOpen && (
          <div
            style={{
              marginBottom:
                "26px",

              paddingLeft:
                "10px",
            }}
          >
            {systemItems.map(
              (item) => (
                <div
                  key={item}
                  onClick={() => {
                    setActive(
                      item
                    );

                    setMobileOpen(
                      false
                    );
                  }}
                  style={{
                    ...navItemStyle(
                      item
                    ),

                    fontSize:
                      "10px",
                  }}
                >
                  {item}
                </div>
              )
            )}
          </div>
        )}

        {mainItems.map(
          (item) => (
            <div
              key={item}
              onClick={() => {
                setActive(
                  item
                );

                setMobileOpen(
                  false
                );
              }}
              style={navItemStyle(
                item
              )}
            >
              {item}
            </div>
          )
        )}

        <div
          style={{
            marginTop: "70px",

            paddingTop: "30px",

            paddingBottom: "40px",

            borderTop:
              "1px solid rgba(255,255,255,0.06)",

            fontSize: "10px",

            opacity: 0.3,

            lineHeight: "1.9",

            letterSpacing:
              "2px",
          }}
        >
          PERSISTENT DIGITAL
          PRESENCE
          <br />
          REPUTATION THROUGH
          CONTINUITY
        </div>
      </div>
    </>
  );
}