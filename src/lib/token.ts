export interface Token {
  name: string;
  symbol: string;
  logoURI: string;
  price?: number; // Price in USD
}

const MOCK_TOKENS: Token[] = [
  {
    name: "Ethereum",
    symbol: "ETH",
    logoURI:
      "https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/info/logo.png",
    price: 3450.78,
  },
  {
    name: "USD Coin",
    symbol: "USDC",
    logoURI:
      "https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48/logo.png",
    price: 1.0,
  },
  {
    name: "Wrapped Bitcoin",
    symbol: "WBTC",
    logoURI:
      "https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0x2260FAC5E5542a773Aa44fBCfeDf7C193bc2C599/logo.png",
    price: 67123.45,
  },
  {
    name: "Dai Stablecoin",
    symbol: "DAI",
    logoURI:
      "https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0x6B175474E89094C44Da98b954EedeAC495271d0F/logo.png",
    price: 0.99,
  },
  {
    name: "Chainlink",
    symbol: "LINK",
    logoURI:
      "https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0x514910771AF9Ca656af840dff83E8264EcF986CA/logo.png",
    price: 18.5,
  },
  {
    name: "Uniswap",
    symbol: "UNI",
    logoURI:
      "https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0x1f9840a85d5aF5bf1D1762F925BDADdC4201F984/logo.png",
    price: 11.25,
  },
];

// Simulate fetching data from an API
export const getTokens = (): Promise<Token[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(MOCK_TOKENS);
    }, 1000); // 1-second delay to simulate network latency
  });
};
