export const cryptoAddresses = {
  btc: 'bc1quj5a4emgxhpt9dtwnpywhqv9ee66aqpaw3hnrrl665dmsl6gyrlsusg0yh',
  eth: '0xb9Ae0F6A430cA5CF82316e036a6b4874Af6DfE6F',
  sol: '34d5F8K1fJeSbVFgKG9tPRf2QNBuhoGHdqavxVopnQvK',
  matic: '0xb9Ae0F6A430cA5CF82316e036a6b4874Af6DfE6F',
} as const;

export const cryptoOptions = [
  {
    id: 'btc' as const,
    name: 'Bitcoin (BTC)',
    network: 'Segwit',
    icon: 'mdi:bitcoin',
  },
  {
    id: 'eth' as const,
    name: 'Ethereum (ETH)',
    network: 'ERC-20',
    icon: 'mdi:ethereum',
  },
  {
    id: 'sol' as const,
    name: 'Solana (SOL)',
    network: 'Solana',
    icon: 'cryptocurrency:sol',
  },
  {
    id: 'matic' as const,
    name: 'Polygon (MATIC)',
    network: 'Polygon',
    icon: 'cryptocurrency:matic',
  },
] as const;

export const cryptoNames = {
  btc: 'Bitcoin (BTC)',
  eth: 'Ethereum (ETH)',
  sol: 'Solana (SOL)',
  matic: 'Polygon (MATIC)',
} as const;

export type CryptoType = keyof typeof cryptoAddresses;
