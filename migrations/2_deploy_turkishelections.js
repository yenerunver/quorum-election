var TurkishElection = artifacts.require("TurkishElections");

module.exports = function(deployer){
	deployer.deploy(TurkishElection,
	"0xca843569e3427144cead5e4d5999a3d0ccf92b8e",
	"0x0fbdc686b912d7722dc86510934589e0aaf3b55a",
	"0x9186eb3d20cbd1f5f992a950d808c4495153abd5",
	"0x0638e1574728b6d862dd5d3a3e0942c3be47d996",
	"0xcc71c7546429a13796cf1bf9228bff213e7ae9cc",
	{
		privateFor: [
			"QfeDAys9MPDs2XHExtc84jKGHxZg/aj52DTh0vtA3Xc=",
			"1iTZde/ndBHvzhcl7V68x44Vx7pl8nwx9LqnM/AfJUg=",
			"oNspPPgszVUFw0qmGFfWwh1uxVUXgvBxleXORHj07g8=",
			"R56gy4dn24YOjwyesTczYa8m5xhP6hF2uTMCju/1xkY=",
			"UfNSeSGySeKg11DVNEnqrUtxYRVor4+CvluI8tVv62Y="
		 ]
	});
};

