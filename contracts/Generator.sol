// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;
pragma experimental ABIEncoderV2;

import "hardhat/console.sol";

/// @title 
/// @author J. Carrero
contract Generator {
    // Researcher information
    struct Researcher {
        string orcid;
        bool registered;
    }
    mapping(address => Researcher) researchers;
    
    // Instance information
    struct Instance {
        uint id;
        string chain;
        uint dateCreated;
        string solution;
        bool solved;
        uint dateSolution;
    }
    mapping(address => Instance) instances;

    // VRF variables
    bytes32 internal keyHash;
    uint256 internal fee;
    uint256 public randomResult;

    // General variables
    address owner;
    uint nonce;
    uint idInstance;
    
    // MAX-3SAT variables
    uint[] symbols;  
    uint p;
    uint q;
    uint clausesLength;
    
    /// @notice Main constructor
    constructor(uint _p, uint _q) {
        p = _p;
        q = _q;
        owner = msg.sender;
        nonce = 0;
        idInstance = 0;
        clausesLength = 3;
    }
    
    // Modifiers
    modifier alreadyRegistered () {
        if(researchers[msg.sender].registered)
            revert("This address is already registered");
        _;
    }
    
    modifier mustRegister () {
        require(researchers[msg.sender].registered, "You must be registered");
        _;
    }
    
    // ---------------------------------- General functions ----------------------------------
    
    /// @notice Registers a new Researcher 
    function regResearcher(string memory _orcid) external {
        researchers[msg.sender] = Researcher(_orcid, true);
    }

    /// @notice Get instance
    function getInstance() public view returns (uint, string memory, uint, string memory, uint){
        return (instances[msg.sender].id, instances[msg.sender].chain, instances[msg.sender].dateCreated, instances[msg.sender].solution, instances[msg.sender].dateSolution);
    }
    
    /// @notice Set the solution for the last instance
    function solveLastInstance(string memory _solution) external {
        instances[msg.sender].solution = _solution;
        instances[msg.sender].solved = true;
        instances[msg.sender].dateSolution = block.timestamp;
    }
    
    // ------------------------------- MAX-3SAT functions --------------------------------
    
    /// @notice Generates a new Instance from A generator
    function createAInstance() external {
        //require(instances[msg.sender].solved, "Last instance is not solved");
        string memory fi = ""; // empty initialitation
        symbols.push(symbols.length);
        for(uint i = 0; i < 2; i++)
            if(random(100) < p) // [0, 99] < p
                symbols.push(symbols.length);  
        
        fi = conca(fi, createClause(), "", "");
        uint iterations = 0;
        while(random(100) < q && iterations < 150){ // [0, 99] < q
            for(uint i = 0; i < 3; i++)
                if(random(100) < p) // [0, 99] < p
                    symbols.push(symbols.length);  
            
            fi = conca(fi, " ^ ", createClause(), "");
            iterations++;
        }
        instances[msg.sender] = Instance(idInstance, fi, block.timestamp, "Unresolved", false, 0);
        idInstance++;
    }

    /// @notice Generates a new Instance from B generator
    function createBInstance() external {
        //require(instances[msg.sender].solved, "Last instance is not solved");
        string memory fi = ""; // empty initialitation
        symbols.push(symbols.length);
        uint numClauses = 0;         
        uint iterations = 0;
        while(random(100) < q && iterations < 150){
            numClauses++;
            iterations++;
        }

        for(uint i = 0; i < 3*numClauses-1; i++){
            if(random(100) < p) // [0, 99] < p
                symbols.push(symbols.length); 
        }
        // We create the first clause separately cause it's special
        fi = conca(fi, createClause(), "", "");
        for(uint i = 0; i < numClauses; i++)
            fi = conca(fi, " ^ ", createClause(), ""); 
        
        instances[msg.sender] = Instance(idInstance, fi, block.timestamp, "Unresolved", false, 0);
        idInstance++;
    }
    
    // @notice Creates a new clause
    function createClause() internal returns (string memory) {
        string memory c = "(";
        for(uint i = 0; i < clausesLength; i++){
            if(random(100) < 50) // [0, 9] < 5 => 50% probability
                c = conca(c, "x", intToString(symbols[random(symbols.length)]), "");
            else
                c = conca(c, "~", "x", intToString(symbols[random(symbols.length)]));
            // We need to add a new symbol in every iteration except for the last one
            if(i < clausesLength-1)
                c = conca(c, " v ", "", "");
        }
        c = conca(c, ")", "", "");
        return c;
    }

    function conca(string memory s1, string memory s2, string memory s3, string memory s4) internal pure returns (string memory) {
        return string(abi.encodePacked(s1, s2, s3, s4));
    }
   
    // -------------------------------- Support functions --------------------------------

    function getResearcher() public view returns (string memory){
        return researchers[msg.sender].orcid;
    }
    
    function getLastHash() public view returns (string memory){
        return instances[msg.sender].solution;
    }

    function getSymbolArray() public view returns (uint[] memory){
       return symbols;
    }
    
    function intToString(uint _i) internal pure returns (string memory _uintAsString) {
        if (_i == 0) {
            return "0";
        }
        uint j = _i;
        uint len;
        while (j != 0) {
            len++;
            j /= 10;
        }
        bytes memory bstr = new bytes(len);
        uint k = len;
        while (_i != 0) {
            k = k-1;
            uint8 temp = (48 + uint8(_i - _i / 10 * 10));
            bytes1 b1 = bytes1(temp);
            bstr[k] = b1;
            _i /= 10;
        }
        return string(bstr);
    }
    
    /// @notice Generates a random number within an interval
    /// @param _interval upper index of the (open) interval of the random value
    /// @dev now, msg.sender and nonce are the timestamp of the block, who made the call and an incremental number respectively
    /// @return The number generated
    function random(uint _interval) internal returns (uint) {
        uint randNumber = uint(keccak256(abi.encodePacked(block.timestamp, msg.sender, nonce))) % _interval;
        nonce++;
        return randNumber;
    }
}