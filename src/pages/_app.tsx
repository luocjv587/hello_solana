import type { AppProps } from 'next/app';
import '../styles/globals.css';
import { WalletContextProvider } from '../context/WalletContext';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <WalletContextProvider>
      <Component {...pageProps} />
    </WalletContextProvider>
  );
} 