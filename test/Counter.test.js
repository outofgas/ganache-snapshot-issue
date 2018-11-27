"use strict";

const Counter = artifacts.require("Counter.sol");


contract("Counter", () => {
    let counter, snapshotId;

    const snapshotCreate = () => {
        snapshotId = web3.currentProvider.send({
            jsonrpc: "2.0",
            method: "evm_snapshot",
            id: Date.now() + 1
        }).result;
    };

    const snapshotRevert = () => {
        web3.currentProvider.send({
            jsonrpc: "2.0",
            method: "evm_revert",
            params: [snapshotId],
            id: Date.now() + 1
        });
    };

    before("deployment", async () => {
        counter = await Counter.new();
    });

    for (let i = 1; i <= 3; ++i) {
        it(`run #${i} should work`, async () => {
            snapshotCreate();
            let n1 = (await counter.n()).toNumber();  // should be 42
            await counter.inc();
            let n2 = (await counter.n()).toNumber();  // should be 42+1
            snapshotRevert();
            let n3 = (await counter.n()).toNumber();  // should be 42 again
            assert.equal(n1, 42, "Value of n1");
            assert.equal(n2, 43, "Value of n2");
            assert.equal(n3, 42, "Value of n3");
        });
    }

});
