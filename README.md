## Description of project

For Final project initial work around I choose provided website from Viacheslav Levkoniuk, our guru in test Automatization.

For website test used >>> https://new.fophelp.pro/

# How to initialize project  

run >>> 'npm i' (terminal command to initialize all necessary configs for the project)

Technologies used:
   - Typescript
   - Playwright test
   - allure reports
   - API testing (all tokens during test launch saved under state.json)
   - CI workflow

# How to run tests

For UI tests use >>>

    - npm run test:ui
    - npm run allure:generate
    - npm run allure:open

For API tests use >>>

    - npm run test:api
    - npm run allure:generate
    - npm run allure:open

For ALL tests >>> npm run test

## plan for future

- experiment with contract tests for website
- additional API tests 
- improve code to avoid test flakiness in UI
