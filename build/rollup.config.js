const fs = require("fs");
const path = require("path");
const vue = require("rollup-plugin-vue");
const babel = require("rollup-plugin-babel");
const resolve = require("rollup-plugin-node-resolve");
const commonjs = require("rollup-plugin-commonjs");
const CleanCSS = require("clean-css");
const { camelCase } = require("lodash");
const { name, dependencies } = require("../package.json");

const base = path.resolve(__dirname, "..");
const lib = path.resolve(base, "lib");
const dist = path.resolve(base, "dist");

// Ensure dist directory exists
if (!fs.existsSync(dist)) {
    fs.mkdirSync(dist);
}

module.exports = {
    input: path.resolve(lib, "index.js"),
    // Libs in `external` will not be bundled to dist,
    // since they are expected to be provided later.
    // We want to include Popper.js in the build, so we exclude it here.
    external: Object.keys(dependencies).filter(dep => dep !== "popper.js"),
    name,
    plugins: [
        vue({
            cssModules: {
                generateScopedName: "[name]__[local]"
            },
            css(style) {
                fs.writeFileSync(path.resolve(dist, `${name}.css`), new CleanCSS().minify(style).styles);
            }
        }),
        resolve({ external: ["vue"] }),
        commonjs(),
        babel()
    ],
    output: [
        {
            format: "cjs",
            name: camelCase(name),
            file: path.resolve(dist, name + ".common.js"),
            sourcemap: true
        },
        {
            format: "es",
            file: path.resolve(dist, name + ".esm.js"),
            sourcemap: true
        },
        {
            format: "umd",
            modulename: camelCase(name),
            file: path.resolve(dist, name + ".js"),
            sourcemap: true
        }
    ]
};
