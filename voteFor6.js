var Election = artifacts.require("TurkishElections");
let account = Election.defaults().from;
let regulator_key = "BULeR8JyUWhiuuCMU/HLA0Q5pzkYT+cHII3ZKBey3Bo=";

module.exports = function(done) {
	Election.deployed().then(function(instance) {
		return instance.vote(6, {privateFor: [regulator_key]});
	}).then(function(result){
		console.log("Transaction:", result.tx);
		console.log("Block Number:", result.receipt.blockNumber);
		console.log("Voted for 6!");
		done();
	}).catch(function(e) {
		console.log("You have no voting rights!");
		done();
	});
};
