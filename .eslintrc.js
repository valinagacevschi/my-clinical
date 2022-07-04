module.exports = {
    "env": {
        "browser": false,
        "es6": true,
        "node": true,
        "es2020": true,
        "jest": true
    },
    "extends": [
        "eslint:recommended",
        "plugin:react/recommended",
        "plugin:prettier/recommended",
        "plugin:@typescript-eslint/recommended"
    ],
    "globals": {
        "Atomics": "readonly",
        "SharedArrayBuffer": "readonly"
    },
    "parser": "@typescript-eslint/parser",
    "parserOptions": {
        "ecmaFeatures": {
            "jsx": true
        },
        "ecmaVersion": 2018,
        "sourceType": "module"
    },
    "plugins": [
        "react",
        "react-native",
        "react-hooks",
        "@typescript-eslint"
    ],
    "rules": {
        "react-hooks/rules-of-hooks": "error",
        "react-hooks/exhaustive-deps": [
            "warn", 
            {
                "additionalHooks": "useRecoilCallback"
            }
        ],
        "react-native/no-unused-styles": 2,
        "react-native/no-inline-styles": 2,
        "indent": [
            "error",
            2
        ],
        "explicit-module-boundary-types": [
            "off"
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
            "never"
        ],
        "jsx-quotes": [
            "error", 
            "prefer-single"
        ],
        "max-len": [
            "error",
            {
                "code": 120,
                "tabWidth": 2
            }
        ],
        "react-native/sort-styles": [
            "error",
            "asc",
            {
                "ignoreClassNames": false,
                "ignoreStyleProperties": false
            }
        ]
    }
};
