import { useState, useEffect } from 'react';
import { useHttpApi } from './useHttpApi';
import constate from 'constate';

const CoreTableState = () => {
  const {
    getGoldBars,
    getBarHolder,
    getBurnHistory,
    getEditBarStatus,
    getMintHistory,
    getInitiatedMintHistory,
    getInitiatedBurn
  } = useHttpApi();

  const [goldBars, setGoldBars] = useState([]);
  const [barHolders, setBarHolders] = useState([]);
  const [burnHistory, setBurnHistory] = useState([]);
  const [mintHistory, setMintHistory] = useState([]);
  const [initiatedMintHistory, setInitiatedMintHistory] = useState([]);
  const [initiatedBurn, setInitiatedBurn] = useState([]);

  // const [editBarStatus, setEditBarStatus] = useState();

  const fetchBarHolders = async () => {
    const res = await getBarHolder();
    setBarHolders(res);
  };

  const fetchGoldBars = async () => {
    const res = await getGoldBars();
    setGoldBars(res);
  };

  const fetchBurnHistory = async () => {
    const res = await getBurnHistory();
    setBurnHistory(res);
  };

  // const fetchEditBarStatus = async () => {
  //   const res = await getEditBarStatus();
  //   console.log(
  //     '🚀 ~ file: useCoreTableState.js ~ line 31 ~ fetchEditBarStatus ~ res',
  //     res[0]?.status
  //   );
  //   setEditBarStatus(res[0]?.status);
  // };

  const fetchMintHistory = async () => {
    const res = await getMintHistory();
    setMintHistory(res);
  };

  const fetchInitiatedMintHistory = async () => {
    const res = await getInitiatedMintHistory();
    setInitiatedMintHistory(res);
  };

  const fetchInitiatedBurn = async () => {
    const res = await getInitiatedBurn();
    setInitiatedBurn(res);
  };

  useEffect(() => {
    fetchBarHolders();
    fetchGoldBars();
    fetchBurnHistory();
    // fetchEditBarStatus();
    fetchMintHistory();
    fetchInitiatedMintHistory();
    fetchInitiatedBurn();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    goldBars,
    fetchGoldBars,
    barHolders,
    fetchBarHolders,
    burnHistory,
    fetchBurnHistory,
    // editBarStatus,
    mintHistory,
    fetchMintHistory,
    initiatedMintHistory,
    fetchInitiatedMintHistory,
    initiatedBurn,
    fetchInitiatedBurn
  };
};

export const [CoreTableProvider, useCoreTableState] = constate(CoreTableState);
