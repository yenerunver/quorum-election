App = {
  web3Provider: null,
  contracts: {},
  providerUrl: "http://localhost:22000",
  governor: {
    address: "0xed9d02e382b34818e88b88a309c7fe71e65f419d",
    privateKey:
      "BULeR8JyUWhiuuCMU/HLA0Q5pzkYT+cHII3ZKBey3Bo="
  },
  voterA: {
    address: "0xca843569e3427144cead5e4d5999a3d0ccf92b8e",
    privateKey:
      "QfeDAys9MPDs2XHExtc84jKGHxZg/aj52DTh0vtA3Xc="
  },
  voterB: {
    address: "0x0fbdc686b912d7722dc86510934589e0aaf3b55a",
    privateKey:
      "1iTZde/ndBHvzhcl7V68x44Vx7pl8nwx9LqnM/AfJUg="
  },
  voterC: {
    address: "0x9186eb3d20cbd1f5f992a950d808c4495153abd5",
    privateKey:
      "oNspPPgszVUFw0qmGFfWwh1uxVUXgvBxleXORHj07g8="
  },
  voterD: {
    address: "0x0638e1574728b6d862dd5d3a3e0942c3be47d996",
    privateKey:
      "R56gy4dn24YOjwyesTczYa8m5xhP6hF2uTMCju/1xkY="
  },
  voterE: {
    address: "0xcc71c7546429a13796cf1bf9228bff213e7ae9cc",
    privateKey:
      "UfNSeSGySeKg11DVNEnqrUtxYRVor4+CvluI8tVv62Y="
  },

  init: function() {
    return App.initWeb3();
  },

  initWeb3: function() {
    // TODO: refactor conditional
    if (typeof web3 !== "undefined") {
      // If a web3 instance is already provided by Meta Mask.
      App.web3Provider = new Web3.providers.HttpProvider(
        App.providerUrl
      );
      web3 = new Web3(App.web3Provider);
    } else {
      // Specify default instance if no web3 instance provided
      App.web3Provider = new Web3.providers.HttpProvider(
        App.providerUrl
      );
      web3 = new Web3(App.web3Provider);
    }
	
	if(!web3.isConnected())
		console.log("not connected");
	else
		console.log("connected");
	
    return App.initContract();
  },

  initContract: function() {
    $.getJSON("build/contracts/TurkishElections.json", function(election) {
      // Instantiate a new truffle contract from the artifact
      App.contracts.Election = TruffleContract(election);
      // Connect provider to interact with contract
      App.contracts.Election.setProvider(App.web3Provider);
      App.listenForEvents();

      return App.render();
    });
  },

  // Listen for events emitted from the contract
  listenForEvents: function() {
    App.contracts.Election.deployed().then(function(instance) {
      // Restart Chrome if you are unable to receive this event
      // This is a known issue with Metamask
      // https://github.com/MetaMask/metamask-extension/issues/2393
      instance
        .votedEvent(
          {},
          {
            fromBlock: 0,
            toBlock: "latest"
          }
        )
        .watch(function(error, event) {
          console.log("event triggered", event);
          // Reload when a new vote is recorded
          App.render();
        });
    });
  },

  render: function() {
    var electionInstance;
    var loader = $("#loader");
    var content = $("#content");

    loader.show();
    content.hide();

    $("#accountAddress").html("Your Account: " + App.voterA.address);

    // Load contract data
    App.contracts.Election.deployed()
      .then(function(instance) {
        electionInstance = instance;
        return electionInstance.candidatesCount();
      })
      .then(function(candidatesCount) {
        var candidatesResults = $("#candidatesResults");
        candidatesResults.empty();

        var candidatesSelect = $("#candidatesSelect");
        candidatesSelect.empty();

        for (var i = 1; i <= candidatesCount; i++) {
          electionInstance.candidates(i).then(function(candidate) {
            var id = candidate[0];
            var name = candidate[1];
            var voteCount = candidate[2];

            // Render candidate Result
            var candidateTemplate =
              "<tr><th>" +
              id +
              "</th><td>" +
              name +
              "</td><td>" +
              voteCount +
              "</td></tr>";
            candidatesResults.append(candidateTemplate);

            // Render candidate ballot option
            var candidateOption =
              "<option value='" + id + "' >" + name + "</ option>";
            candidatesSelect.append(candidateOption);
          });
        }
        return electionInstance.voters(App.account);
      })
      .then(function(hasVoted) {
        // Do not allow a user to vote
        if (hasVoted) {
          $("form").hide();
        }
        loader.hide();
        content.show();
      })
      .catch(function(error) {
        console.warn(error);
      });
  },

  castVote: function() {
    var candidateId = $("#candidatesSelect").val();
    App.contracts.Election.deployed()
      .then(function(instance) {
        return instance.vote(candidateId, { from: App.account });
      })
      .then(function(result) {
        // Wait for votes to update
        $("#content").hide();
        $("#loader").show();
      })
      .catch(function(err) {
        console.error(err);
      });
  }
};

$(function() {
  $(window).load(function() {
    App.init();
  });
});
