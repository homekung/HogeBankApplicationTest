# How to run HogeBankApplicationTest

1. Clone this repo into your local directory (required git in your machine)
2. Install node js - https://nodejs.org/en/download/ (if you never install node js)
3. Open command line and navigate to your cloned directory
4. Install cypress (if you never install cypress)
```sh
npx cypress install
```
5. Option to change site url, edit file cypress.json
```sh
{
    "env": {
        "url": "https://anylogi-recruitment.web.app/"
      },
    "defaultCommandTimeout": 6000
}
```
6. Option to run test on command line
```sh
npx cypress run
```
or specific file (test suit) to run
```sh
npx cypress run --spec "cypress/integration/login_test.ts"
```
7. Option to run on Cypress UI
```sh
npx cypress open
```
You will see the test suit list, select any one you would like to run or run all
![image](https://user-images.githubusercontent.com/89236379/156918807-f30e1b18-e69d-4b89-a0d7-98bef7df0010.png)
