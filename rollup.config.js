import typescript from 'rollup-plugin-typescript2';

export default {
  input: 'main.ts',
  output: [
    {
      file: 'main.js',
      format: 'cjs',
      sourcemap: false,
    },
  ],
  plugins: [
    typescript({
      tsconfig: './tsconfig.json',
    }),
  ],
};
