var Election = artifacts.require("TurkishElections");

module.exports = function(done) {
	Election.deployed().then(function(instance) {
		return instance.isVoted();
	}).then(function(result){
		if(result)
			console.log("Current voter has voted.");
		else
			console.log("Current voter has not voted yet.");
		done();
	}).catch(function(e) {
		console.log(e);
		done();
	});
};
