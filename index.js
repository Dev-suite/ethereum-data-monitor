const axios = require('axios');

// QuickNode RPC endpoint
const quickNodeRpcEndpoint = `YOUR_QUICKNODE_RPC_ENDPOINT`;

// Function to fetch Ethereum data using QuickNode's RPC endpoint
async function getEthereumData() {
  try {
    // Example: Get the latest block number
    const blockNumberResponse = await axios.post(quickNodeRpcEndpoint, {
      jsonrpc: '2.0',
      method: 'eth_blockNumber',
      params: [],
      id: 1,
    });

    const latestBlockNumberHex = blockNumberResponse.data.result;
    const latestBlockNumber = parseInt(latestBlockNumberHex, 16); // Convert hex to decimal
    console.log('Latest Ethereum block number:', latestBlockNumber);

    // Fetch Ethereum price from CoinGecko
    const ethereumPriceResponse = await axios.get('https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd');
    const ethereumPrice = ethereumPriceResponse.data.ethereum.usd;
    console.log('Latest Ethereum price (USD):', ethereumPrice);
  } catch (error) {
    console.error('Error fetching Ethereum data:', error.message);
  }
}

// Call the function to fetch Ethereum data
getEthereumData();

// Show the Ethereum price every 30 seconds
setInterval(getEthereumData, 30 * 1000); // 30 seconds (30 * 1000 milliseconds)
