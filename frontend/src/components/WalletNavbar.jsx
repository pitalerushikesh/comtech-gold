import { useState, useRef } from 'react';
import Web3 from 'web3';
import {
  Badge,
  Box,
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Popover,
  Dialog,
  DialogActions,
  DialogContent,
  Button,
  Alert,
  AlertTitle
} from '@mui/material';
import { useAppState } from 'state';
import { NETWORKS } from 'config';
import { currentNetwork, formatAddressShort } from 'helpers/web3';
import { formatFloat } from 'helpers/numbers';
import xdcPayIcon from 'assets/images/icon-xdcpay.png';
import disconnectWalletSVG from 'assets/images/disconnect-wallet.svg';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { useLocation } from 'react-router-dom';

const { id: currentNetworkId, name: currentNetworkName } = currentNetwork;

const AppNetworkInstanceSelect = () => {
  const location = useLocation();

  return (
    <List>
      {NETWORKS.map(({ id, name, deploymentUrl }) => {
        return (
          <ListItem key={id} disablePadding>
            <ListItemButton
              onClick={() => {
                const { pathname } = location;
                const pathnames = pathname.split('/');
                console.log(pathnames[1]);
                if (pathnames[1] === 'subscription') {
                  window.location.href = `${deploymentUrl}subscription`;
                } else {
                  window.location.href = `${deploymentUrl}home`;
                }
              }}
            >
              {name}
            </ListItemButton>
          </ListItem>
        );
      })}
    </List>
  );
};

const NotMultisig = ({ children }) => {
  const { isMultisig } = useAppState();

  if (isMultisig) {
    return null;
  }

  return children;
};

const NetworkIndicator = () => {
  const { chainId, active, account } = useAppState();

  const getBadgeColor = (active, account, chainId) => {
    if (!active) {
      return 'error';
    }

    if (!account || currentNetworkId !== chainId) {
      return 'warning';
    } else {
      return 'success';
    }
  };

  const [popoverOpen, setPopoverOpen] = useState(false);
  const popoverAnchorRef = useRef(null);

  const closePopover = () => setPopoverOpen(false);
  const openPopover = () => setPopoverOpen(true);

  return (
    <>
      <Box
        onClick={openPopover}
        sx={{
          mb: 2,
          color: '#161c2d',
          pt: 2,
          mr: 2,
          fontWeight: '600',
          fontSize: '0.813rem',
          display: 'flex',
          alignItems: 'center',
          cursor: 'pointer'
        }}
      >
        <Badge
          color={getBadgeColor(active, account, chainId)}
          variant="dot"
          sx={{ mr: 2, fontSize: '0.75rem' }}
        />{' '}
        <Box ref={popoverAnchorRef}>{currentNetworkName}</Box>
        <KeyboardArrowDownIcon />
      </Box>
      <Popover
        open={popoverOpen}
        anchorEl={() => popoverAnchorRef.current}
        onClose={closePopover}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left'
        }}
      >
        <AppNetworkInstanceSelect />
      </Popover>
    </>
  );
};

const WalletAccountIndicator = () => {
  const [open, setOpen] = useState(false);
  const { account, active, connectWallet, disconnectWallet } = useAppState();

  const getTitle = (active, account) => {
    if (!active) {
      return 'Not connected';
    }

    if (!account) {
      return 'Wallet is logged out';
    } else {
      return formatAddressShort(account);
    }
  };

  const connectClick = () => {
    if (!active) {
      connectWallet();
    } else {
      setOpen(true);
    }
  };
  const handleClose = () => {
    setOpen(false);
  };

  const disconnectConfirm = () => {
    disconnectWallet();
    handleClose();
  };

  return (
    <>
      <Dialog open={open} onClose={handleClose} aria-labelledby="alert-dialog-title">
        <Alert severity="warning">
          <AlertTitle>Disconnect Wallet</AlertTitle>
          <DialogContent>Are you sure you want to Disconnect Wallet?</DialogContent>
          <DialogActions>
            <Button variant="outlined" color="secondary" onClick={handleClose}>
              Cancel
            </Button>
            <Button variant="outlined" color="error" onClick={disconnectConfirm} autoFocus>
              Agree
            </Button>
          </DialogActions>
        </Alert>
      </Dialog>
      <Box sx={{ mx: 2 }}>
        <ListItem
          sx={{
            backgroundColor: 'inherit',
            // color: '#fff',
            height: '3.75rem',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}
        >
          <ListItemIcon>
            <Box
              component="img"
              src={active ? xdcPayIcon : disconnectWalletSVG}
              alt="XDC Pay"
              sx={{ width: '2.0rem', height: '2.0rem', m: 1 }}
            />
          </ListItemIcon>

          <ListItemText
            primary={getTitle(active, account)}
            secondary={
              <Box
                component="span"
                id="connect-wallet"
                sx={{ cursor: 'pointer' }}
                onClick={connectClick}
              >
                {active ? 'disconnect' : 'connect'}
              </Box>
            }
            primaryTypographyProps={{ color: '#fff', fontWeight: '600', fontSize: '0.75rem' }}
            secondaryTypographyProps={{
              color: '#fff',
              fontWeight: '500',
              fontSize: '0.75rem'
            }}
          />
        </ListItem>
      </Box>
    </>
  );
};

const WalletBalance = () => {
  const { balance } = useAppState();
  const balanceStr = formatFloat(parseFloat(Web3.utils.fromWei(balance, 'ether')), 3);

  return (
    <Box>
      <ListItem>
        <ListItemText
          primary="Balance"
          secondary={`${balanceStr} XDC`}
          primaryTypographyProps={{ color: '#fff', fontSize: '0.75rem', fontWeight: '600' }}
          secondaryTypographyProps={{ color: '#fff', fontSize: '0.70rem', fontWeight: '500' }}
        />
      </ListItem>
    </Box>
  );
};

const WalletNavbar = () => {
  return (
    <Box
      component="div"
      sx={{
        textAlign: 'center',
        justifyContent: 'space-between',
        alignItems: 'center',
        display: 'flex',
        flexDirection: 'row'
      }}
    >
      <NotMultisig>
        {/* <NetworkIndicator />
        <Divider sx={{ bgcolor: '#fff' }} orientation="vertical" variant="middle" flexItem /> */}
        <WalletAccountIndicator />
      </NotMultisig>
      <Divider sx={{ bgcolor: '#fff' }} orientation="vertical" variant="middle" flexItem />
      <WalletBalance />
    </Box>
  );
};

export default WalletNavbar;
