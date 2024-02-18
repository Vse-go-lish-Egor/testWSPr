module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    [
      'module:react-native-dotenv',
      {
        moduleName: '@env',
        path: './.env',
        blocklist: null,
        allowlist: null,
        safe: false,
        systemvars: false,
        silent: false,
        defaults: false,
      },
    ],
  ],
};
