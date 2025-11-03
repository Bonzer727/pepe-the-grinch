export default function Home() {
return (
<div style={{
fontFamily: 'Comic Sans MS, sans-serif',
backgroundColor: '#001b00',
color: '#00ff99',
minHeight: '100vh',
textAlign: 'center',
padding: '80px 20px'
}}>
<h1 style={{ fontSize: '3em', marginBottom: '0.3em' }}>🐸 Pepe The Grinch 🧤</h1>
<p style={{ fontSize: '1.3em' }}>
The meme coin that steals the charts, not Christmas. 🎄
</p>

<div style={{ marginTop: '50px' }}>
<a href="https://dexscreener.com/solana" target="_blank" rel="noopener noreferrer"
style={{
backgroundColor: '#00ff99',
color: '#001b00',
padding: '15px 30px',
borderRadius: '10px',
textDecoration: 'none',
fontWeight: 'bold',
fontSize: '1.2em'
}}>
Buy on Solana 🚀
</a>
</div>

<footer style={{ marginTop: '80px', fontSize: '0.9em', opacity: 0.8 }}>
© 2025 Pepe The Grinch. No gifts, just gains. 🎁
</footer>
</div>
);
}