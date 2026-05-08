export default function SystemPanel({
  title,
  text,
}) {
  const isMobile =
    window.innerWidth <= 900;

  return (
    <div
      style={{
        border:
          "1px solid rgba(255,255,255,0.06)",

        background:
          "linear-gradient(to bottom right, rgba(255,255,255,0.04), rgba(255,255,255,0.015))",

        padding: isMobile
          ? "28px"
          : "60px",

        marginBottom: isMobile
          ? "20px"
          : "30px",

        backdropFilter: "blur(24px)",

        position: "relative",

        overflow: "hidden",
      }}
    >
      <div
        style={{
          position: "absolute",

          width: isMobile
            ? "260px"
            : "500px",

          height: isMobile
            ? "260px"
            : "500px",

          background:
            "radial-gradient(circle, rgba(255,255,255,0.05), transparent 70%)",

          top: isMobile
            ? "-120px"
            : "-200px",

          right: isMobile
            ? "-120px"
            : "-100px",

          filter: "blur(80px)",
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
              ? "14px"
              : "18px",
          }}
        >
          SYSTEM DOCUMENTATION
        </div>

        <div
          style={{
            fontSize: isMobile
              ? "34px"
              : "56px",

            fontWeight: 300,

            marginBottom: isMobile
              ? "24px"
              : "40px",

            lineHeight: isMobile
              ? "1.1"
              : "1.1",

            wordBreak: "break-word",
          }}
        >
          {title}
        </div>

        <div
          style={{
            fontSize: isMobile
              ? "13px"
              : "15px",

            lineHeight: isMobile
              ? "2"
              : "2.2",

            opacity: 0.72,

            maxWidth: "900px",

            whiteSpace: "pre-line",
          }}
        >
          {text}
        </div>
      </div>
    </div>
  );
}