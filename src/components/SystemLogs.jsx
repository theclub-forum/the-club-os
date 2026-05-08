import { useAppStore } from "../store/appStore";

export default function SystemLogs() {
  const { logs } = useAppStore();

  const isMobile =
    window.innerWidth <= 900;

  return (
    <div
      style={{
        marginTop: isMobile
          ? "50px"
          : "30px",

        border:
          "1px solid rgba(255,255,255,0.06)",

        background:
          "rgba(255,255,255,0.025)",

        backdropFilter:
          "blur(20px)",

        padding: isMobile
          ? "22px"
          : "30px",

        borderRadius:
          isMobile
            ? "24px"
            : "0px",

        overflow: "hidden",
      }}
    >
      <div
        style={{
          fontSize: isMobile
            ? "9px"
            : "10px",

          letterSpacing:
            isMobile
              ? "3px"
              : "4px",

          opacity: 0.35,

          marginBottom:
            "24px",
        }}
      >
        SYSTEM LOGS
      </div>

      {logs.map((log, index) => (
        <div
          key={index}
          style={{
            padding: isMobile
              ? "12px 0"
              : "14px 0",

            borderBottom:
              "1px solid rgba(255,255,255,0.04)",

            fontSize: isMobile
              ? "12px"
              : "13px",

            opacity: 0.7,

            letterSpacing:
              "1px",

            lineHeight:
              isMobile
                ? "1.7"
                : "1.5",

            wordBreak:
              "break-word",
          }}
        >
          {log}
        </div>
      ))}
    </div>
  );
}