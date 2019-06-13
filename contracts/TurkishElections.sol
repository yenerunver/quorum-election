pragma solidity 0.5.0;

contract TurkishElections {
	struct Candidate {
		string name;
		uint value;
	}
	
	struct Voter {
		address account;
		bool isVoted;
	}
    
    // Mapping for storing voters
    mapping(address => Voter) private voters;
    address[] public voterAdressess;

    // Mapping for storing candidates
    mapping(uint => Candidate) private candidates;
    uint[] public candidateValues;
	
    // Mapping for storing votes
    mapping(address => uint) private votes;
	
    // Mapping for storing total results
    uint[] private totals;
    
    event voted(address voter);
    
    event voterCreated(address voter);
    
    event candidateCreated(uint value);
    
    // Definition of election start & end dates as UNIX Timestamp
    uint start = 1560405600; // Thursday, 13 June 2019 09:00:00 GMT+03:00
    uint end = 1560434400; // Thursday, 13 June 2019 17:00:00 GMT+03:00
    
    // MODIFIERS
    modifier onlyDefinedVoter(address _address){
        // Validate voter
        require(validateVoter(_address), "Address already defined!");
        _;
    }
    
    modifier onlyValidCandidateValue(uint _value){
        // Validate voter
        require(validateCandidate(_value), "Candidate already defined!");
        _;
    }
    
    modifier onlyElectionTime(){
        // Validate date and time
        require(now < start, "Election is not started yet!");
        require(now > end, "Election is over!");
        _;
    }
	
    // Definition of newVoter() function to add voters to system
    function newVoter(address _address) public{
        Voter memory voter;
		voter.account = _address;
		voter.isVoted = false;
        voters[voter.account] = voter;
        voterAdressess.push(voter.account);
        emit voterCreated(voter.account);
    }
    
    // Definition of newCandidate() function to add voters to system
    function newCandidate(string memory _name, uint _value) public onlyValidCandidateValue(_value){
        Candidate memory candidate;
		candidate.name = _name;
		candidate.value = _value;
        candidates[candidate.value] = candidate;
        candidateValues.push(candidate.value);
        totals[candidate.value] = 0;
        emit candidateCreated(candidate.value);
    }
    
    // Definition of vote() function
    function vote(address _address, uint _option) public onlyDefinedVoter(_address) onlyElectionTime(){
        // Validate if user has not voted before
        require(voters[_address].isVoted == true, "Duplicate voting trial!");
		
		voters[_address].isVoted = true;
        
        // Save user vote
        votes[_address] = _option;
		
        // Save total votes
        totals[_option] = totals[_option] + 1;
		
        emit voted(_address);
    }
    
    // Definition of getTotalVotes() function to show total results
    function getTotalVotes() view public returns (uint[] memory) {
        return (totals);
    }
    
    // Definition of getVoters() function to list defined voters
    function getVoters() view public returns (address[] memory) {
        return (voterAdressess);
    }
    
    // Definition of getCandidates() function to list defined voters
    function getCandidates() view public returns (uint[] memory) {
        return (candidateValues);
    }
	
    // Definition of isVoted() function to show if an account is used for voting before
    function isVoted(address _address) view public returns (bool result){
        return (voters[_address].isVoted);
    }
	
	// Definition of validateVoter() function to return true if voter exists, false otherwise
	function validateVoter(address _address) view public returns (bool){
		return (voters[_address].account != address(0));
	}

	// Definition of validateCandidate() function to return true if candidate exists, false otherwise
	function validateCandidate(uint _value) view public returns (bool){
		return (bytes(candidates[_value].name).length != 0);
	}
}
