const contract1 = artifacts.require("MyToken1155");
const contract2 = artifacts.require("MyTokenERC20");
const contract3 = artifacts.require("TokenERC721");
const contract4 = artifacts.require("Migrations");

// module.exports = (deployer, network) => {
//   deployer.deploy(MyToken1155).then(function(){
//     deployer.deploy(MyTokenERC20, MyToken1155.address).then(function(){
//       return deployer.deploy(TokenERC721, MyToken1155.address)
//     });
//   });
// };

// module.exports = function(deployer, network, accounts){
//   deployer.then(async () => {
//     await deployer.deploy(MyToken1155);
//     await deployer.deploy(TokenERC721, MyToken1155.address);
//   });
// }

module.exports = async function(deployer) {
  await deployer.deploy(contract1);
  await deployer.deploy(contract2, contract1.address);
  await deployer.deploy(contract3, contract1.address);
  await deployer.deploy(contract4);
};