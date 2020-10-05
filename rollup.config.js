import peerDepsExternal from 'rollup-plugin-peer-deps-external';
import nodeResolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import babel from 'rollup-plugin-babel';
import { terser } from 'rollup-plugin-terser';
import packageData from './package.json';
import alias from '@rollup/plugin-alias';

const path = require('path');

const customResolver = nodeResolve({
  extensions: ['.js', '.jsx', '.json'],
});

const projectRootDir = path.resolve(__dirname);

export default {
  input: 'src/index.js',
  output: [
    {
      file: packageData.main,
      format: 'cjs',
      sourcemap: true,
    },
    {
      file: packageData.module,
      format: 'esm',
      sourcemap: true,
    },
  ],
  plugins: [
    alias({
      entries: [
        {
          find: 'src',
          replacement: path.resolve(projectRootDir, 'src'),
        },
      ],
      customResolver,
    }),
    peerDepsExternal(),
    nodeResolve({
      extensions: ['.js', '.jsx', '.json'],
    }),
    babel({
      presets: ['react-app'],
      plugins: [
        '@babel/plugin-proposal-class-properties',
        '@babel/plugin-proposal-object-rest-spread',
        '@babel/plugin-proposal-optional-chaining',
        '@babel/plugin-syntax-dynamic-import',
      ],
      exclude: 'node_modules/**',
      runtimeHelpers: true,
    }),
    commonjs(),
    terser(),
  ],
};
