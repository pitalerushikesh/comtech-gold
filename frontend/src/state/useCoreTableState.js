import { useState, useEffect } from 'react';
import { useHttpApi } from './useHttpApi';
import constate from 'constate';

const CoreTableState = () => {
  const { getGoldBars, getBarHolder, getBurnHistory } = useHttpApi();

  const [goldBars, setGoldBars] = useState([]);
  const [barHolders, setBarHolders] = useState([]);
  const [burnHistory, setBurnHistory] = useState([]);

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

  useEffect(() => {
    fetchBarHolders();
    fetchGoldBars();
    fetchBurnHistory();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    goldBars,
    fetchGoldBars,
    barHolders,
    fetchBarHolders,
    burnHistory,
    fetchBurnHistory
  };
};

export const [CoreTableProvider, useCoreTableState] = constate(CoreTableState);
