import { resolve as _resolve } from 'path';

export const entry = './src/index.ts';
export const output = {
  // eslint-disable-next-line no-undef
  path: _resolve(__dirname, 'dist'),
  filename: 'bundle.js',
};
export const module = {
  rules: [
    {
      test: /\.(webm)$/,
      use: [
        {
          loader: 'file-loader',
          options: {
            name: '[name].[ext]',
            outputPath: 'videos/',
          },
        },
      ],
    },
    {
      test: /\.tsx?$/,
      use: 'ts-loader',
      exclude: /node_modules/,
    },
  ],
};
export const resolve = {
  extensions: ['.tsx', '.ts', '.js'],
};
