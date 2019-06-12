if(!process.argv[4])
	console.log("You have to enter an account!");

if(!process.argv[5])
	console.log("You have to enter a candidate value!");

var Election = artifacts.require("TurkishElections");
let account = process.argv[4];
let regulator_key = "BULeR8JyUWhiuuCMU/HLA0Q5pzkYT+cHII3ZKBey3Bo=";

module.exports = function(done) {
	if(process.argv[4] && process.argv[5]){
		Election.deployed().then(function(instance) {
			return instance.vote(process.argv[4], process.argv[5], {privateFor: [regulator_key]});
		}).then(function(result){
			console.log("Transaction:", result.tx);
			console.log("Block Number:", result.receipt.blockNumber);
			console.log("Account " + process.argv[5] + " voted for " + process.argv[5] + "!");
			done();
		}).catch(function(e) {
			console.log("The account has no voting rights!");
			done();
		});
	}
	
	else
		done();
};
