import constate from 'constate';
import Contract from 'contracts/ABI.json';
import { useCallback, useEffect, useMemo, useState } from 'react';
import Web3 from 'web3';
import Onboard from 'bnc-onboard';
import { useWeb3React } from '@web3-react/core';
import { SafeAppConnector, useSafeAppConnection } from '@gnosis.pm/safe-apps-web3-react';
import { selectedWalletPersistence } from 'persistence';
import WALLETS from 'config/wallets';
import { InjectedConnector, NoEthereumProviderError } from '@yodaplus/injected-connector';

import {
  sendTransaction,
  sendTransactionHashOnly,
  WEB3_STATUS,
  currentNetwork,
  transformProviderFromXinfin,
  readOnlyWeb3,
  sendNativeTransaction,
  getTransactionHash
} from 'helpers/web3';

require('dotenv').config();

const safeAppConnector = new SafeAppConnector();

const POLL_INTERVAL = 1000;

const getOnboard = ({ onProvider }) => {
  const onboard = Onboard({
    networkId: currentNetwork.id,
    networkName: currentNetwork.name,
    subscriptions: {
      wallet: (wallet) => {
        if (wallet.provider && 'qrcodeModalOptions' in wallet.provider) {
          wallet.provider.connector._qrcodeModalOptions = {
            desktopLinks: []
          };
        }

        if (wallet.provider) {
          onProvider(transformProviderFromXinfin(wallet.provider));
        }
      }
    },
    walletSelect: {
      description: 'Please select a wallet to connect to Yodaplus Tokenization Platform',
      explanation:
        'Wallets are used to send, receive, and store digital assets. Wallets come in many forms. They are either built into your browser, an extension added to your browser, a piece of hardware plugged into your computer or even an app on your phone.',
      wallets: WALLETS
    },
    walletCheck: [
      { checkName: 'derivationPath' },
      { checkName: 'connect' },
      { checkName: 'accounts' }
    ]
  });

  return onboard;
};

const useMultisigStatus = () => {
  const [isMultisig, setIsMultisig] = useState(null);

  useEffect(() => {
    safeAppConnector.isSafeApp().then(setIsMultisig);
  }, []);

  return { isMultisig };
};

