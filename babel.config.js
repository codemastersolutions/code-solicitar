module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        targets: {
          node: 'current',
        },
      },
    ],
    '@babel/preset-typescript',
  ],
  plugins: [
    [
      'module-resolver',
      {
        alias: {
          '@config': './src/config',
          '@models': './src/domain/models',
          '@controllers': './src/framework/controllers',
          '@views': './src/framework/views',
          '@services': './src/infrastructure/services',
          '@repositories': './src/infrastructure/repositories',
        },
      },
    ],
  ],
  ignore: ['**/*.spec.ts', '**/*.test.ts'],
};
