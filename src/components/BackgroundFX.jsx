export default function BackgroundFX() {
  const isMobile =
    window.innerWidth <= 900;

  return (
    <>
      <div
        style={{
          position: "fixed",

          width: isMobile
            ? "500px"
            : "900px",

          height: isMobile
            ? "500px"
            : "900px",

          background:
            "radial-gradient(circle, rgba(255,255,255,0.05), transparent 70%)",

          top: isMobile
            ? "-180px"
            : "-300px",

          left: isMobile
            ? "-140px"
            : "-200px",

          filter: isMobile
            ? "blur(90px)"
            : "blur(120px)",

          pointerEvents:
            "none",

          animation:
            "floatOne 14s ease-in-out infinite",

          zIndex: 0,
        }}
      />

      <div
        style={{
          position: "fixed",

          width: isMobile
            ? "420px"
            : "700px",

          height: isMobile
            ? "420px"
            : "700px",

          background:
            "radial-gradient(circle, rgba(0,180,255,0.05), transparent 70%)",

          bottom: isMobile
            ? "-140px"
            : "-250px",

          right: isMobile
            ? "-120px"
            : "-200px",

          filter: isMobile
            ? "blur(100px)"
            : "blur(140px)",

          pointerEvents:
            "none",

          animation:
            "floatTwo 18s ease-in-out infinite",

          zIndex: 0,
        }}
      />

      <style>
        {`
          @keyframes floatOne {
            0% {
              transform: translate(0px,0px);
            }

            50% {
              transform: translate(40px,30px);
            }

            100% {
              transform: translate(0px,0px);
            }
          }

          @keyframes floatTwo {
            0% {
              transform: translate(0px,0px);
            }

            50% {
              transform: translate(-50px,-20px);
            }

            100% {
              transform: translate(0px,0px);
            }
          }
        `}
      </style>
    </>
  );
}