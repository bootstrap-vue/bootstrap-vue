<!-- PULL REQUEST TEMPLATE -->

## Description of Pull Request:

Please replace this line with a detailed description of your pull request. If no description your PR
may be rejected.

## PR checklist:

<!-- (Update "[ ]" to "[x]" to check a box) -->

**What kind of change does this PR introduce?** (check at least one)

- [ ] Bugfix
- [ ] Feature
- [ ] Enhancement to an existing feature
- [ ] ARIA accessibility
- [ ] Documentation update
- [ ] Other, please describe:

**Does this PR introduce a breaking change?** (check one)

- [ ] Yes
- [ ] No

If yes, please describe the impact:

**The PR fulfills these requirements:**

- [ ] It's submitted to the `dev` branch, **not** the `master` branch
- [ ] When resolving a specific issue, it's referenced in the PR's title (i.e.
      `fixes #xxxx[,#xxxx]`, where "xxxx" is the issue number)
- [ ] The PR should address only one issue or feature. If adding multiple features or fixing a bug
      and adding a new feature, break them into separate PRs if at all possible.
- [ ] PR titles should following the
      [**Conventional Commits**](https://www.conventionalcommits.org/) naming convention (i.e.
      "fix(alert): not alerting during SSR render", "docs(badge): Updated pill examples, fix typos",
      "chore: fix typo in docs", etc). **This is very important, as the `CHANGELOG` is generated
      from these messages.**

**If new features/enhancement/fixes are added or changed:**

- [ ] Includes documentation updates (including updating the component's `package.json` for slot and
      event changes)
- [ ] New/updated tests are included and passing (if required)
- [ ] Existing test suites are passing
- [ ] The changes have not impacted the functionality of other components or directives
- [ ] ARIA Accessibility has been taken into consideration (does it affect screen reader users or
      keyboard only users? clickable items should be in the tab index, etc)

**If adding a new feature, or changing the functionality of an existing feature, the PR's
description above includes:**

- [ ] A convincing reason for adding this feature (to avoid wasting your time, it's best to open a
      suggestion issue first and wait for approval before working on it)
