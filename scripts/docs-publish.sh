#!/usr/bin/env bash
set -e

git config --global user.email vuebootstrap@gmail.com
git config --global user.name BootstrapVue

# Generate the docs
yarn docs-gen

# Publish the docs
gh-pages -t -d docs-dist -b master -r git@github.com:bootstrap-vue/bootstrap-vue.github.io.git
