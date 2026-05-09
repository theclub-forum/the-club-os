import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import gsap from "gsap";

import GateScreen from "./GateScreen";
import WarpTransition from "./WarpTransition";

import BootSequence from "../core/BootSequence";

export default function IntroExperience() {
  const navigate = useNavigate();

  const root = useRef(null);
  const warp = useRef(null);

  const [section, setSection] =
    useState(0);

  const [showGate, setShowGate] =
    useState(false);

  const [booting, setBooting] =
    useState(false);

  const [scrollLocked, setScrollLocked] =
    useState(false);

  const isMobile =
    window.innerWidth <= 900;

  const sections = [
    {
      title: "THE CLUB",

      text:
        "PERSISTENT DIGITAL PRESENCE",
    },
  ];

  useEffect(() => {
    gsap.fromTo(
      root.current,
      { opacity: 0 },
      {
        opacity: 1,
        duration: 2,
      }
    );

    // SAVE REFERRAL CODE
    const params =
      new URLSearchParams(
        window.location.search
      );

    const ref =
      params.get("ref");

    if (ref) {
      localStorage.setItem(
        "theclub_referral",
        ref
      );
    }
  }, []);

  const triggerTransition = () => {
    if (showGate) return;

    if (scrollLocked) return;

    setScrollLocked(true);

    setTimeout(() => {
      setScrollLocked(false);
    }, 3200);

    if (section === 0) {
      gsap.to(root.current, {
        y: isMobile
          ? -20
          : -40,

        opacity: 0.92,

        duration: 1.8,

        ease: "expo.out",
      });

      setTimeout(() => {
        setShowGate(true);

        gsap.set(root.current, {
          y: 0,
          opacity: 1,
        });
      }, 1800);
    }
  };

  const onWheel = (e) => {
    if (e.deltaY > 0) {
      triggerTransition();
    }
  };

  const onTouchStart = (e) => {
    root.current.touchStartY =
      e.touches[0].clientY;
  };

  const onTouchEnd = (e) => {
    const endY =
      e.changedTouches[0]
        .clientY;

    const startY =
      root.current.touchStartY ||
      0;

    const diff =
      startY - endY;

    if (diff > 40) {
      triggerTransition();
    }
  };

  const enterApp = () => {
    gsap.set(warp.current, {
      opacity: 0,
      display: "block",
      scale: 0.8,
    });

    gsap
      .timeline({
        onComplete: () => {
          setBooting(true);
        },
      })
      .to(warp.current, {
        opacity: 1,
        scale: 1.6,
        duration: 2.4,
        ease: "expo.inOut",
      });
  };

  if (booting) {
    return (
      <BootSequence
        onComplete={() => {
          navigate("/app");
        }}
      />
    );
  }

  return (
    <div
      ref={root}
      onWheel={onWheel}
      onTouchStart={
        onTouchStart
      }
      onTouchEnd={onTouchEnd}
      style={{
        height: "100vh",
        overflow: "hidden",
        background: "#000",
        color: "white",
        position: "relative",
        fontFamily:
          "Inter, system-ui",
      }}
    >
      <WarpTransition
        warpRef={warp}
      />

      <div
        style={{
          position: "absolute",
          inset: 0,

          background:
            "radial-gradient(circle at top left, rgba(255,255,255,0.06), transparent 40%)",
        }}
      />

      {!showGate && (
        <div
          style={{
            position:
              "absolute",

            left: "50%",
            top: "50%",

            transform:
              "translate(-50%, -50%)",

            textAlign:
              "center",

            width: isMobile
              ? "90%"
              : "auto",
          }}
        >
          <div
            style={{
              fontSize: isMobile
                ? "54px"
                : "110px",

              fontWeight: 300,

              marginBottom:
                isMobile
                  ? "18px"
                  : "24px",

              letterSpacing:
                isMobile
                  ? "4px"
                  : "8px",

              lineHeight:
                isMobile
                  ? "1.1"
                  : "1",
            }}
          >
            {
              sections[0]
                .title
            }
          </div>

          <div
            style={{
              fontSize: isMobile
                ? "11px"
                : "13px",

              opacity: 0.5,

              letterSpacing:
                isMobile
                  ? "4px"
                  : "8px",

              lineHeight:
                isMobile
                  ? "1.8"
                  : "normal",
            }}
          >
            {
              sections[0]
                .text
            }
          </div>

          <div
            style={{
              marginTop: isMobile
                ? "70px"
                : "120px",

              opacity: 0.2,

              fontSize: "10px",

              letterSpacing:
                "4px",

              animation:
                "pulse 2.4s ease-in-out infinite",
            }}
          >
            {isMobile
              ? "SWIPE UP TO ENTER"
              : "SCROLL TO ENTER"}
          </div>
        </div>
      )}

      {showGate && (
        <GateScreen
          onEnter={enterApp}
        />
      )}

      <div
        style={{
          position: "absolute",

          bottom: isMobile
            ? "20px"
            : "30px",

          left: isMobile
            ? "20px"
            : "40px",

          right: isMobile
            ? "20px"
            : "auto",

          fontSize: isMobile
            ? "9px"
            : "10px",

          opacity: 0.35,

          letterSpacing:
            "2px",

          textAlign: isMobile
            ? "center"
            : "left",

          lineHeight:
            isMobile
              ? "1.8"
              : "normal",
        }}
      >
        SYSTEM ACTIVE •
        EXPERIENCE NODE •
        READY
      </div>
    </div>
  );
}