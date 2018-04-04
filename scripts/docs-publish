#!/usr/bin/env bash
set -e

yarn docs-gen

git config --global user.email vuebootstrap@gmail.com
git config --global user.name BootstrapVue

mkdir -p ~/.ssh
chmod 600 ~/.ssh
ssh-keyscan github.com >> ~/.ssh/known_hosts

gh-pages -t -d docs-dist -b master -r git@github.com:bootstrap-vue/bootstrap-vue.github.io.git
