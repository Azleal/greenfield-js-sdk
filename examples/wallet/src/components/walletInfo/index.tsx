import { BSC_CHAIN_ID, GREEN_CHAIN_ID, metaMaskWalletConnector } from '@/config';
import {
  useAccount,
  useBalance,
  useConnect,
  useDisconnect,
  useNetwork,
  useSwitchNetwork,
} from 'wagmi';

export const WalletInfo = () => {
  const { address, connector, isConnected } = useAccount();
  const { connect } = useConnect({
    // connector: trustWalletConnector,
    connector: metaMaskWalletConnector,
  });
  const { disconnect } = useDisconnect();
  const { chain } = useNetwork();
  const { switchNetwork: switchToGreenField } = useSwitchNetwork({
    chainId: GREEN_CHAIN_ID,
  });

  const { switchNetwork: switchToBSC } = useSwitchNetwork({
    chainId: BSC_CHAIN_ID,
  });

  const balance = useBalance({
    address,
    watch: true,
  });

  if (!isConnected) {
    return <button onClick={() => connect()}>Connect Wallet</button>;
  }

  return (
    <div>
      <div>
        <h2>address : {address}</h2>
        <h2>connector: {connector?.name} </h2>
        <button onClick={() => disconnect()}>Disconnect</button>
      </div>

      <h2>change chain chainId {chain?.id}</h2>
      <h3>balance: {balance.data?.formatted}</h3>
      <button
        onClick={() => {
          switchToGreenField?.(GREEN_CHAIN_ID);
        }}
      >
        switch to green field
      </button>
      <br />
      <button
        onClick={() => {
          switchToBSC?.(BSC_CHAIN_ID);
        }}
      >
        switch to bsc
      </button>
    </div>
  );
};
