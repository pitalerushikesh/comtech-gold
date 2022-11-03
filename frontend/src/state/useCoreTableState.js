import { useState, useEffect } from 'react';
import { useHttpApi } from './useHttpApi';
import constate from 'constate';

const CoreTableState = () => {
  const { getGoldBars, getBarHolder, getBurnHistory, getEditBarStatus } = useHttpApi();

  const [goldBars, setGoldBars] = useState([]);
  const [barHolders, setBarHolders] = useState([]);
  const [burnHistory, setBurnHistory] = useState([]);

  const [editBarStatus, setEditBarStatus] = useState();

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

  const fetchEditBarStatus = async () => {
    const res = await getEditBarStatus();
    console.log(
      '🚀 ~ file: useCoreTableState.js ~ line 31 ~ fetchEditBarStatus ~ res',
      res[0].status
    );
    setEditBarStatus(res[0].status);
  };

  useEffect(() => {
    fetchBarHolders();
    fetchGoldBars();
    fetchBurnHistory();
    fetchEditBarStatus();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    goldBars,
    fetchGoldBars,
    barHolders,
    fetchBarHolders,
    burnHistory,
    fetchBurnHistory,
    editBarStatus
  };
};

export const [CoreTableProvider, useCoreTableState] = constate(CoreTableState);
