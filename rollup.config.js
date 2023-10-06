import commonjs from '@rollup/plugin-commonjs';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import typescript from '@rollup/plugin-typescript';
import cleanup from 'rollup-plugin-cleanup';
import copy from 'rollup-plugin-copy';
import styles from 'rollup-plugin-styles';
import del from 'rollup-plugin-delete'

const buildPath = 'dist';

export default [
  {
    input: 'src/extension.ts',
    treeshake: {
      moduleSideEffects: 'no-external',
    },
    output: {
      file: `${buildPath}/extension.js`,
      format: 'es',
      name: 'init',
      exports: 'default',
      assetFileNames: '[name][extname]',
    },
    external: ['resource:///*'],
    plugins: [
      del({ targets: 'dist/*' }),
      commonjs(),
      nodeResolve({
        preferBuiltins: false,
      }),
      typescript({
        tsconfig: './tsconfig.json',
      }),
      styles({
        mode: ['extract', `stylesheet.css`],
      }),
      copy({
        targets: [
          { src: './src/metadata.json', dest: `${buildPath}` }
        ],
      }),
      cleanup({
        comments: 'none',
      }),
    ],
  }
];
