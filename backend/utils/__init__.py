import re
from web3 import Web3

def ethToXdc(address):
    return re.sub("^0x", "xdc", address)

def xdcToEth(address):
    return re.sub("^xdc", "0x", address)

def toChecksumAddress(address):
    return Web3.toChecksumAddress(address)