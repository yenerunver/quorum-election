if(!process.argv[4])
	console.log("You have to enter a candidate value!");

var Election = artifacts.require("TurkishElections");

module.exports = function(done) {
	if(process.argv[4]){
		Election.deployed().then(function(instance) {
			return instance.getTotalVotesFor(process.argv[4]);
		}).then(function(result){
			console.log(result);
			done();
		}).catch(function(e) {
			console.log(e);
			done();
		});
	}
	
	else
		done();
};
