const axios = require('axios');

// QuickNode CoinGecko Addon endpoint
const quickNodeRpcEndpoint = `YOUR_QUICKNODE_COINGECKO_ADDON_ENDPOINT`;

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
  } catch (error) {
    console.error('Error fetching Ethereum data:', error.message);
  }
}

// Function to fetch Ethereum price from CoinGecko using QuickNode CoinGecko Addon
async function getEthereumPrice() {
  try {
    const response = await axios.post(quickNodeRpcEndpoint, {
      jsonrpc: '2.0',
      method: 'cg_simplePrice',
      params: ['ethereum', 'usd'],
      id: 1,
    });
    
    const ethereumPrice = response.data.result.ethereum.usd;
    console.log('Latest Ethereum price (USD):', ethereumPrice);
  } catch (error) {
    console.error('Error fetching Ethereum price:', error.message);
  }
}

// Call the functions to fetch Ethereum data
getEthereumPrice();
getEthereumData();

// Show the Ethereum price every 30 seconds
setInterval(getEthereumData, getEthereumPrice(), 30 * 1000); // 30 seconds (30 * 1000 milliseconds)
