export default function ActivationOverlay({
  visible,
  amount = 100,
}) {
  if (!visible) return null;

  return (
    <div
      style={{
        position: "fixed",

        inset: 0,

        background:
          "rgba(0,0,0,0.82)",

        backdropFilter:
          "blur(18px)",

        display: "flex",

        alignItems: "center",

        justifyContent:
          "center",

        zIndex: 999999,

        animation:
          "overlayFade 0.35s ease",
      }}
    >
      <div
        style={{
          position: "relative",

          textAlign: "center",

          padding:
            window.innerWidth <=
            900
              ? "40px 24px"
              : "70px 90px",

          border:
            "1px solid rgba(255,255,255,0.08)",

          background:
            "linear-gradient(to bottom, rgba(255,255,255,0.05), rgba(255,255,255,0.015))",

          borderRadius: "28px",

          overflow: "hidden",

          boxShadow:
            "0 0 80px rgba(255,255,255,0.04)",

          animation:
            "rewardAppear 0.45s ease",
        }}
      >
        <div
          style={{
            position: "absolute",

            inset: 0,

            background:
              "radial-gradient(circle at center, rgba(255,255,255,0.06), transparent 70%)",

            pointerEvents:
              "none",
          }}
        />

        <div
          style={{
            position: "relative",
            zIndex: 2,
          }}
        >
          <div
            style={{
              fontSize:
                window.innerWidth <=
                900
                  ? "10px"
                  : "12px",

              letterSpacing:
                "6px",

              opacity: 0.4,

              marginBottom:
                "26px",

              textTransform:
                "uppercase",
            }}
          >
            Reputation Updated
          </div>

          <div
            style={{
              fontSize:
                window.innerWidth <=
                900
                  ? "72px"
                  : "110px",

              fontWeight: 200,

              lineHeight: 1,

              letterSpacing:
                "4px",

              marginBottom:
                "16px",

              textShadow:
                "0 0 30px rgba(255,255,255,0.08)",
            }}
          >
            +{amount}
          </div>

          <div
            style={{
              opacity: 0.4,

              letterSpacing:
                "4px",

              fontSize:
                window.innerWidth <=
                900
                  ? "10px"
                  : "12px",

              textTransform:
                "uppercase",
            }}
          >
            Reputation Added
          </div>
        </div>
      </div>

      <style>
        {`
          @keyframes rewardAppear {
            0% {
              opacity: 0;
              transform: scale(0.92) translateY(10px);
            }

            100% {
              opacity: 1;
              transform: scale(1) translateY(0px);
            }
          }

          @keyframes overlayFade {
            0% {
              opacity: 0;
            }

            100% {
              opacity: 1;
            }
          }
        `}
      </style>
    </div>
  );
}