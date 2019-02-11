pragma solidity 0.4.25;


contract Counter {

    uint public n = 42;

    function inc() public {
        n += 1;
    }

}

