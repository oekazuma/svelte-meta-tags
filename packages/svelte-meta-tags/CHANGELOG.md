# svelte-meta-tags

## 4.0.1

### Patch Changes

- 6c52d8b: Remove `{#key}` that was used reactivity, as it is no longer necessary

## 4.0.0

### Major Changes

- 30f9180: Update twitter meta tags to the latest spec.
  https://developer.x.com/en/docs/x-for-websites/cards/overview/player-card
- 30f9180: Supports Svelte 5! And Svelte 3 and Svelte 4 are no longer supported
- 30f9180: Add `deepMerge` function that allows deep merging of objects

## 3.1.4

### Patch Changes

- eedec7d: add title attribute to Link type

## 3.1.3

### Patch Changes

- f595784: chore: package provenance

## 3.1.2

### Patch Changes

- fffe615: Fix reactivity of title tag

## 3.1.1

### Patch Changes

- 88528fe: Fix to not generate an empty `<title>` tag if no title is set

## 3.1.0

### Minor Changes

- e0503fc: Add support to keywords meta tag

## 3.0.4

### Patch Changes

- 336767f: fix: additionalMetaTags types

## 3.0.3

### Patch Changes

- 01453f0: chore: modified to include README.md as a release target at release time, Again

## 3.0.2

### Patch Changes

- 2070b2a: chore: fix to include README.md as a release target at the time of release

## 3.0.1

### Patch Changes

- edeb45b: fix: Fix incorrect type definitions and openGraph rendering
- edeb45b: fix: openGraph.site_name has been renamed to openGraph.siteName

## 3.0.0

### Major Changes

- 5ab9f93: feat: Overhaul `robots`
- 5ab9f93: feat: Improved type definitions
- 5ab9f93: feat: remove the `googlebot` tag

## 2.8.0

### Minor Changes

- 6c0f23e: feat: support Svelte4

### Patch Changes

- ad62f4f: chore: migration svelte.d.ts generation to be done by svelte-package

## 2.7.2

### Patch Changes

- 1368af8: fix: fix a release error. Do not use v2.7.1!

## 2.7.1

### Patch Changes

- 153909d: chore: improved exports in package.json
- b7d57cc: chore: change release method to Changesets

## [2.7.0](https://github.com/oekazuma/svelte-meta-tags/compare/v2.6.5...v2.7.0) (2023-03-10)

