#!/usr/bin/env bash
set -e

# Cleanup
rm -rf dist lib es

# ES build (es/)
BABEL_ENV=es babel -d es  -D --ignore '*.spec.js,*.json,fixtures' src/

# Rollup (dist/)
rollup -c scripts/rollup.config.js
rollup -c scripts/rollup.config.esm.js

# Uglify rollup build
uglify=`pwd`/node_modules/.bin/uglifyjs
cd dist

# We use --mangle but not --compress to reduce file size
# --compress unfortunately removes the 'imports' from the top of the ESM build
for f in *.js; do
    o=`echo $f | sed s/\.js/.min.js/`
    echo "$f ~> $o"
    $uglify $f --mangle --source-map -o $o
done
