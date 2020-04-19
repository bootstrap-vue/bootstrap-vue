# Contributing

> 👍🎉 First off, thanks for taking the time to contribute! 🎉👍

## Playground & Issue reports

If you want to play with BootstrapVue components without any local setup just head to our
[Online Playground](https://bootstrap-vue.org/play) and you can interactively play and test
components with a fresh Vue instance. If you want to keep your changes or make PRs reporting a
component's misbehaviour you can save them to _CodePen_, _CodeSandbox_ or _JSFiddle_ and provide
that link in issues.

## Setup

- Clone this repo (`git clone https://github.com/bootstrap-vue/bootstrap-vue --branch=dev`)
- Make sure you have `node` & `yarn` installed locally
- `cd bootstrap-vue`
- Run `yarn install` to get all dependencies installed

## Work on components

If you want to hack and improve components locally, you can follow these steps:

- Run `yarn docs-dev` to run a local development server
- Head to `http://localhost:3000/play`
- Now you can locally make changes to components (they are located in the `components` directory)
  Changes will be applied with webpack hot-reloading without needing to reload the page
- Finally feel free to share your awesome hacks with others and opening a PR

## Test inside your project

If you want to see your changes in your project instead of the playground:

- Execute `yarn link` inside _bootstrap-vue_ directory
- In your project run `yarn link bootstrap-vue`
- Run `yarn watch` inside _bootstrap-vue_
- Now every time you change a component, a new production version will be built and ready on your
  project

## Pull requests

Please ensure all pull requests are made against the `dev` branch on GitHub. See the
[Conventional Commits](https://conventionalcommits.org/) spec for commit and PR naming guidelines.
This is very important, as the `CHANGELOG` is generated from these messages.

Examples:

- `fix(b-modal): fixes some broken modal stuff`
- `feat(b-table): add a feature to the table component`

## Financial contributions

We also welcome financial contributions in full transparency on our
[Open Collective](https://opencollective.com/bootstrap-vue). Anyone can file an expense. If the
expense makes sense for the development of the community, it will be "merged" in the ledger of our
open collective by the core contributors and the person who filed the expense will be reimbursed.

Consider asking your company to also support this open source project by
[becoming a sponsor](https://opencollective.com/bootstrap-vue/contribute/).

## Contributors

Thank you to all the people who have already contributed to BootstrapVue!

<div class="p-3 mb-3text-center">
  <a href="https://github.com/bootstrap-vue/bootstrap-vue/graphs/contributors" rel="noopener" class="d-inline-block"><img src="https://opencollective.com/bootstrap-vue/contributors.svg?width=890" class="img-fluid"></a>
</div>
