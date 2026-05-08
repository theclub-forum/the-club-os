export default function ConstructionCard() {
  const isMobile =
    window.innerWidth <= 900;

  return (
    <div
      style={{
        border:
          "1px solid rgba(255,255,255,0.06)",

        background:
          "linear-gradient(to bottom right, rgba(255,255,255,0.03), rgba(255,255,255,0.01))",

        padding: isMobile
          ? "28px"
          : "80px",

        backdropFilter: "blur(24px)",

        position: "relative",

        overflow: "hidden",
      }}
    >
      <div
        style={{
          position: "absolute",

          width: isMobile
            ? "320px"
            : "600px",

          height: isMobile
            ? "320px"
            : "600px",

          background:
            "radial-gradient(circle, rgba(255,255,255,0.04), transparent 70%)",

          top: isMobile
            ? "-120px"
            : "-250px",

          right: isMobile
            ? "-120px"
            : "-100px",

          filter: "blur(100px)",
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
            fontSize: isMobile
              ? "9px"
              : "11px",

            letterSpacing: isMobile
              ? "3px"
              : "5px",

            opacity: 0.35,

            marginBottom: isMobile
              ? "16px"
              : "20px",
          }}
        >
          CLASSIFIED SYSTEM MODULE
        </div>

        <div
          style={{
            fontSize: isMobile
              ? "42px"
              : "72px",

            fontWeight: 300,

            lineHeight: "1",

            marginBottom: isMobile
              ? "22px"
              : "30px",

            wordBreak: "break-word",
          }}
        >
          UNDER
          <br />
          CONSTRUCTION
        </div>

        <div
          style={{
            fontSize: isMobile
              ? "13px"
              : "15px",

            opacity: 0.55,

            lineHeight: isMobile
              ? "1.9"
              : "2",

            maxWidth: "700px",
          }}
        >
          This system layer is currently under active
          development. Future architecture will include
          persistent interaction systems, advanced
          identity mechanics, historical tracking,
          participation structures and evolving digital
          reputation layers.
        </div>
      </div>
    </div>
  );
}