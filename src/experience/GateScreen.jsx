export default function GateScreen({ onEnter }) {
  const isMobile =
    window.innerWidth <= 900;

  return (
    <div
      className="gate-screen"
      style={{
        position: "absolute",
        inset: 0,

        display: "flex",
        flexDirection: "column",

        alignItems: "center",
        justifyContent: "center",

        zIndex: 20,

        padding:
          isMobile
            ? "40px 24px"
            : "40px",
      }}
    >
      <div
        style={{
          fontSize: isMobile
            ? "10px"
            : "11px",

          opacity: 0.45,

          letterSpacing:
            isMobile
              ? "3px"
              : "5px",

          marginBottom:
            isMobile
              ? "16px"
              : "20px",

          textAlign: "center",
        }}
      >
        ACCESS POINT DETECTED
      </div>

      <div
        style={{
          fontSize: isMobile
            ? "11px"
            : "12px",

          opacity: 0.28,

          letterSpacing:
            isMobile
              ? "2px"
              : "3px",

          marginBottom:
            isMobile
              ? "36px"
              : "40px",

          textAlign: "center",

          lineHeight: 1.8,

          maxWidth:
            isMobile
              ? "280px"
              : "100%",
        }}
      >
        PARTICIPATION REQUIRES
        <br />
        IDENTITY
      </div>

      <button
        onClick={onEnter}
        style={{
          background:
            "rgba(255,255,255,0.06)",

          border:
            "1px solid rgba(255,255,255,0.14)",

          color: "white",

          padding: isMobile
            ? "20px 34px"
            : "24px 54px",

          letterSpacing:
            isMobile
              ? "4px"
              : "6px",

          fontSize: isMobile
            ? "11px"
            : "12px",

          cursor: "pointer",

          backdropFilter:
            "blur(20px)",

          borderRadius:
            isMobile
              ? "18px"
              : "0px",

          width: isMobile
            ? "100%"
            : "auto",

          maxWidth:
            isMobile
              ? "320px"
              : "none",

          transition:
            "0.3s ease",

          fontWeight: 500,

          minHeight:
            isMobile
              ? "64px"
              : "auto",

          touchAction:
            "manipulation",
        }}
      >
        ENTER APP
      </button>
    </div>
  );
}