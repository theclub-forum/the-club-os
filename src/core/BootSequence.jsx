import { useEffect, useState } from "react";

const lines = [
  "INITIALIZING NODE",
  "VERIFYING ACCESS",
  "SCANNING IDENTITY",
  "SYNCING MEMORY LAYER",
  "SYSTEM READY",
];

export default function BootSequence({ onComplete }) {
  const [visible, setVisible] = useState([]);

  useEffect(() => {
    lines.forEach((line, index) => {
      setTimeout(() => {
        setVisible((prev) => [...prev, line]);
      }, index * 700);
    });

    setTimeout(() => {
      onComplete();
    }, 4500);
  }, []);

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        background: "#000",
        color: "white",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        paddingLeft: "120px",
        fontFamily: "Inter, system-ui",
        zIndex: 999,
      }}
    >
      {visible.map((line) => (
        <div
          key={line}
          style={{
            marginBottom: "20px",
            fontSize: "14px",
            letterSpacing: "4px",
            opacity: 0.7,
          }}
        >
          {line}
        </div>
      ))}
    </div>
  );
}