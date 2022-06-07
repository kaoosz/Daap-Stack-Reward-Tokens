
//const MyToken1155 = artifacts.require("MyToken1155");

var instance;

contract("MyToken1155", (accounts) => {
    it("MyToken1155 Migrate", async () => {

        instance = await MyToken1155.deployed();

        assert(instance ,"Not Migrate");
    })

    it("MyToken1155 tokenERC20 ", async () => {

        //let tokenERC20 = await instance.tokenERC20();
        var test = await instance.SetTokenAddress("0xAB6B5D2ACA3Ea223C799382BFB0826EAe48b5386");
        let tokenERC20 = await instance.tokenERC20();

        assert(tokenERC20 === "0xAB6B5D2ACA3Ea223C799382BFB0826EAe48b5386", "Valor 0");
    })
    it("MyToken1155 owner", async () =>{

        var owner = await instance.owner();

        assert(owner === accounts[1], "Not is Not Account[1]");
    })
})