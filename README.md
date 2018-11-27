Issue
=====

Description
-----------

Writing unit tests for the Truffle test platform and running them on Ganache CLI, when

    1) an EVM snapshot is created,
    2) the EVM state changed,
    3) the EVM snapshot reverted back,
    4) a new EVM snapshot created,
    5) the EVM state changed again

the EVM ends up in a state which contains information from the first (reverted) state.


Steps to reproduce
------------------

1) Check out Truffle test project and to navigate into the repo and install dependencies

    ```
    git clone https://github.com/outofgas/ganache-snapshot-issue
    cd ganache-snapshot-issue
    npm install
    ```

2) Run the Truffle test suite on Truffle's internal test net

    ```
    node_modules/.bin/truffle test
    ```

   The tests should be successful.

3) Open a second terminal and navigate to the repo dir and start a Ganache CLI instance

    ```
    node_modules/.bin/ganache-cli
    ```

   Run the Truffle test suite on Ganache's test net

    ```
    node_modules/.bin/truffle test --network ganache
    ```

   The tests fail. Somehow, the state of an EVM snapshot created after reverting the previous one contains state information from the previous. This information becomes visible after the first transaction carried out on the new state.


Environment
-----------

* `uname -srm`

    ```
    FreeBSD 11.2-RELEASE amd64
    ```

* `node --version`

    ```
    v11.1.0
    ```

* `npm --version`

    ```
    6.4.1
    ```

* `truffle version`

    ```
    Truffle v4.1.14 (core: 4.1.14)
    Solidity v0.4.24 (solc-js)
    ```

* `ganache-cli --version`

    ```
    Ganache CLI v6.2.3 (ganache-core: 2.3.1)
    ```

