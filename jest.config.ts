import type { Config } from "@jest/types";

const config: Config.InitialOptions = {
  preset: "ts-jest",
  testEnvironment: "node",

  // Test files location
  testMatch: ["**/__tests__/**/*.test.[jt]s", "**/?(*.)+(spec|test).[jt]s"],
  testPathIgnorePatterns: ["/node_modules/"],

  // Module file extensions
  moduleFileExtensions: ["ts", "js", "json", "node"],

  // Path aliases (must match your tsconfig.json)
  moduleNameMapper: {
    "^@/(.*)$": "./src/$1",
  },

  // Transform settings
  transform: {
    "^.+\\.ts$": "ts-jest",
  },

  // Coverage configuration
  //   collectCoverage: true,
  //   coverageDirectory: "coverage",
  //   coverageReporters: ["text", "lcov"],
  //   coveragePathIgnorePatterns: ["/node_modules/", "/__tests__/", "/build/"],

  // Setup files
  setupFilesAfterEnv: ["./jest.setup.ts"],

  // Clear mocks between tests
  clearMocks: true,

  // Verbose output
  verbose: true,
};

export default config;
