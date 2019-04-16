### Describe the PR

A clear and concise description of what the pull request does.

### PR checklist

<!-- (Update "[ ]" to "[x]" to check a box) -->

**What kind of change does this PR introduce?** (check at least one)

- [ ] Bugfix
- [ ] Feature
- [ ] Enhancement
- [ ] ARIA accessibility
- [ ] Documentation update
- [ ] Other (please describe)

**Does this PR introduce a breaking change?** (check one)

- [ ] No
- [ ] Yes (please describe)

**The PR fulfills these requirements:**

- [ ] It's submitted to the `dev` branch, **not** the `master` branch
- [ ] When resolving a specific issue, it's referenced in the PR's title (i.e. `[...] (fixes #xxx[,#xxx])`, where "xxx" is the issue number)
- [ ] It should address only one issue or feature. If adding multiple features or fixing a bug and adding a new feature, break them into separate PRs if at all possible.
- [ ] The title should follow the [**Conventional Commits**](https://www.conventionalcommits.org/) naming convention (i.e. `fix(alert): not alerting during SSR render`, `docs(badge): update pill examples, fix typos`, `chore: fix typo in README`, etc). **This is very important, as the `CHANGELOG` is generated from these messages.**

**If new features/enhancement/fixes are added or changed:**

- [ ] Includes documentation updates (including updating the component's `package.json` for slot and event changes)
- [ ] New/updated tests are included and passing (if required)
- [ ] Existing test suites are passing
- [ ] The changes have not impacted the functionality of other components or directives
- [ ] ARIA Accessibility has been taken into consideration (Does it affect screen reader users or keyboard only users? Clickable items should be in the tab index, etc.)

**If adding a new feature, or changing the functionality of an existing feature, the PR's
description above includes:**

- [ ] A convincing reason for adding this feature (to avoid wasting your time, it's best to open a suggestion issue first and wait for approval before working on it)
