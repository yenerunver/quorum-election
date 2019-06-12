if(!process.argv[4].length)
	console.log("You have to enter a candidate name!");

if(!process.argv[5].length)
	console.log("You have to enter a candidate value!");

var Election = artifacts.require("TurkishElections");

module.exports = function(done) {
	if(process.argv[4].length && process.argv[5].length){
		Election.deployed().then(function(instance) {
			return instance.newCandidate(process.argv[4], process.argv[5]);
		}).then(function(result){
			console.log("New candidate is created: " + process.argv[4] + "(" + process.argv[5] + ")");
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