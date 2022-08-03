const { ethers, network } = require("hardhat")
const { moveBlocks } = require("../utils/move-blocks")

async function mint() {
    let basicNft = await ethers.getContract("BasicNFT")
    console.log("Minting NFT...")
    const mintTx = await basicNft.mintNft()
    const mintTxReceipt = await mintTx.wait(1)
    const tokenId = mintTxReceipt.events[0].args.tokenId

    if (network.config.chainId == 31337) {
        // Moralis has a hard time if you move more than 1 at once!
        await moveBlocks(1, (sleepAmount = 1000))
    }
}

mint()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error)
        process.exit(1)
    })
