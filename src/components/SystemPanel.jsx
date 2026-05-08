export default function SystemPanel({
  title,
  text,
}) {
  return (
    <div
      style={{
        border:
          "1px solid rgba(255,255,255,0.06)",
        background:
          "linear-gradient(to bottom right, rgba(255,255,255,0.04), rgba(255,255,255,0.015))",
        padding: "60px",
        marginBottom: "30px",
        backdropFilter: "blur(24px)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          position: "absolute",
          width: "500px",
          height: "500px",
          background:
            "radial-gradient(circle, rgba(255,255,255,0.05), transparent 70%)",
          top: "-200px",
          right: "-100px",
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
            fontSize: "11px",
            letterSpacing: "5px",
            opacity: 0.35,
            marginBottom: "18px",
          }}
        >
          SYSTEM DOCUMENTATION
        </div>

        <div
          style={{
            fontSize: "56px",
            fontWeight: 300,
            marginBottom: "40px",
            lineHeight: "1.1",
          }}
        >
          {title}
        </div>

        <div
          style={{
            fontSize: "15px",
            lineHeight: "2.2",
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