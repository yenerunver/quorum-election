if(!process.argv[4])
	console.log("You have to enter an account address!");

var Election = artifacts.require("TurkishElections");

module.exports = function(done) {
	if(process.argv[4]){
		Election.deployed().then(function(instance) {
			return instance.isVoted(process.argv[4]);
		}).then(function(result){
			if(result)
				console.log(process.argv[4] + " has voted.");
			else
				console.log(process.argv[4] + " has not voted yet.");
			done();
		}).catch(function(e) {
			console.log(e);
			done();
		});
	}
	
	else
		done();
};
