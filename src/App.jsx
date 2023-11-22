import { createWeb3Modal, defaultWagmiConfig } from '@web3modal/wagmi/react';
import { bsc } from 'viem/chains';
import { WagmiConfig } from 'wagmi';
import BaseThemeProvider from './providers/BaseThemeProvider';
import { DarkModeProvider } from './providers/DarkModeProvider';

//WAGMI + WALLETCONNECT
if (!import.meta.env.VITE_WALLETCONNECT_CLOUD_ID) {
  throw new Error('You need to provide WALLETCONNECT_CLOUD_ID env variable');
}
const projectId = import.meta.env.VITE_WALLETCONNECT_CLOUD_ID;
const chains = [bsc];
const metadata = {
  name: 'Bandit Heist',
  description: 'Web3Modal Example',
  url: 'https://banditheist.prpg.quest',
  icons: ['https://banditheist.prpg.quest/images/logo.png'],
};

const wagmiConfig = defaultWagmiConfig({ chains, projectId, metadata });

// 3. Create modal
createWeb3Modal({ wagmiConfig, projectId, chains });

function App({ children }) {
  return (
    <DarkModeProvider>
      <BaseThemeProvider>
        <WagmiConfig config={wagmiConfig}>{children}</WagmiConfig>
      </BaseThemeProvider>
    </DarkModeProvider>
  );
}

export default App;
