var RedeemableToken = artifacts.require("RedeemableToken");
var truffleAssert = require('truffle-assertions')

contract('RedeemableToken', function(accounts) {
  var owner = accounts[0]
  var redeemer = accounts[1]
  var token

  beforeEach(async () => {
    token = await RedeemableToken.new()
  })

  describe('unpackCode()', () => {
    it("unpackCode should unpack data", async () => {
        data = "0x"
            + "0000000000000000000000000000000000000000000000000000000000000001"
            + "0000000000000000000000000000000000000000000000000000000000000002"
            + "0000000000000000000000000000000000000000000000000000000000000003"
            + "1c"

        let fields = await token.unpackCode.call(data)

        assert.equal("0x0000000000000000000000000000000000000000000000000000000000000001", fields[0])
        assert.equal("0x0000000000000000000000000000000000000000000000000000000000000002", fields[1])
        assert.equal("0x0000000000000000000000000000000000000000000000000000000000000003", fields[2])
        assert.equal(28, fields[3].toNumber())
    })
  })

  describe('unpackMessage()', () => {
    it("unpackMessage should unpack data", async () => {
        var data = "0x"
            + "0000000000000000000000000000000f"
            + "00000000000000000000000000000001"

        let fields = await token.unpackMessage.call(data)

        assert.equal(0xf, fields[0].toNumber())
        assert.equal(1, fields[1].toNumber())
    })
  })

  describe("redeem()", async () => {
    var signer = "0xb77fee8c9298a517f65a67e7bd2bb101cb889ec2"

    beforeEach(async () => {
      token = await RedeemableToken.new()
      await token.transferOwnership(signer, {from: owner})
    });

    it("redeem mints coins", async () => {
        var data = "0x"
          + "000000000000000000000000000000010000000000000000000000000000000f"
          + "f8be0c00a28dae301bf0e745ffe22deed4cad7f3526ac98e5ad7ad7e5ea1bfbe97bffc15ec85dd0d50b7c1039eb727fac636c2a29cab7c3e6e00b9e28508c3741c"

        var result = await token.redeem(data, {from: redeemer})

        truffleAssert.eventEmitted(result, 'Mint')

        let totalSupply = await token.totalSupply()
        let balance = await token.balanceOf(redeemer)

        assert.equal(0xf, totalSupply)
        assert.equal(0xf, balance)
    })
  })

  describe("redeem2()", async () => {
    var signer = "0x627306090abab3a6e1400e9345bc60c78a8bef57"

    beforeEach(async () => {
      token = await RedeemableToken.new()
      await token.transferOwnership(signer, {from: owner})
    });

    it("redeem mints coins", async () => {
        var data = "0x"
          + "000000000000000000000000000000010000000000000000000000000000000a"
          + "27c4ffe5dc0222f5b705b4f0dfa5cd5cec5b9b386c1bec8113a46a0ff0da5fa4adfe9d47610319d3b2ce88bc0973ee3778d9c4bc689a64f985ecb1c2253e5ff71b"

        var result = await token.redeem(data, {from: redeemer})

        truffleAssert.eventEmitted(result, 'Mint')

        let totalSupply = await token.totalSupply()
        let balance = await token.balanceOf(redeemer)

        assert.equal(0xa, totalSupply)
        assert.equal(0xa, balance)
    })
  })
})
