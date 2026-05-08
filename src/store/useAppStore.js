import { create } from "zustand";

export const useAppStore =
  create((set) => ({
    wallet: null,

    username:
      "Unnamed Entity",

    points: 0,

    role: "Visitor",

    ownedNFTs: [],

    referralCode: "",

    referralEarnings: 0,

    invitedUsers: [],

    setWallet: (wallet) =>
      set({ wallet }),

    setUsername: (
      username
    ) =>
      set({
        username,
      }),

    setPoints: (points) =>
      set({
        points,
      }),

    setRole: (role) =>
      set({
        role,
      }),

    setOwnedNFTs: (
      ownedNFTs
    ) =>
      set({
        ownedNFTs,
      }),

    setReferralCode: (
      referralCode
    ) =>
      set({
        referralCode,
      }),

    setReferralEarnings: (
      referralEarnings
    ) =>
      set({
        referralEarnings,
      }),

    setInvitedUsers: (
      invitedUsers
    ) =>
      set({
        invitedUsers,
      }),
  }));