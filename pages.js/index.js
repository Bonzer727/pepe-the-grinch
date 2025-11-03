import { useEffect, useMemo, useState } from "react";
import { Connection, PublicKey } from "@solana/web3.js";
import { WalletAdapterNetwork } from "@solana/wallet-adapter-base";
import {
ConnectionProvider,
WalletProvider,
useWallet,
} from "@solana/wallet-adapter-react";
import {
WalletModalProvider,
WalletMultiButton,
} from "@solana/wallet-adapter-react-ui";
import {
PhantomWalletAdapter,
BackpackWalletAdapter,
} from "@solana/wallet-adapter-wallets";
import "@solana/wallet-adapter-react-ui/styles.css";

const TOKEN_MINT = "YOUR_TOKEN_MINT_ADDRESS_HERE";
const TOKEN_SYMBOL = "PTG";

function Content() {
const wallet = useWallet();
const [solBalance, setSolBalance] = useState(null);
const [tokenBalance, setTokenBalance] = useState(null);
const connection = useMemo(
() => new Connection("https://api.mainnet-beta.solana.com"),
[]
);

useEffect(() => {
if (wallet.connected && wallet.publicKey) {
(async () => {
try {
const sol = await connection.getBalance(wallet.publicKey);
setSolBalance((sol / 1e9).toFixed(4));

const tokenAccounts =
await connection.getParsedTokenAccountsByOwner(wallet.publicKey, {
mint: new PublicKey(TOKEN_MINT),
});

if (tokenAccounts.value.length > 0) {
const amt =
tokenAccounts.value[0].account.data.parsed.info.tokenAmount
.uiAmount;
setTokenBalance(amt);
} else {
setTokenBalance(0);
}
} catch (err) {
console.error(err);
setTokenBalance(0);
}
})();
}
}, [wallet.connected, wallet.publicKey, connection]);

const jupiterUrl = `https://jup.ag/swap/SOL-${TOKEN_MINT}`;

return (
<div className="min-h-screen bg-gradient-to-b from-green-900 via-emerald-800 to-black text-white flex flex-col items-center justify-center p-6 text-center">
<h1 className="text-4xl font-bold mb-2 text-lime-300">
🎄 Pepe The Grinch 🐸
</h1>
<p className="mb-6 text-gray-300 max-w-md">
The holiday-hating meme coin stealing the crypto Christmas — now on
Solana!
</p>

<WalletMultiButton />

{wallet.connected && (
<div className="mt-6 space-y-2">
<p>
<strong>Wallet:</strong>{" "}
{wallet.publicKey.toBase58().slice(0, 6)}...
{wallet.publicKey.toBase58().slice(-4)}
</p>
<p>
<strong>SOL:</strong> {solBalance ?? "--"} SOL
</p>
<p>
<strong>PTG:</strong> {tokenBalance ?? "--"} {TOKEN_SYMBOL}
</p>

<a
href={jupiterUrl}
target="_blank"
className="inline-block bg-green-400 hover:bg-green-300 text-black font-bold py-2 px-6 rounded-lg mt-4"
>
Buy on Jupiter
</a>
</div>
)}

<section className="max-w-xl mt-10 text-left">
<h2 className="text-2xl font-bold mb-2">🔥 How to Buy</h2>
<ol className="list-decimal list-inside text-gray-300 space-y-1">
<li>Install Phantom or Backpack wallet.</li>
<li>Buy SOL on an exchange and transfer it to your wallet.</li>
<li>Click “Buy on Jupiter” to swap SOL → PTG.</li>
<li>Add PTG mint to your wallet to view tokens.</li>
</ol>

<h2 className="text-2xl font-bold mt-8 mb-2">📜 Tokenomics</h2>
<ul className="list-disc list-inside text-gray-300">
<li>Total Supply: 420,690,000,000 PTG</li>
<li>0% tax — no Grinch greed</li>
<li>Liquidity locked forever</li>
</ul>

<h2 className="text-2xl font-bold mt-8 mb-2">📅 Roadmap</h2>
<ul className="list-disc list-inside text-gray-300">
<li>🎁 Launch on Solana</li>
<li>🎄 Meme blitz on X & Telegram</li>
<li>💎 Listings on DexScreener / Birdeye</li>
<li>🚀 Christmas takeover</li>
</ul>
</section>

<footer className="mt-16 text-gray-500 text-sm">
Token Mint: {TOKEN_MINT}
<br />
Not financial advice. DYOR. © 2025 Pepe The Grinch
</footer>
</div>
);
}

export default function App() {
const network = WalletAdapterNetwork.Mainnet;
const wallets = useMemo(
() => [new PhantomWalletAdapter(), new BackpackWalletAdapter()],
[network]
);

return (
<ConnectionProvider endpoint="https://api.mainnet-beta.solana.com">
<WalletProvider wallets={wallets} autoConnect>
<WalletModalProvider>
<Content />
</WalletModalProvider>
</WalletProvider>
</ConnectionProvider>
);
}