export const builderTitles = [
  "Terminal Wizard",
  "Protocol Pirate",
  "Merge Master",
  "Prompt Architect",
  "Latency Hunter",
  "Infinite Debugger",
  "Code Surfer",
  "Launch Machine",
  "Coffee Compiler",
  "Pixel Alchemist",
  "Open Source Nomad",
  "Night Deployer",
  "Recursive Thinker"
];

export function getRandomBuilderTitle(): string {
  return builderTitles[Math.floor(Math.random() * builderTitles.length)];
}
