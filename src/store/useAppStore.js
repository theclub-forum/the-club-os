import { create } from "zustand";

function calculateStatus(
  invitedUsers = []
) {
  if (
    invitedUsers.length >= 10
  ) {
    return "AMBASSADOR";
  }

  return "VISITOR";
}

export const useAppStore =
  create((set, get) => ({
    wallet: null,

    username:
      "Unnamed Entity",

    points: 0,

    role: "VISITOR",

    ownedNFTs: [],

    referralCode: "",

    referralEarnings: 0,

    invitedUsers: [],

    completedQuests: {},

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

        role:
          calculateStatus(
            invitedUsers
          ),
      }),

    setCompletedQuests: (
      completedQuests
    ) =>
      set({
        completedQuests,
      }),

    getStatus: () => {
      const {
        invitedUsers,
      } = get();

      return calculateStatus(
        invitedUsers
      );
    },
  }));