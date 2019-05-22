var Election = artifacts.require("TurkishElections");
let account = Election.defaults().from;

module.exports = function(done) {
	console.log("Current network's account address is:", account);
	done();
};
