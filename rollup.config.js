import babel from "@rollup/plugin-babel";
import commonjs from "rollup-plugin-commonjs";
import resolve from "rollup-plugin-node-resolve";
import terser from "@rollup/plugin-terser";
import meta from "./package.json" assert { type: "json" };

const config = {
  input: "src/index.js",
  external: Object.keys(meta.dependencies || {}).filter((key) =>
    /^chrt-/.test(key),
  ),
  output: {
    file: `dist/${meta.name}.js`,
    name: "chrt",
    format: "umd",
    indent: false,
    extend: true,
    exports: "named",
    banner: `// ${meta.name} v${
      meta.version
    } Copyright ${new Date().getFullYear()} ${meta.author}`,
    globals: Object.assign(
      {},
      ...Object.keys(meta.dependencies || {})
        .filter((key) => /^chrt-/.test(key))
        .map((key) => ({ [key]: "chrt" })),
    ),
  },
  plugins: [
    commonjs(),
    resolve(),
    babel({
      babelHelpers: "bundled",
      exclude: "node_modules/**",
      // sourceMaps: "both",
      babelrc: false,
    }),
  ],
};

export default [
  config,
  {
    ...config,
    output: {
      ...config.output,
      format: "esm",
      file: `dist/${meta.name}.esm.js`,
    },
    plugins: [...config.plugins],
  },
  {
    ...config,
    output: {
      ...config.output,
      file: `dist/${meta.name}.min.js`,
    },
    plugins: [
      ...config.plugins,
      terser({
        output: {
          preamble: config.output.banner,
        },
      }),
    ],
  },
  // {
  //   ...config,
  //   output: {
  //     ...config.output,
  //     format: 'cjs',
  //     file: `dist/${meta.name}.node.js`
  //   },
  //   plugins: [...config.plugins]
  // },
];