const AppState = () => {
  const { activate, deactivate, active, account, library: walletWeb3, chainId } = useWeb3React();

  const [status, setStatus] = useState(WEB3_STATUS.UNKNOWN);
  const [balance, setBalance] = useState('0');

  const [ownerAddr, setOwnerAddr] = useState('0x0000000000000000000000000000000000000000');
  const [initiatorAddr, setInitiatorAddr] = useState('0x0000000000000000000000000000000000000000');
  const [executorAddr, setExecutorAddr] = useState('0x0000000000000000000000000000000000000000');
  const [mintWalletAddr, setMintWalletAddr] = useState(
    '0x0000000000000000000000000000000000000000'
  );
  // State to hold gas price
  const [gasPrice, setGasPrice] = useState(null);

  const { isMultisig } = useMultisigStatus();

  // const { throwErrorMessage } = useAppState();

  const web3 = walletWeb3 ?? readOnlyWeb3;

  if (!web3) {
    throw new Error('web3 must be available at this point');
  }

  const onProvider = useCallback(
    async (provider) => {
      setStatus(WEB3_STATUS.UNKNOWN);

      const connector =
        typeof provider.safe !== 'undefined'
          ? safeAppConnector
          : new InjectedConnector({ provider });

      try {
        await activate(connector, undefined, true);
        setStatus(WEB3_STATUS.READY);
      } catch (e) {
        if (e instanceof NoEthereumProviderError) {
          setStatus(WEB3_STATUS.UNAVAILABLE);
        }
      }
    },
    [activate]
  );

  const onboard = useMemo(() => getOnboard({ onProvider }), [onProvider]);

  const connectWallet = useCallback(
    async (wallet) => {
      const selected = await onboard.walletSelect(wallet);
      if (!selected) {
        return false;
      }

      const ready = await onboard.walletCheck();
      if (!ready) {
        return false;
      }

      const {
        wallet: { name }
      } = onboard.getState();

      selectedWalletPersistence.set(name);

      return true;
    },
    [onboard]
  );

  // Effect to fetch gas price
  useEffect(() => {
    const fetchGasPrice = async () => {
      try {
        const price = await web3.eth.getGasPrice();
        setGasPrice(price);
      } catch (error) {
        console.error('Error fetching gas price:', error);
      }
    };

    if (web3) {
      fetchGasPrice();
    }
  }, [web3]);

  const disconnectWallet = async () => {
    onboard.walletReset();
    deactivate();
    selectedWalletPersistence.clear();
  };

  const contract = useMemo(
    () =>
      new web3.eth.Contract(currentNetwork.tokenContractAbi, currentNetwork.tokenContractAddress, {
        from: account,
        ...(gasPrice && { gasPrice })
      }),
    [web3, account, currentNetwork, gasPrice]
  );

  const controllerContract = useMemo(
    () =>
      new web3.eth.Contract(
        currentNetwork.controllerContractAbi,
        currentNetwork.controllerContractAddress,
        {
          from: account,
          ...(gasPrice && { gasPrice })
        }
      ),
    [web3, account, currentNetwork, gasPrice]
  );

  const wrapContractCall = useCallback(
    (func) => {
      return (...args) => {
        if (!contract) {
          throw new Error('Smart contract is not available');
        }

        return func(...args);
      };
    },
    [contract]
  );

  // eslint-disable-next-line

  // default Mint implementation with CGO token Contract
  // const mintToken = useCallback(
  //   wrapContractCall((addr, amount) =>
  //     sendTransactionHashOnly(
  //       web3,
  //       contract.methods.mint(addr, web3.utils.toWei(amount.toString(), 'ether'))
  //     )
  //   ),
  //   [wrapContractCall, web3, contract]
  // );

  // eslint-disable-next-line
  const mintToken = useCallback(
    wrapContractCall((addr, amount, barNumber, warrantNumber) =>
      sendTransactionHashOnly(
        web3,
        controllerContract.methods.mint(addr, amount, barNumber, warrantNumber)
      )
    ),
    [wrapContractCall, web3, controllerContract]
  );

  // eslint-disable-next-line
  const addExistingBar = useCallback(
    wrapContractCall((barNumber, warrantNumber) =>
      sendTransactionHashOnly(
        web3,
        controllerContract.methods.addBarNumWarrantNum(barNumber, warrantNumber)
      )
    ),
    [wrapContractCall, web3, controllerContract]
  );

  // eslint-disable-next-line
  // default Burn implementation with CGO token Contract
  // const burnToken = useCallback(
  //   wrapContractCall((amount) =>
  //     sendTransactionHashOnly(
  //       web3,
  //       contract.methods.burn(web3.utils.toWei(amount.toString(), 'ether'))
  //     )
  //   ),
  //   [wrapContractCall, web3, contract]
  // );

  // eslint-disable-next-line
  const burnToken = useCallback(
    wrapContractCall((amount, barNumber, warrantNumber) =>
      sendTransactionHashOnly(
        web3,
        controllerContract.methods.burn(amount, barNumber, warrantNumber)
      )
    ),
    [wrapContractCall, web3, controllerContract]
  );

  // eslint-disable-next-line
  const checkBlackList = useCallback(
    wrapContractCall((addr) => contract.methods.isBlackListed(addr).call()),
    [wrapContractCall, web3, contract]
  );

  // eslint-disable-next-line
  const updateBlackList = useCallback(
    wrapContractCall((addr, isBlackList) =>
      sendTransactionHashOnly(web3, controllerContract.methods.blacklistUpdate(addr, isBlackList))
    ),
    [wrapContractCall, web3, controllerContract]
  );

  // eslint-disable-next-line
  const setInitiator = useCallback(
    wrapContractCall((addr) =>
      sendTransactionHashOnly(web3, controllerContract.methods.setInitiatorAddr(addr))
    ),
    [wrapContractCall, web3, controllerContract]
  );

  // eslint-disable-next-line
  const setExecutor = useCallback(
    wrapContractCall((addr) =>
      sendTransactionHashOnly(web3, controllerContract.methods.setExecutorAddr(addr))
    ),
    [wrapContractCall, web3, controllerContract]
  );

  // eslint-disable-next-line
  const setMinterWalletAddr = useCallback(
    wrapContractCall((addr) =>
      sendTransactionHashOnly(web3, controllerContract.methods.setMinterWalletAddr(addr))
    ),
    [wrapContractCall, web3, controllerContract]
  );

  // eslint-disable-next-line
  const initiateMint = useCallback(
    wrapContractCall((barNumber, warrantNumber) =>
      sendTransactionHashOnly(
        web3,
        controllerContract.methods.initiateMint(barNumber, warrantNumber)
      )
    ),
    [wrapContractCall, web3, controllerContract]
  );

  // eslint-disable-next-line
  const cancelInitiateMint = useCallback(
    wrapContractCall((barNumber, warrantNumber) =>
      sendTransactionHashOnly(
        web3,
        controllerContract.methods.cancelInitiateMint(barNumber, warrantNumber)
      )
    ),
    [wrapContractCall, web3, controllerContract]
  );

  // eslint-disable-next-line
  const initiateBurn = useCallback(
    wrapContractCall((barNumber, warrantNumber) =>
      sendTransactionHashOnly(
        web3,
        controllerContract.methods.initiateBurn(barNumber, warrantNumber)
      )
    ),
    [wrapContractCall, web3, controllerContract]
  );

  // eslint-disable-next-line
  const cancelInitiateBurn = useCallback(
    wrapContractCall((barNumber, warrantNumber) =>
      sendTransactionHashOnly(
        web3,
        controllerContract.methods.cancelInitiateBurn(barNumber, warrantNumber)
      )
    ),
    [wrapContractCall, web3, controllerContract]
  );

  // eslint-disable-next-line
  const checkEditBarStatus = useCallback(
    wrapContractCall(() => controllerContract.methods.isEditBarPaused().call()),
    [wrapContractCall, web3, controllerContract]
  );

  // eslint-disable-next-line
  const updateEditBarStatus = useCallback(
    wrapContractCall((status) =>
      sendTransactionHashOnly(web3, controllerContract.methods.pauseEditBar(status))
    ),
    [wrapContractCall, web3, controllerContract]
  );

  // eslint-disable-next-line
  const RemoveExistingBar = useCallback(
    wrapContractCall((barNumber, warrantNumber) =>
      sendTransactionHashOnly(
        web3,
        controllerContract.methods.removeBarNumWarrantNum(barNumber, warrantNumber)
      )
    ),
    [wrapContractCall, web3, controllerContract]
  );

  // eslint-disable-next-line
  const checkOwner = useCallback(
    wrapContractCall(() => controllerContract.methods.owner().call()),
    [wrapContractCall, web3, controllerContract]
  );

  // eslint-disable-next-line
  const checkInitiator = useCallback(
    wrapContractCall(() => controllerContract.methods.initiatorAddr().call()),
    [wrapContractCall, web3, controllerContract]
  );

  // eslint-disable-next-line
  const checkExecutor = useCallback(
    wrapContractCall(() => controllerContract.methods.executorAddr().call()),
    [wrapContractCall, web3, controllerContract]
  );

  // eslint-disable-next-line
  const checkMinterAddress = useCallback(
    wrapContractCall(() => controllerContract.methods.minterWalletAddr().call()),
    [wrapContractCall, web3, controllerContract]
  );

  useEffect(() => {
    const ownerAdress = async () => {
      const _ownerAddr = await checkOwner();
      setOwnerAddr(_ownerAddr);
    };
    ownerAdress();
    const initiatorAdress = async () => {
      const _initiatorAddr = await checkInitiator();
      setInitiatorAddr(_initiatorAddr);
    };
    initiatorAdress();
    const executorAdress = async () => {
      const _executorAddr = await checkExecutor();
      setExecutorAddr(_executorAddr);
    };
    executorAdress();
    const minterWalletAdress = async () => {
      const _minterWalletAddr = await checkMinterAddress();
      setMintWalletAddr(_minterWalletAddr);
    };
    minterWalletAdress();
  }, [web3, controllerContract, checkOwner, checkInitiator, checkExecutor, checkMinterAddress]);

  useEffect(() => {
    if (!web3 || !account) {
      setBalance('0');
      return () => {};
    }

    let timerId = null;
    let canceled = false;

    const poll = async () => {
      timerId = null;

      try {
        const balance_ = await web3.eth.getBalance(account);

        if (!canceled) {
          setBalance(balance_);
        }
      } catch (e) {
        console.warn(`Something is wrong when polling for account balance: ${e}`);
      }

      if (!canceled) {
        timerId = setTimeout(poll, POLL_INTERVAL);
      }
    };

    poll();

    return () => {
      if (timerId) {
        clearTimeout(timerId);
      }

      canceled = true;
    };
  }, [web3, account]);

  useEffect(() => {
    if (isMultisig === null || isMultisig === true) {
      return;
    }

    (async () => {
      const selectedWallet = selectedWalletPersistence.get();

      if (!selectedWallet) {
        return;
      }

      const connected = await connectWallet(selectedWallet);

      if (!connected) {
        selectedWalletPersistence.clear();
      }
    })();
    // eslint-disable-next-line
  }, [isMultisig]);

  return {
    isMultisig,
    status,
    active,
    account,
    chainId,
    web3,
    mintToken,
    balance,
    connectWallet,
    disconnectWallet,
    checkBlackList,
    updateBlackList,
    burnToken,
    addExistingBar,
    checkEditBarStatus,
    updateEditBarStatus,
    RemoveExistingBar,
    setInitiator,
    setExecutor,
    initiateMint,
    initiateBurn,
    cancelInitiateMint,
    cancelInitiateBurn,
    ownerAddr,
    initiatorAddr,
    executorAddr,
    setMinterWalletAddr,
    mintWalletAddr
  };
};

export const [AppStateProvider, useAppState] = constate(AppState);
