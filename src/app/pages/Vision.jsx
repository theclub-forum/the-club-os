import SystemPanel from "../../components/SystemPanel";

export default function Vision() {
  return (
    <div
      style={{
        width: "100%",
      }}
    >
      <SystemPanel
        title="The AI Identity Crisis"
        text={`Artificial intelligence is dissolving the boundary between authentic and synthetic digital presence.

Images are no longer proof of humanity.

Voice is no longer proof of humanity.

Text is no longer proof of humanity.

Style itself is becoming reproducible.

The internet is entering a period where identity can be infinitely simulated, cloned and automated.

THE CLUB exists as a response to this transition.

We are building systems where identity is not static profile data, but something that forms over time through continuity, participation, reputation and persistent behavioral history.`}
      />

      <div
        style={{
          height: window.innerWidth <= 900
            ? "24px"
            : "32px",
        }}
      />

      <SystemPanel
        title="Persistent Digital Presence"
        text={`Most systems only verify temporary activity.

We are interested in continuity.

THE CLUB introduces the idea of persistent digital presence — an evolving identity structure that gains legitimacy through time, interaction and traceable participation.

The objective is not simply proving ownership.

The objective is proving historical existence inside digital space.`}
      />
    </div>
  );
}