- allow array in JSON-LD schema ([d805767](https://github.com/oekazuma/svelte-meta-tags/commit/d8057677a9af816e34478620232b935058cede39))
- update dependency schema-dts to ^1.1.2 ([92d1be3](https://github.com/oekazuma/svelte-meta-tags/commit/92d1be388ba7ca8619fd0700bcba7bee0b177b73))

## [2.6.5](https://github.com/oekazuma/svelte-meta-tags/compare/v2.6.4...v2.6.5) (2023-01-19)

- rewrite document text for clarity([892bcb3](https://github.com/oekazuma/svelte-meta-tags/commit/892bcb302763d80089cfeb34b34bfbd33269cbf0))

## [2.6.4](https://github.com/oekazuma/svelte-meta-tags/compare/v2.6.3...v2.6.4) (2022-11-16)

- add Svelte to peerDependencies([2d99894](https://github.com/oekazuma/svelte-meta-tags/commit/2d9989454e5ed51d9f4d0d9e9300ba933d0c0ffa))

## [2.6.3](https://github.com/oekazuma/svelte-meta-tags/compare/v2.6.2...v2.6.3) (2022-08-31)

- add schema-dts to dependencies([9824e38](https://github.com/oekazuma/svelte-meta-tags/commit/9824e388728e37009aa06f56642ec4a2b9520921))

## [2.6.2](https://github.com/oekazuma/svelte-meta-tags/compare/v2.6.1...v2.6.2) (2022-08-11)

- trim production dependencies([2008183](https://github.com/oekazuma/svelte-meta-tags/commit/2008183b0a712cc6288e188cabdb14c85f93b0ee))

## [2.6.1](https://github.com/oekazuma/svelte-meta-tags/compare/v2.6.0...v2.6.1) (2022-05-27)

- clean up JSON-LD ([16d107c](https://github.com/oekazuma/svelte-meta-tags/commit/16d107c09546ffd6b2f8312a6851d46bd0da6ae1))

# [2.6.0](https://github.com/oekazuma/svelte-meta-tags/compare/v2.5.5...v2.6.0) (2022-05-16)

### Features

- allow all public type definitions to be retrieved ([3e04e2f](https://github.com/oekazuma/svelte-meta-tags/commit/3e04e2fd8ff8446709a7d015b5819971cb42765d))

## [2.5.5](https://github.com/oekazuma/svelte-meta-tags/compare/v2.5.4...v2.5.5) (2022-05-06)

### Bug Fixes

- revert JSON.stringify options back to previous ([5160cec](https://github.com/oekazuma/svelte-meta-tags/commit/5160cec32f50a29a8e59aa87f851557444ad26a3))

## [2.5.4](https://github.com/oekazuma/svelte-meta-tags/compare/v2.5.3...v2.5.4) (2022-05-06)

### Bug Fixes

- obfuscate by concatenating script tag ([fa9d409](https://github.com/oekazuma/svelte-meta-tags/commit/fa9d40960afc8b06d4aadc6a958fc05b6b15a96c))

## [2.5.3](https://github.com/oekazuma/svelte-meta-tags/compare/v2.5.2...v2.5.3) (2022-05-06)

- escaping content in script tags ([25bf038](https://github.com/oekazuma/svelte-meta-tags/commit/25bf038a485697249ecc9633166599b0652f3550))

## [2.5.2](https://github.com/oekazuma/svelte-meta-tags/compare/v2.5.1...v2.5.2) (2022-05-06)

- version bump for package

## [2.5.1](https://github.com/oekazuma/svelte-meta-tags/compare/v2.5.0...v2.5.1) (2022-03-22)

### Bug Fixes

- fix title to be reactive([a19d30b](https://github.com/oekazuma/svelte-meta-tags/commit/a19d30bad9938d78360aea126012bfd7061fff3f))

# [2.5.0](https://github.com/oekazuma/svelte-meta-tags/compare/v2.4.0...v2.5.0) (2022-03-19)

### Features

- add titleTemplate property ([3a252e5](https://github.com/oekazuma/svelte-meta-tags/commit/3a252e5783d04456e32539d8bd3ca7646809fd0d))

# [2.4.0](https://github.com/oekazuma/svelte-meta-tags/compare/v2.3.4...v2.4.0) (2022-03-12)

### Features

- add a property that allows selection of whether to output JSON-LD in the head or in the body ([91c9c38](https://github.com/oekazuma/svelte-meta-tags/commit/91c9c3861d5cc9168a6b3d90c2cf734f5c03f890))

## [2.3.4](https://github.com/oekazuma/svelte-meta-tags/compare/v2.3.3...v2.3.4) (2022-03-03)

### Bug Fixes

- add pnpm build to release command ([1c01f61](https://github.com/oekazuma/svelte-meta-tags/commit/1c01f619c5cd1dee51c58f4067fd315907fb4753))

## [2.3.3](https://github.com/oekazuma/svelte-meta-tags/compare/v2.3.2...v2.3.3) (2022-03-03)

### Bug Fixes

- fix tsconfig.json ([bd54216](https://github.com/oekazuma/svelte-meta-tags/commit/bd542167bc0f377157d7337b9eb2e9b58d63a625))

## [2.3.2](https://github.com/oekazuma/svelte-meta-tags/compare/v2.3.1...v2.3.2) (2022-02-28)

### Bug Fixes

- **deps:** update dependency schema-dts to v1.1.0 ([d57c99d](https://github.com/oekazuma/svelte-meta-tags/commit/d57c99d89b5071e1e2045892ee2814a7105251ce))

## [2.3.1](https://github.com/oekazuma/svelte-meta-tags/compare/v2.3.0...v2.3.1) (2022-02-25)

### Bug Fixes

- fix lint error in `@typescript-eslint/no-empty-interface` ([6f41cc4](https://github.com/oekazuma/svelte-meta-tags/commit/6f41cc4e0d0022b1be6c778d4520bdd7b0188127))

# [2.3.0](https://github.com/oekazuma/svelte-meta-tags/compare/v2.2.3...v2.3.0) (2022-01-28)

### Features

- add twitter title description image imageAlt ([e3270f5](https://github.com/oekazuma/svelte-meta-tags/commit/e3270f54fda56483a192d34dfc9d589c7949fc5b))

## [2.2.3](https://github.com/oekazuma/svelte-meta-tags/compare/v2.2.2...v2.2.3) (2022-01-14)

### Bug Fixes

- fix path to type definitions ([7c49639](https://github.com/oekazuma/svelte-meta-tags/commit/7c49639c1f08fe6ee6ea3e036c9982b1c1979c77))

## [2.2.2](https://github.com/oekazuma/svelte-meta-tags/compare/v2.2.1...v2.2.2) (2021-12-26)

### Bug Fixes

- revert changes so that npm and yarn can also be used for installation ([f536977](https://github.com/oekazuma/svelte-meta-tags/commit/f536977550948f675f4207b80dc5aca96cc535a0))

## [2.2.1](https://github.com/oekazuma/svelte-meta-tags/compare/v2.2.0...v2.2.1) (2021-12-21)

### Bug Fixes

- make the schema property of jsonLdProps not mandatory ([15f00f9](https://github.com/oekazuma/svelte-meta-tags/commit/15f00f9940fdcb8ac9a8c8f6ed51782bd5789ebd))

# [2.2.0](https://github.com/oekazuma/svelte-meta-tags/compare/v2.1.0...v2.2.0) (2021-12-17)

### Features

- improved Twitter's CardType type definition ([13b11fd](https://github.com/oekazuma/svelte-meta-tags/commit/13b11fd2e9f6625e1cd0802e825f312f37988666))

# [2.1.0](https://github.com/oekazuma/svelte-meta-tags/compare/v2.0.0...v2.1.0) (2021-11-04)

### Features

- allow title to be dynamically changed ([b9acefb](https://github.com/oekazuma/svelte-meta-tags/commit/b9acefbea7c64b5434837ffecc17423dcf0ce2d3))

# [2.0.0](https://github.com/oekazuma/svelte-meta-tags/compare/v1.2.2...v2.0.0) (2021-09-18)

### chore

- change name the MetaTags export ([d40b535](https://github.com/oekazuma/svelte-meta-tags/commit/d40b535249be8b629ba1034358865aa08993927c))
- remove jsonLd property from MetaTags component ([a05ae2b](https://github.com/oekazuma/svelte-meta-tags/commit/a05ae2b72a8605253a50249e8f76ee76cbe1411d))

### BREAKING CHANGES

- Change the way import is written.
- Remove jsonLd parameter from MetaTags component.
  Please use the JsonLd component from now on.

## [1.2.2](https://github.com/oekazuma/svelte-meta-tags/compare/v1.2.1...v1.2.2) (2021-09-07)

### Bug Fixes

- fix types in package.json ([7be485a](https://github.com/oekazuma/svelte-meta-tags/commit/7be485a880203ce2038ea91768031fbbf66d32b5))

## [1.2.1](https://github.com/oekazuma/svelte-meta-tags/compare/v1.2.0...v1.2.1) (2021-09-07)

### Bug Fixes

- restore the emitTypes setting of package ([20d8a85](https://github.com/oekazuma/svelte-meta-tags/commit/20d8a85ab0f76a1a7c270cdf3a1062eb83c1aa59))

# [1.2.0](https://github.com/oekazuma/svelte-meta-tags/compare/v1.1.1...v1.2.0) (2021-09-07)

### Features

- import types to make them easier to use ([cdceda7](https://github.com/oekazuma/svelte-meta-tags/commit/cdceda73204d668f80cb2773b73e252e53d0d6a1))

## [1.1.1](https://github.com/oekazuma/svelte-meta-tags/compare/v1.1.0...v1.1.1) (2021-09-02)

### Bug Fixes

- update package.json ([cd0574c](https://github.com/oekazuma/svelte-meta-tags/commit/cd0574cf04050d3f8a031556ff20628aa390c671))

# [1.1.0](https://github.com/oekazuma/svelte-meta-tags/compare/v1.0.5...v1.1.0) (2021-08-30)

### Features

- separate JSON-LD from MetaTags component ([43698ab](https://github.com/oekazuma/svelte-meta-tags/commit/43698ab9b98781f3b9ff246640c1e29ab772ba75))

## [1.0.5](https://github.com/oekazuma/svelte-meta-tags/compare/v1.0.4...v1.0.5) (2021-08-30)

### Bug Fixes

- **deps:** update dependency schema-dts to v1 ([a13737a](https://github.com/oekazuma/svelte-meta-tags/commit/a13737a621d0a199b18dea55324b06ff9478fce1))

## [1.0.4](https://github.com/oekazuma/svelte-meta-tags/compare/v1.0.3...v1.0.4) (2021-08-27)

### Bug Fixes

- pkgRoot settings to semantic-releas ([c52e674](https://github.com/oekazuma/svelte-meta-tags/commit/c52e674e9240cc61eb4cbe062f483f96dbf02b1a))

## [1.0.3](https://github.com/oekazuma/svelte-meta-tags/compare/v1.0.2...v1.0.3) (2021-08-27)

### Bug Fixes

- change branch to branches ([0c4c0e3](https://github.com/oekazuma/svelte-meta-tags/commit/0c4c0e346ee63648bc771033b828a19324739d68))
- change commitlint type-enum ([0b84c33](https://github.com/oekazuma/svelte-meta-tags/commit/0b84c33e32b1e59c8a7deb3e45d6cece28069eaa))
