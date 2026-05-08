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
          "rgba(0,0,0,0.72)",

        backdropFilter:
          "blur(14px)",

        display: "flex",

        alignItems: "center",

        justifyContent:
          "center",

        zIndex: 999999,
      }}
    >
      <div
        style={{
          textAlign: "center",

          animation:
            "fadeIn 0.4s ease",
        }}
      >
        <div
          style={{
            fontSize: "12px",

            letterSpacing:
              "6px",

            opacity: 0.45,

            marginBottom: "24px",
          }}
        >
          REPUTATION UPDATED
        </div>

        <div
          style={{
            fontSize: "92px",

            fontWeight: 200,

            letterSpacing:
              "4px",
          }}
        >
          +{amount}
        </div>

        <div
          style={{
            marginTop: "18px",

            opacity: 0.45,

            letterSpacing:
              "4px",

            fontSize: "12px",
          }}
        >
          POINTS ADDED
        </div>
      </div>
    </div>
  );
}