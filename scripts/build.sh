#!/usr/bin/env bash
set -e

BV_VERSION=$(node -p "require('./package.json').version")
BV_BANNER=$(node -p "require('./scripts/banner')")

echo "Building BootstrapVue ${BV_VERSION}"
echo ''

echo 'Checking plugin metadata...'
node -r esm scripts/check-plugin-meta.js || exit 1
echo 'Done.'
echo ''

# Cleanup
rm -rf dist es

echo 'Compile JS...'
rollup -c scripts/rollup.config.js
echo 'Done.'
echo ''

echo 'Build ES modules...'
NODE_ENV=es babel src --out-dir es --ignore 'src/**/*.spec.js'
echo "${BV_BANNER}" | cat - es/index.js > es/tmp.js && mv es/tmp.js es/index.js
echo 'Done.'
echo ''

echo 'Minify JS...'
terser dist/bootstrap-vue.js \
       --compress typeofs=false \
       --mangle --comments "/^!/" \
       --source-map "content=dist/bootstrap-vue.js.map,includeSources,url=bootstrap-vue.min.js.map" \
       --output dist/bootstrap-vue.min.js
terser dist/bootstrap-vue.common.js \
       --compress typeofs=false \
       --mangle --comments "/^!/" \
       --source-map "content=dist/bootstrap-vue.common.js.map,includeSources,url=bootstrap-vue.common.min.js.map" \
       --output dist/bootstrap-vue.common.min.js
terser dist/bootstrap-vue.esm.js \
       --compress typeofs=false \
       --mangle \
       --comments "/^!/" \
       --source-map "content=dist/bootstrap-vue.esm.js.map,includeSources,url=bootstrap-vue.esm.min.js.map" \
       --output dist/bootstrap-vue.esm.min.js
echo 'Done.'
echo ''

echo 'Compile SASS...'
node-sass --output-style expanded \
          --source-map true \
          --source-map-contents true \
          --precision 6 \
          scripts/build.scss \
          dist/bootstrap-vue.css
postcss --config scripts/postcss.config.js \
        --replace dist/bootstrap-vue.css
echo 'Done.'
echo ''

echo 'Minify CSS...'
cleancss --level 1 \
         --format breaksWith=lf \
         --source-map \
         --source-map-inline-sources \
         --output dist/bootstrap-vue.min.css \
         dist/bootstrap-vue.css
echo 'Done.'
echo ''

echo 'Done building assets.'
