import SystemPanel from "../../components/SystemPanel";

export default function Vision() {
  return (
    <div
      style={{
        width: "100%",
      }}
    >
      <SystemPanel
        title="The Human Layer of the Internet"
        text={`Artificial intelligence is fundamentally changing the structure of the internet.

For the first time in history, non-human entities are becoming capable of imitating human behavior at global scale.

AI can already generate:
- text
- voice
- images
- video
- personality
- social interaction
- influence
- engagement
- identity

The boundary between human and synthetic presence is collapsing.

Current internet systems were never designed for a world where millions of autonomous AI entities participate alongside humans.

This creates one of the most important technological problems of the coming decades:

How do we distinguish authentic human presence from artificial intelligence?

THE CLUB exists to solve this problem.

We are building infrastructure for persistent human identity, decentralized reputation and AI-resistant trust systems.

The goal is not temporary verification.

The goal is building the human layer of the future internet.`}
      />

      <div
        style={{
          height:
            window.innerWidth <= 900
              ? "24px"
              : "32px",
        }}
      />

      <SystemPanel
        title="Persistent Identity & Reputation"
        text={`Most digital systems only verify temporary activity.

THE CLUB is focused on continuity.

We believe identity becomes trustworthy through:
- time
- consistency
- participation
- reputation
- behavioral history
- persistent presence

THE CLUB introduces a new model of digital identity where legitimacy is formed over long-term interaction instead of one-time verification.

Every action inside the ecosystem contributes to an evolving reputation layer tied to persistent identity.

This creates:
- stronger anti-sybil protection
- long-term trust accumulation
- AI-resistant participation systems
- decentralized social credibility
- reputation-based coordination

The future internet will not rely on anonymous temporary interaction.

It will rely on persistent human reputation systems.

THE CLUB is building the infrastructure for that transition.`}
      />
    </div>
  );
}