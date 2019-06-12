if(!process.argv[4].length)
	return "You have to enter a candidate name!";

if(!process.argv[5].length)
	return "You have to enter a candidate value!";

var Election = artifacts.require("TurkishElections");

module.exports = function(done) {
	Election.deployed().then(function(instance) {
		return instance.newCandidate(process.argv[4], process.argv[5]);
	}).then(function(result){
		console.log(result);
		done();
	}).catch(function(e) {
		console.log(e);
		done();
	});
};
