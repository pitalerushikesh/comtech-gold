import constate from 'constate';
import Contract from 'contracts/ABI.json';
import { useEffect, useState } from 'react';
import Web3 from 'web3';

const AppState = async () => {
  const { abi, address: token } = Contract;
  console.log('🚀 ~ file: useAppState.js ~ line 8 ~ AppState ~ token', token);
  const [account, setAccount] = useState('');

  const web3 = new Web3(Web3.givenProvider);
  const contract = new web3.eth.Contract(abi, token);

  const _account = async () => {
    const account = await web3.eth.getAccounts().then((accounts) => {
      return accounts[0];
    });
    console.log('🚀 ~ file: Home.js ~ line 38 ~ account ~ account', account);
    setAccount(account);
    return account;
  };

  useEffect(() => {
    const acc = _account();
    console.log('🚀 ~ file: Home.js ~ line 44 ~ useEffect ~ acc', acc);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { account, contract, token };
};

export const [AppStateProvider, useAppState] = constate(AppState);
