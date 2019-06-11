# B.S. Bot

## To do

- Add templates to the database and API
- Add vocab listings to the database and API
- Combine adjectives and adverbs into one object
- Put these dictionaries into an actual SQL database
- Add phrases (with different suggested tags), proper nouns (with associated types of pronouns)
- Add tests
- Add Typescript JSON validation for the API
  - https://github.com/mojotech/json-type-validation/tree/master/docs
  - https://github.com/typestack/class-validator#installation
  - https://medium.com/@ottoki/runtime-type-checking-with-io-ts-in-typescript-14465169fb02
- Figure out the template validation story
  - does the API deal with strings or ParsedTemplate objects?
  - how to prevent creation of invalid templates? should they even be protected against?
  - how to prevent selecting a random invalid template?
  - how to handle when the template definition changes in a breaking way?
  - how to handle when there are no vocab words to fill in?

# Starter kit

## Includes

- Typescript
- React frontend
- Express backend
- "client" and "server" sibling directories
- "shared" directory for client/server shared code
- Restyped for end-to-end typed REST APIs

## Not included/Yet to add

- Absolute path imports
- Limit imports (server shouldn't look at client, client shouldn't look at server)
- Testing infrastructure, including Typescript syntax checking, build errors, linting
- Code coverage for tests
- Linting infrastructure for JS, accessibility, styles, templates, i18n, package.json ordering
- Lint-on-commit infrastructure
- Greenkeeper
- Travis CI
- Yarn policy
- Styled components
- i18n strings and pipeline
- Favicon placeholder
- Build-time variables like "app name" and stuff
- Performance testing for page load times
- Analytics library (Google Analytics, Mixpanel, Segment, etc.)
