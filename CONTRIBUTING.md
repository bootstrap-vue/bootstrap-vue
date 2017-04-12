# Contributing

👍🎉 First off, thanks for taking the time to contribute! 🎉👍

### Playground & Issue Reports
If you want to play with BootstrapVue components without any local setup just head to
[OnlinePlayground](https://bootstrap-vue.github.io/play) and you can interactively play and test components with a fresh vue instance.
If you want to keep your changes or make PRs reporting components misbehaviour you can save them in JSFiddle and provide that link in issues.

### Setup
- Clone this repo.
- Make sure you have node & yarn installed locally.
- Run `yarn install` to get all dependencies installed.

### Work on components
If you want to hack and improve components locally, you can follow this steps:

- Run `yarn docs-dev` to run local development server.
- Head to `http://localhost:3000/play`.
- Now you can locally make changes to components (they are located at `components` directory). 
  Changes will be applied with webpack hot-reloading without need to reload page.
- Finally feel free to share your awesome hacks with others and opening a PR.

### Test inside your project
If you want to see your changes in your project instead of playground:

- Execute `yarn link` inside *bootstrap-vue* directory.
- In your project run `yarn link-bootstrap-vue`
- Run `yarn watch` inside *bootstrap-vue*
- Now every time you change a component, a new production version will be built and ready on your project. 
