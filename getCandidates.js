var Election = artifacts.require("TurkishElections");

module.exports = function(done) {
	Election.deployed().then(function(instance) {
		return instance.getCandidates();
	}).then(function(result){
		console.log(result);
		done();
	}).catch(function(e) {
		console.log(e);
		done();
	});
};
