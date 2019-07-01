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
rm -rf dist es esm

echo 'Compile JS...'
rollup -c scripts/rollup.config.js
echo 'Done.'
echo ''

echo 'Build ESM modules...'
NODE_ENV=esm babel src --out-dir esm --ignore 'src/**/*.spec.js'
rm -f esm/legacy-es.js esm/browser.js
echo "${BV_BANNER}" | cat - esm/index.js > esm/tmp.js && mv -f esm/tmp.js esm/index.js
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

echo 'Compile SCSS...'
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

echo 'Copying types from src/ to esm/ ...'
# There must be a better way to do this
#
# The following does not preserve the paths
#   shopt -s globstar
#   cp src/**/*.d.ts es
#
# So we resort to a find with exec
cd src
find . -type f -name '*.d.ts' -exec cp {} ../esm/{} ';'
cd ..
echo 'Done.'
echo ''

echo 'Done building assets.'
