import { nodeResolve } from '@rollup/plugin-node-resolve';
import typescript from '@rollup/plugin-typescript';
import wasm from '@rollup/plugin-wasm';

export default {
  input: 'src/main.ts',
  output: {
    dir: 'dist',
    format: 'es',
    inlineDynamicImports: true,
  },
  plugins: [
    nodeResolve(),
    typescript(),
    wasm({
      targetEnv: 'auto-inline',
      maxFileSize: 0,
    })
  ]
};
