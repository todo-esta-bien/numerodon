import typescript from "@rollup/plugin-typescript";
import terser from "@rollup/plugin-terser";

const plugins = [typescript(), terser()];

export default [
  {
    input: "src/index.ts",
    output: {
      dir: "dist",
      format: "es",
      sourcemap: true,
    },
    plugins,
  },
  {
    input: "src/index.ts",
    output: {
      file: "dist/index.min.js",
      format: "es",
      sourcemap: true,
    },
    plugins,
  },
];
