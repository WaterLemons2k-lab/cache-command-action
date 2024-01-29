import typescript from "@rollup/plugin-typescript";
import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import json from "@rollup/plugin-json";

export default {
  input: "src/index.ts",
  output: {
    file: "dist/index.js",
    format: "cjs",
  },
  plugins: [
    typescript(),
    resolve({
      // https://github.com/uuidjs/uuid/issues/544#issuecomment-740394448
      exportConditions: ["node"],
    }),
    commonjs(),
    json(),
  ],
};
