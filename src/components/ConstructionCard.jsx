export default function ConstructionCard() {
  return (
    <div
      style={{
        border:
          "1px solid rgba(255,255,255,0.06)",
        background:
          "linear-gradient(to bottom right, rgba(255,255,255,0.03), rgba(255,255,255,0.01))",
        padding: "80px",
        backdropFilter: "blur(24px)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          position: "absolute",
          width: "600px",
          height: "600px",
          background:
            "radial-gradient(circle, rgba(255,255,255,0.04), transparent 70%)",
          top: "-250px",
          right: "-100px",
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
            fontSize: "11px",
            letterSpacing: "5px",
            opacity: 0.35,
            marginBottom: "20px",
          }}
        >
          CLASSIFIED SYSTEM MODULE
        </div>

        <div
          style={{
            fontSize: "72px",
            fontWeight: 300,
            lineHeight: "1",
            marginBottom: "30px",
          }}
        >
          UNDER
          <br />
          CONSTRUCTION
        </div>

        <div
          style={{
            fontSize: "15px",
            opacity: 0.55,
            lineHeight: "2",
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