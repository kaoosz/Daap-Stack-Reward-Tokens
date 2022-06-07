//SPDX-License-Identifier:MIT

pragma solidity ^0.8.0;


import "../node_modules/@openzeppelin/contracts/utils/Counters.sol";
import "../node_modules/@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "../node_modules/@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "../node_modules/@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "../node_modules/@openzeppelin/contracts/utils/Strings.sol";
import "../node_modules/@openzeppelin/contracts/access/Ownable.sol";

import "../node_modules/@openzeppelin/contracts/token/ERC1155/ERC1155.sol";


import "../node_modules/@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "../node_modules/@openzeppelin/contracts/security/Pausable.sol";

contract MyTokenERC20 is ERC20, Pausable, Ownable {

    address Reward;

    constructor(address reward) ERC20("TokenReward", "RWD") {
        _mint(msg.sender,1000);
        Reward = reward;
        approve(Reward, totalSupply());
    }

    function pause() public onlyOwner {
        _pause();
    }

    function unpause() public onlyOwner {
        _unpause();
    }

    function _beforeTokenTransfer(address from, address to, uint256 amount)
        internal
        whenNotPaused
        override
    {
        super._beforeTokenTransfer(from, to, amount);
    }
}

contract MyToken1155 is ERC1155, Ownable, ReentrancyGuard {

    using Counters for Counters.Counter;
    Counters.Counter private _itemIds;

    address public tokenERC20;

    constructor() ERC1155("") {}

    struct MarketItem{
        address nftContract;
        address payable ownertoken;
        uint256 tokenId;
    }
    event MarketItemCreated(
        address indexed nftContract,
        address ownertoken, 
        uint256 indexed tokenId
    );

    mapping(uint256 => MarketItem) public idToMarketItem;

    function SetTokenAddress(address _token) external onlyOwner{
        tokenERC20 = _token;
    }

    function Stake(address nftContract,uint256 tokenId)
    public payable {

        _itemIds.increment();
        idToMarketItem[tokenId] = MarketItem(
            nftContract,
            payable(msg.sender),
            tokenId
        );

        IERC721(nftContract).transferFrom(msg.sender, address(this), tokenId);
        
        emit MarketItemCreated(
            nftContract,
            payable(msg.sender),
            tokenId
        );
    }

    function UnStack(address nftContract,uint256 tokenId)external payable nonReentrant{
        require(msg.sender == idToMarketItem[tokenId].ownertoken, "Not Owner Token");
        IERC721(nftContract).transferFrom(address(this), msg.sender, tokenId);
        IERC20(tokenERC20).transferFrom(owner(),msg.sender,1);
        reset(tokenId);
    }

    function reset(uint256 tokenId)internal {
        idToMarketItem[tokenId].nftContract = 0x0000000000000000000000000000000000000000;
        idToMarketItem[tokenId].ownertoken = payable(0x0000000000000000000000000000000000000000);
        idToMarketItem[tokenId].tokenId = 0;
    }

}

contract TokenERC721 is ERC721URIStorage{

    using Counters for Counters.Counter;
    using Strings for uint256;
    Counters.Counter private _tokenIds;
    address contractAddress;

    constructor(address marketplaceAddress) ERC721("NFTStack", "STK"){
        contractAddress = marketplaceAddress;

    }
    
    function createTokens() public returns (uint) {
        _tokenIds.increment();
        uint256 newItemId = _tokenIds.current();

        _mint(msg.sender, newItemId);
        _setTokenURI(newItemId, t());
        setApprovalForAll(contractAddress, true);
        return newItemId;
    }


    function t() private view returns(string memory){

      string memory URL = "ipfs://QmWjxHZXMXga1R3bKCbeFhszmdvT7cVYb7TxTtryi2SKSU/";
      uint256 newItemId = _tokenIds.current();
      string memory baseExtension = ".json";
      return string(abi.encodePacked(URL, newItemId.toString(), baseExtension));
    }
}
