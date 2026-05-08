import { NFT_COLLECTIONS } from "../../config/nftConfig";
import { useAppStore } from "../../store/useAppStore";

import bronzeImg from "../../assets/nfts/Bronze.jpg";
import silverImg from "../../assets/nfts/Silver.jpg";
import goldImg from "../../assets/nfts/Gold.jpg";
import diamondImg from "../../assets/nfts/Diamond.jpg";
import obsidianImg from "../../assets/nfts/Obsidian.jpg";

export default function NFT() {
  const {
    ownedNFTs,
    diamondEligible,
  } = useAppStore();

  const isMobile =
    window.innerWidth <= 900;

  const ownsNFT = (id) => {
    return ownedNFTs.find(
      (nft) => nft.id === id
    );
  };

  const images = {
    bronze: bronzeImg,
    silver: silverImg,
    gold: goldImg,
    diamond: diamondImg,
    obsidian: obsidianImg,
  };

  const mintLinks = {
    bronze:
      "https://highlight.xyz/mint/base:0x8C6Cd94E95BF6b561D030FbD49d851a9CE5511CF",

    silver:
      "https://highlight.xyz/mint/base:0x5180C480AE906B527DFdF6Cd557D7e895cE1e2C5",

    gold:
      "https://highlight.xyz/mint/base:0x353b8E401e7781aeBCC219389c84539ce5E31f80",

    diamond: "#",

    obsidian: "#",
  };

  const featured =
    NFT_COLLECTIONS[4];

  return (
    <div className="page">
      <div className="page-label">
        KEY ACCESS SYSTEM
      </div>

      <h1
        className="page-title"
        style={{
          fontSize: isMobile
            ? "44px"
            : undefined,

          lineHeight: isMobile
            ? "1"
            : undefined,
        }}
      >
        NFT ARCHIVE
      </h1>

      <div
        style={{
          maxWidth: "820px",

          marginBottom:
            isMobile
              ? "40px"
              : "60px",

          lineHeight: "2",

          opacity: 0.7,

          fontSize: isMobile
            ? "13px"
            : "14px",
        }}
      >
        The future will not ask what
        was created, but who was
        real. The line between
        artificial and human is
        collapsing. We are building
        the filter.
      </div>

      <div
        style={{
          display: "grid",

          gridTemplateColumns:
            isMobile
              ? "1fr"
              : "1.2fr 1fr",

          gap: isMobile
            ? "22px"
            : "28px",

          marginBottom: "40px",
        }}
      >
        <div
          className="terminal-card"
          style={{
            overflow: "hidden",

            position: "relative",

            minHeight: isMobile
              ? "auto"
              : "720px",

            padding: isMobile
              ? "18px"
              : undefined,

            border:
              "1px solid rgba(255,255,255,0.12)",

            background:
              "linear-gradient(to bottom, rgba(255,255,255,0.04), rgba(255,255,255,0.015))",
          }}
        >
          <img
            src={
              images[featured.id]
            }
            alt={featured.name}
            style={{
              width: "100%",

              height: isMobile
                ? "320px"
                : "560px",

              objectFit: "cover",

              objectPosition:
                "center",

              borderRadius:
                "20px",

              marginBottom:
                "32px",

              border:
                "1px solid rgba(255,255,255,0.08)",
            }}
          />

          <div
            style={{
              color:
                featured.color,

              fontSize: isMobile
                ? "28px"
                : "38px",

              fontWeight: 600,

              letterSpacing:
                "2px",

              marginBottom: "18px",
            }}
          >
            {featured.name}
          </div>

          <div
            style={{
              opacity: 0.76,

              lineHeight: "2",

              fontSize: isMobile
                ? "13px"
                : "14px",

              marginBottom: "32px",

              maxWidth: "90%",
            }}
          >
            {
              featured.description
            }
          </div>

          <div
            style={{
              display: "grid",

              gap: "14px",

              marginBottom: "38px",
            }}
          >
            <div className="nft-meta">
              DAILY GENERATION
              <span>
                +{" "}
                {
                  featured.pointsPerDay
                }
              </span>
            </div>

            <div className="nft-meta">
              SUPPLY
              <span>
                {" "}
                {
                  featured.supply
                }
              </span>
            </div>

            <div className="nft-meta">
              ACCESS
              <span>
                {" "}
                {
                  featured.mintType
                }
              </span>
            </div>
          </div>

          <button
            className="mint-button"
            disabled
            style={{
              marginTop: "0",

              width: "100%",

              padding:
                "20px 24px",

              fontSize: isMobile
                ? "12px"
                : "14px",

              letterSpacing:
                isMobile
                  ? "2px"
                  : "3px",

              fontWeight: 700,

              background:
                "rgba(255,255,255,0.92)",

              color: "#000",

              opacity: 0.92,

              cursor:
                "not-allowed",
            }}
          >
            APPLY FOR OBSIDIAN KEY
          </button>

          <div
            style={{
              marginTop: "16px",

              textAlign: "center",

              fontSize: "11px",

              letterSpacing:
                "3px",

              opacity: 0.38,
            }}
          >
            DISABLED UNTIL 08.09.2026
          </div>
        </div>

        <div
          style={{
            display: "grid",

            gridTemplateColumns:
              isMobile
                ? "1fr"
                : "1fr 1fr",

            gap: "22px",
          }}
        >
          {NFT_COLLECTIONS.filter(
            (nft) =>
              nft.id !==
              "obsidian"
          ).map((nft) => {
            const owned =
              ownsNFT(
                nft.id
              );

            return (
              <div
                key={nft.id}
                className="nft-card"
                style={{
                  border: owned
                    ? `1px solid ${nft.color}`
                    : "1px solid rgba(255,255,255,0.08)",

                  boxShadow: owned
                    ? `0 0 40px ${nft.color}22`
                    : "none",

                  padding:
                    isMobile
                      ? "16px"
                      : "18px",

                  background:
                    "linear-gradient(to bottom, rgba(255,255,255,0.035), rgba(255,255,255,0.015))",
                }}
              >
                <img
                  src={
                    images[nft.id]
                  }
                  alt={nft.name}
                  style={{
                    width: "100%",

                    height:
                      isMobile
                        ? "260px"
                        : "220px",

                    objectFit:
                      "cover",

                    objectPosition:
                      "center",

                    borderRadius:
                      "16px",

                    marginBottom:
                      "18px",

                    border:
                      "1px solid rgba(255,255,255,0.06)",
                  }}
                />

                <div
                  style={{
                    color:
                      nft.color,

                    fontSize:
                      isMobile
                        ? "18px"
                        : "20px",

                    fontWeight: 600,

                    marginBottom:
                      "12px",

                    letterSpacing:
                      "1px",
                  }}
                >
                  {nft.name}
                </div>

                <div
                  style={{
                    opacity: 0.62,

                    fontSize:
                      "12px",

                    lineHeight:
                      "1.9",

                    marginBottom:
                      "18px",

                    minHeight:
                      isMobile
                        ? "auto"
                        : "88px",
                  }}
                >
                  {
                    nft.description
                  }
                </div>

                <div
                  className="nft-meta"
                  style={{
                    marginBottom:
                      "8px",
                  }}
                >
                  DAILY
                  <span>
                    +{" "}
                    {
                      nft.pointsPerDay
                    }
                  </span>
                </div>

                <div
                  className="nft-meta"
                  style={{
                    marginBottom:
                      "16px",
                  }}
                >
                  SUPPLY
                  <span>
                    {" "}
                    {
                      nft.supply
                    }
                  </span>
                </div>

                {(nft.id ===
                  "bronze" ||
                  nft.id ===
                    "silver" ||
                  nft.id ===
                    "gold") && (
                  <a
                    href={
                      mintLinks[
                        nft.id
                      ]
                    }
                    target="_blank"
                    rel="noreferrer"
                    style={{
                      textDecoration:
                        "none",
                    }}
                  >
                    <button
                      className="mint-button"
                      style={{
                        marginTop:
                          "0",

                        padding:
                          "14px",

                        fontSize:
                          "12px",

                        letterSpacing:
                          "2px",
                      }}
                    >
                      ACCESS
                    </button>
                  </a>
                )}
              </div>
            );
          })}
        </div>
      </div>

      <div
        style={{
          marginTop: "40px",
        }}
      >
        <div className="section-label">
          BENEFITS
        </div>

        <div className="terminal-card">
          <div
            style={{
              lineHeight: "2.1",

              opacity: 0.8,

              fontSize: isMobile
                ? "13px"
                : "14px",
            }}
          >
            • Daily reputation generation based on key tier.

            <br />
            <br />

            • Persistent identity presence inside THE CLUB ecosystem.

            <br />
            <br />

            • Future access to hidden sections, governance systems, whitelist events and protocol drops.

            <br />
            <br />

            • Higher tier keys unlock deeper ecosystem privileges, expanded access layers and increased reputation multipliers.
          </div>
        </div>
      </div>
    </div>
  );
}