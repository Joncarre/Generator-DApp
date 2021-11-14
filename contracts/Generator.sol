// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;
pragma experimental ABIEncoderV2;

/// @title 
/// @author J. Carrero
contract Generator {
    // Researcher information
    struct Researcher {
        string name;
        uint orcid;
        bool registered;
        uint[] idInstance;
    }
    mapping(uint => Researcher) researchers;
    
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
    mapping(uint => Instance) instances;

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
    
    /// @notice Main constructor
    constructor() {
        owner = msg.sender;
        nonce = 0;
        idInstance = 0;
        clausesLength = 3;
    }
    
    // Modifiers
    /*modifier alreadyRegistered () {
        if(researchers[msg.sender].registered)
            revert("This address is already registered");
        _;
    }
    
    modifier mustRegister () {
        require(researchers[msg.sender].registered, "You must be registered");
        _;
    }*/
    
    // ---------------------------------- General functions ----------------------------------
    
    /// @notice Registers a new Researcher 
    function setResearcher(string memory _name, uint _orcid) public {
        uint[] memory empty;
        researchers[_orcid] = Researcher(_name, _orcid, true, empty);
    }

    /// @notice Get instance
    function getInstance(uint _index) public view returns (uint, uint[] memory, uint, uint, string memory, uint) {
        // index debe ser <= idInstance (la variable general que indica cuantas instancias hay)
        return (instances[_index].id, instances[_index].chain, instances[_index].size, instances[_index].dateCreated, instances[_index].solution, instances[_index].dateSolution);
    }
    
    /// @notice Set the solution for the _index instance
    function solveInstance(uint _index, string memory _solution) public {
        instances[_index].solution = _solution;
        instances[_index].solved = true;
        instances[_index].dateSolution = block.timestamp;
    }

    // ------------------------------- MAX-3SAT functions --------------------------------
    
    /// @notice Generates a new Instance from A generator
    function createAInstance(uint _p, uint _q, uint _orcid) public {
      // Comprobar que el orcid existe y esta registrado
        uint[] memory chain;
        uint symbols = 0;
        uint numClauses = 0;
        // First round of symbols
        for(uint i = 0; i < 2; i++)
            if(random(100) < _p)
                symbols++;
        // We create the first clause
        for(uint i = 0; i < clausesLength; i++)
            chain[chain.length] = random(symbols);
        numClauses++;
        // We create the rest of clauses
        while(random(100) < _q && numClauses < 50){
            for(uint i = 0; i < 3; i++)
                if(random(100) < _p)
                    symbols++;
            for(uint i = 0; i < clausesLength; i++)
                chain[chain.length] = random(symbols);
            numClauses++;
        }
        
        instances[idInstance] = Instance(idInstance, chain, numClauses, block.timestamp, "Unresolved", false, 0);
        researchers[_orcid].idInstance.push(idInstance);
        idInstance++;
    }

    /// @notice Generates a new Instance from B generator
    function createBInstance(uint _p, uint _q, uint _orcid) public {
     // Comprobar que el orcid existe y esta registrado
        uint[] memory chain;
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
            chain[chain.length] = random(symbols);
            
        instances[idInstance] = Instance(idInstance, chain, numClauses, block.timestamp, "Unresolved", false, 0);
        researchers[_orcid].idInstance.push(idInstance);
        idInstance++;
    }
   
    // -------------------------------- Support functions --------------------------------

    function getResearcher(uint _orcid) public view returns (string memory, uint, bool, uint[] memory){
        return (researchers[_orcid].name, researchers[_orcid].orcid, researchers[_orcid].registered, researchers[_orcid].idInstance);
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
