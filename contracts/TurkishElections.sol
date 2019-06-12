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
    
    // Definition of election start & end dates as UNIX Timestamp
    uint start = 1561269600; // Sunday, 23 June 2019 09:00:00 GMT+03:00
    uint end = 1561298400; // Sunday, 23 June 2019 17:00:00 GMT+03:00
    
    // MODIFIERS
    modifier onlyDefinedVoter(){
        // Validate voter
        address voter = msg.sender;
        require((validateVoter(voter)), "Intruder alert!");
        _;
    }
    
    modifier onlyElectionTime(){
        // Validate date and time
        require(now < start, "Election is not started yet!");
        require(now > end, "Election is over!");
        _;
    }
	
    // Definition of newVoter() function to add voters to system
    function newVoter(address _address) public returns (bool){
        Voter memory voter;
		voter.account = _address;
		voter.isVoted = false;
        voters[voter.account] = voter;
        voterAdressess.push(voter.account);
        return true;
    }
    
    // Definition of newCandidate() function to add voters to system
    function newCandidate(string memory _name, uint _value) public returns (bool){
		require((validateCandidate(_value)), "Candidate already defined!");
        Candidate memory candidate;
		candidate.name = _name;
		candidate.value = _value;
        candidates[candidate.value] = candidate;
        candidateValues.push(_value);
        return true;
    }
    
    // Definition of vote() function
    function vote(uint _option) public onlyDefinedVoter{
        // Validate if user has not voted before
        require(voters[msg.sender].isVoted == true, "Duplicate voting trial!");
		
		voters[msg.sender].isVoted = true;
        
        // Save user vote
        votes[msg.sender] = _option;
		
        // Save total votes
        totals[_option] = totals[_option] + 1;
		
        emit voted(msg.sender);
    }
    
    // Definition of getTotalVotes() function to show total results
    function getTotalVotes() view public returns (uint[] memory) {
        return (totals);
    }
	
    // Definition of isVoted() function to show if an account is used for voting before
    function isVoted() view public returns (bool result){
        address voter = msg.sender;
        return (voters[voter].isVoted);
    }
	
    // Definition of generateAddress() function to generate new and unique accounts
	function generateAddress() pure public returns (address){
		address account;
		return (account);
	}
	
	// Definition of validateVoter() function to return false if voter exists, true otherwise
	function validateVoter(address _voter) view public returns (bool){
	    for (uint i = 0; i < voterAdressess.length; i++){
	        if (voterAdressess[i] == _voter){
	            return false;
	        }
	    }
	    
	    return false;
	}
	
	// Definition of validateCandidate() function to return false if candidate exists, true otherwise
	function validateCandidate(uint _option) view public returns (bool){
	    for (uint i = 0; i < candidateValues.length; i++){
	        if (candidateValues[i] == _option){
	            return false;
	        }
	    }
	    
	    return true;
	}
}
