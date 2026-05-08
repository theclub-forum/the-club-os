export default function WarpTransition({ warpRef }) {
  return (
    <div
      ref={warpRef}
      style={{
        position: "absolute",
        inset: 0,
        background:
          "radial-gradient(circle, rgba(255,255,255,0.08), black 65%)",
        zIndex: 100,
        display: "none",
        pointerEvents: "none",
      }}
    />
  );
}