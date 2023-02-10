import typescript from "@rollup/plugin-typescript";
import tsConfigPaths from "rollup-plugin-ts-paths";

export default {
  input: "src/index.ts",
  output: {
    path: "dist",
    dir: "dist/lib",
    format: "cjs",
  },
  plugins: [typescript(), tsConfigPaths()],
};
