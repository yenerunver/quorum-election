const Web3 = require('web3')
const web3 = new Web3('http://localhost:22000')

const account = web3.eth.accounts.create();

var Election = artifacts.require("TurkishElections");

module.exports = function(done) {
	Election.deployed().then(function(instance) {
		return instance.newVoter(account.address);
	}).then(function(result){
		console.log(result);
		done();
	}).catch(function(e) {
		console.log(e);
		done();
	});
};
