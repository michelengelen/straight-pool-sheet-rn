module.exports = {
  "env": {
    "browser": true,
    "es6": true,
    "amd": true
  },
  "extends": ["eslint:recommended", "plugin:react/recommended", "google"],
  "parserOptions": {
    "ecmaFeatures": {
      "jsx": true
    },
    "ecmaVersion": 2018,
    "sourceType": "module"
  },
  "plugins": [
    "react"
  ],
  "rules": {
    "indent": [
      "error",
      2,
      { "SwitchCase": 1 }
    ],
    "linebreak-style": [
      "error",
      "unix"
    ],
    "quotes": [
      "error",
      "single"
    ],
    "semi": [
      "error",
      "always"
    ],
    "no-case-declarations": [
      "off"
    ],
    "max-len": ["error", { "code": 120, "ignoreUrls": true }]
  }
};
