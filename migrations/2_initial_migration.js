//const { BN } = require("@openzeppelin/test-helpers");

var SampleToken = artifacts.require("SampleToken");

module.exports = function(deployer) {
  deployer.deploy(SampleToken, "BODOH Token", "PHII", "1" + "0".repeat(24));
};