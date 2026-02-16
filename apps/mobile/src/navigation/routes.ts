export const routes = {
  splash: "Splash",
  language: "Language",
  login: "Login",
  home: "Home",
  simulator: "Simulator",
  runtime: "Runtime",
  results: "Results",
  progress: "Progress",
  upgrade: "Upgrade",
  settings: "Settings"
} as const;

export type RouteName = (typeof routes)[keyof typeof routes];
