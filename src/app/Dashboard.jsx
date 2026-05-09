import { useState, useEffect } from "react";

import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";
import BackgroundFX from "../components/BackgroundFX";
import SystemLogs from "../components/SystemLogs";

import Vision from "./pages/Vision";
import Roadmap from "./pages/Roadmap";
import HowItWorks from "./pages/HowItWorks";
import Research from "./pages/Research";
import Leaderboard from "./pages/Leaderboard";
import Profile from "./pages/Profile";
import Forum from "./pages/Forum";
import Quests from "./pages/Quests";
import NFT from "./pages/NFT";

import { useAppStore } from "../store/appStore";

export default function Dashboard() {
  const [active, setActive] =
    useState("Vision");

  const [isMobile, setIsMobile] =
    useState(
      window.innerWidth <= 900
    );

  const {
    connected,
    points,
    rank,
    connectIdentity,
  } = useAppStore();

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(
        window.innerWidth <= 900
      );
    };

    window.addEventListener(
      "resize",
      handleResize
    );

    return () =>
      window.removeEventListener(
        "resize",
        handleResize
      );
  }, []);

  const renderPage = () => {
    switch (active) {
      case "Vision":
        return <Vision />;

      case "Roadmap":
        return <Roadmap />;

      case "How It Works":
        return <HowItWorks />;

      case "Research":
        return (
          <Research />
        );

      case "Leaderboard":
        return <Leaderboard />;

      case "Profile":
        return <Profile />;

      case "Forum":
        return <Forum />;

      case "Quests":
        return <Quests />;

      case "NFT":
        return <NFT />;

      default:
        return <Vision />;
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",

        color: "white",

        display: "flex",

        overflow: "hidden",

        position: "relative",

        background: "#050505",
      }}
    >
      <BackgroundFX />

      <Sidebar
        active={active}
        setActive={setActive}
      />

      <div
        style={{
          flex: 1,

          padding: isMobile
            ? "100px 18px 40px"
            : "40px",

          overflowY: "auto",

          height: "100vh",

          position: "relative",

          zIndex: 5,

          marginLeft: isMobile
            ? 0
            : 0,

          width: "100%",

          maxWidth: "100vw",
        }}
      >
        <div
          style={{
            maxWidth: "1600px",

            margin: "0 auto",
          }}
        >
          <Topbar
            connected={
              connected
            }
            points={points}
            rank={rank}
            onConnect={
              connectIdentity
            }
          />

          <div
            style={{
              marginTop:
                isMobile
                  ? "24px"
                  : "40px",
            }}
          >
            {renderPage()}
          </div>

          <div
            style={{
              marginTop:
                isMobile
                  ? "60px"
                  : "100px",
            }}
          >
            <SystemLogs />
          </div>
        </div>
      </div>
    </div>
  );
}