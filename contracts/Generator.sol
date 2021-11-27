// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;
pragma experimental ABIEncoderV2;

/// @title 
/// @author J. Carrero
contract Generator {
    // Researcher information
    struct Researcher {
        string name;
        string email;
        bool registered;
        uint[] idInstance;
    }
    mapping(uint => Researcher) researchers; // secret => researcher

    // Linked information
    struct Link {
        uint secret;
    }
    mapping(uint => Link) links; // orcid => secret
    
    // Instance information
    struct Instance {
        uint id;
        uint[] chain;
        uint size;
        uint dateCreated;
        string solution;
        bool solved;
        uint dateSolution;
    }
    mapping(uint => Instance) instances; // id => instance

    // VRF variables
    bytes32 internal keyHash;
    uint256 internal fee;
    uint256 public randomResult;

    // General variables
    address owner;
    uint nonce;
    uint idInstance;
    
    // MAX-3SAT variables
    uint clausesLength;
    uint maxClauses;
    uint[] public prepositions;
    
    /// @notice Main constructor
    constructor() {
        owner = msg.sender;
        nonce = 0;
        idInstance = 0;
        clausesLength = 3;
        maxClauses = 50;
    }
    
    // ---------------------------------- General functions ----------------------------------

    /// @notice Registers a new Researcher 
    function setResearcher(uint _secret, string memory _name, string memory _email, uint _orcid) public {
        uint[] memory empty;
        researchers[_secret] = Researcher(_name, _email, true, empty);
        links[_orcid] = Link(_secret);
    }

    /// @notice Get all instances
    function getAllInstances(uint _orcid) public view returns (Instance[] memory) {
        uint secret = links[_orcid].secret;
        Instance[] memory result = new Instance[](researchers[secret].idInstance.length);
        for(uint i = 0; i < researchers[secret].idInstance.length; i++)
            result[i] = (instances[researchers[secret].idInstance[i]]);
        return result;
    }

    /// @notice Check the secret number
    function checkPass(uint _secret) public view returns (bool) {
        return researchers[_secret].registered;
    }
    
    /// @notice Set the solution for the _id instance
    function solveInstance(uint _secret, uint _id, string memory _solution) public returns (bool) {
        bool validResearcher = false;
        uint i = 0;
        while(validResearcher == false && i < researchers[_secret].idInstance.length){
            if(researchers[_secret].idInstance[i] == _id)
                validResearcher = true;
            i++;
        }
        if(validResearcher == true){
            instances[_id].solution = _solution;
            instances[_id].solved = true;
            instances[_id].dateSolution = block.timestamp;
        }
        return validResearcher;
    }

    // ------------------------------- MAX-3SAT functions --------------------------------
    
    /// @notice Generates a new Instance from A generator
    function createAInstance(uint _p, uint _q, uint _secret, uint _numInstances) public {
        for(uint k = 0; k < _numInstances; k++){
            uint symbols = 1;
            uint numClauses = 0;
            // First round of symbols
            for(uint i = 0; i < 2; i++)
                if(random(100) < _p)
                    symbols++;
            // We create the first clause
            for(uint i = 0; i < clausesLength; i++){
                prepositions.push(random(symbols));
            }
            numClauses++;
            // We create the rest of clauses
            while(random(100) < _q && numClauses < 20){
                for(uint i = 0; i < 3; i++)
                  if(random(100) < _p)
                        symbols++;
                for(uint i = 0; i < clausesLength; i++)
                    prepositions.push(random(symbols));
                numClauses++;
            }
            instances[idInstance] = Instance(idInstance, prepositions, numClauses, block.timestamp, "Unresolved", false, 0);
            researchers[_secret].idInstance.push(idInstance);
            idInstance++;
            delete prepositions;
        }
    }

    /// @notice Generates a new Instance from B generator
    function createBInstance(uint _p, uint _q, uint _secret, uint _numInstances) public {
        for(uint k = 0; k < _numInstances; k++){
            uint[] memory arr;
            uint symbols = 0;
            uint numClauses = 0;
            // We calculate the number of clauses
            while(random(100) < _q && numClauses < 50)
                numClauses++;
            // Add symbols
            for(uint i = 0; i < 3*numClauses-1; i++)
                if(random(100) < _p)
                    symbols++;
            // Fill the blanks    
            for(uint i = 0; i < 3*numClauses; i++)
                arr[arr.length] = random(symbols); 
            instances[idInstance] = Instance(idInstance, arr, numClauses, block.timestamp, "Unresolved", false, 0);
            researchers[_secret].idInstance.push(idInstance);
            idInstance++;
        }
    }
   
    // -------------------------------- Support functions --------------------------------

    /// @notice Generates a random number within an interval
    /// @param _interval upper index of the (open) interval of the random value
    /// @dev now, msg.sender and nonce are the timestamp of the block, who made the call and an incremental number respectively
    /// @return The number generated
    function random(uint _interval) internal returns (uint) {
        uint randNumber = uint(keccak256(abi.encodePacked(block.timestamp, msg.sender, nonce))) % _interval;
        nonce++;
        return randNumber;
    }

    /// @notice Get instance
    function getInstance(uint _id) public view returns (uint, uint[] memory, uint, uint, string memory, bool, uint){
        return (instances[_id].id, instances[_id].chain, instances[_id].size, instances[_id].dateCreated, instances[_id].solution, instances[_id].solved, instances[_id].dateSolution);
    }
}