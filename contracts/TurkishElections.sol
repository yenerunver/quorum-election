pragma solidity 0.5.0; contract TurkishElections {
    // An address array for storing votes
    mapping(address => uint) private votes;
    // An integer array for storing total results
    mapping(uint => uint) private totals;

    event votedBy(address voter);

    // Definition of 4 voters for demo purpose
    // todo: Get voter information from Turkish Supreme Election Council (SEC) database
    address voterA;
    address voterB;
    address voterC;
    address voterD;
    address voterE;
    
    // Definition of election start & end dates as UNIX Timestamp
    // todo: Get election information via API provided by SEC
    uint start = 1561269600; // Sunday, 23 June 2019 09:00:00 GMT+03:00
    uint end = 1561298400; // Sunday, 23 June 2019 17:00:00 GMT+03:00
    
    // MODIFIERS
     modifier onlyValidVoter(){
        address voter = msg.sender;
        require((voter == voterA || voter == voterB || voter == voterC || voter == voterD || voter == voterE),"Intruder alert!");
        _;
    }
    
    modifier onlyElectionTime(){
        // Validate date and time
        require(now < start, "Election is not started yet!");
        require(now > end, "Election is over!");
        _;
    }
    // todo: Modify the constructor according to the data provided by SEC
    constructor(address _voterA, address _voterB, address _voterC, address _voterD, address _voterE) public {
        voterA = _voterA;
        voterB = _voterB;
        voterC = _voterC;
        voterD = _voterD;
        voterE = _voterE;
    }
    // Definition of vote() function with 6 options for demo purpose
    // todo: Get party/candidate information from SEC database
    function vote(uint _option) public onlyValidVoter{
        
        // Validate if user has not voted before
        // todo: Validate user vote via API provided by SEC
        require(votes[msg.sender] == 0, "Duplicate voting trial!");
        
        // Save user vote
        votes[msg.sender] = _option;
        // Save total votes
        totals[_option] = totals[_option] + 1;
        emit votedBy(msg.sender);
    }
    // Definition of validateVoter() function to validate voter
    // todo: Validate voter via APIs provided by SEC and Turkish Central Civil Registration System (MERNIS)
    function validateVoter(address voter) view public returns (bool result){
        return (voter == voterA || voter == voterB || voter == voterC || voter == voterD || voter == voterE);
    }
    
    // Definition of getTotalVotes() function to show total results
    function getTotalVotes() view public returns (uint, uint, uint, uint, uint, uint) {
        return (totals[1], totals[2], totals[3], totals[4], totals[5], totals[6]);
    }
         
    // Definition of validateOption() function to validate option
    // todo: Validate options via API provided by SEC
    function validateOption(uint option) pure public returns (bool result){
        return (option == 1 || option == 2 || option == 3 || option == 4 || option == 5 || option == 6);
    }

    function isVoted() view public returns (bool result){
        address voter = msg.sender;
        return (votes[voter] != 0);
    }
}
