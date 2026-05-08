import { ConnectButton } from "@rainbow-me/rainbowkit";

export default function Topbar() {
  const isMobile =
    window.innerWidth <= 900;

  return (
    <div
      style={{
        width: "100%",

        display: "flex",

        justifyContent:
          isMobile
            ? "center"
            : "flex-end",

        alignItems: "center",

        marginBottom:
          isMobile
            ? "26px"
            : "40px",

        position: "relative",

        zIndex: 20,
      }}
    >
      <div
        style={{
          transform: isMobile
            ? "scale(0.92)"
            : "scale(1)",

          transformOrigin:
            isMobile
              ? "center"
              : "right center",

          transition:
            "0.25s ease",
        }}
      >
        <ConnectButton />
      </div>
    </div>
  );
}