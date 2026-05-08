import { create } from "zustand";

export const useAppStore = create((set, get) => ({
  connected: false,

  points: 0,

  rank: "UNRANKED",

  identity: null,

  wallet: null,

  username: "",

  joinedAt: null,

  logs: [
    "SYSTEM BOOT SEQUENCE INITIALIZED",
    "IDENTITY NETWORK ONLINE",
    "PERSISTENT MEMORY LAYER ACTIVE",
  ],

  leaderboard: [],

  connectIdentity: (walletAddress) => {
    const state = get();

    if (state.connected) return;

    const short =
      walletAddress.slice(0, 6) +
      "..." +
      walletAddress.slice(-4);

    const generatedId =
      "NODE-" +
      Math.floor(Math.random() * 999999);

    const newUser = {
      id: Date.now(),

      wallet: walletAddress,

      rank: "#001",

      name: short,

      score: 100,

      status: "FOUNDING ENTITY",
    };

    set({
      connected: true,

      wallet: walletAddress,

      points: 100,

      rank: "INITIATE",

      identity: generatedId,

      username: "",

      joinedAt: new Date().toLocaleDateString(),

      leaderboard: [newUser],

      logs: [
        "WALLET CONNECTION VERIFIED",
        "IDENTITY REGISTRATION COMPLETE",
        "100 REPUTATION POINTS ASSIGNED",
        "FIRST LIVE ENTITY REGISTERED",
        ...state.logs,
      ],
    });
  },

  setUsername: (newName) => {
    const state = get();

    const updatedLeaderboard =
      state.leaderboard.map((user) => {
        if (user.wallet === state.wallet) {
          return {
            ...user,
            name: newName,
          };
        }

        return user;
      });

    set({
      username: newName,

      leaderboard: updatedLeaderboard,

      logs: [
        `IDENTITY NAME UPDATED: ${newName}`,
        ...state.logs,
      ],
    });
  },
}));