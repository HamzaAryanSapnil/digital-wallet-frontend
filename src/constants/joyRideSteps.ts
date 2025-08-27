import type { Step } from "react-joyride";

export const homeSteps = [
  {
    target: '[data-joy="dashboard-start"]',
    content: "Welcome! Click Dashboard to see your overview.",
    disableBeacon: true,
  },
];

// "/user/overview": "joy-user-overview",
//   "/user/me": "joy-user-profile",
//   "/user/send-money": "joy-send-money",
//   "/user/withdraw": "joy-withdraw",
//   "/user/transaction-history": "joy-transaction-history",
//   "/dashboard/overview": "joy-dashboard-overview",
export const dashboardSteps: Step[] = [
  {
    target: '[data-joy="joy-dashboard-overview"]',
    content: "This is your dashboard overview: wallet balance and totals.",
  },
  {
    target: '[data-joy="joy-send-money"]',
    content: "Here you can send money.",
  },
  {
    target: '[data-joy="joy-joy-withdraw"]',
    content: "Here you can withdraw your money",
  },
  {
    target: '[data-joy="joy-transaction-history"]',
    content: "You can see full history here or manage transactions.",
  },
  {
    target: '[data-joy="joy-user-profile"]',
    content: "You can see full details in your profile",
  },
];
