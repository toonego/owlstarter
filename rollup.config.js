import resolve  from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import babel    from 'rollup-plugin-babel';

export default {
  input: "src/js",
  output: {
    format: "iife",
    dir: "dist/js"
  },
  plugins: [
    resolve(),
    commonjs(),
    babel({
      presets: [
        [
          "@babel/preset-env",
          {
            modules: false
          }
        ]
      ],
      babelrc: false
    })
  ],
//   experimentalCodeSplitting: true
};
