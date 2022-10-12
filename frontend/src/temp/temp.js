// Received TransferEventReceiver event: AttributeDict({'args': AttributeDict({'from': '0x08c7b249A76aa982B01FAbc9a4D990BD39D3119a', 'to': '0x7BBfC8C17619C0076C1a65EE89aEd5A3FD6eE797', 'value': 5000000000000000000}), 'event': 'Transfer', 'logIndex': 1, 'transactionIndex': 1, 'transactionHash': HexBytes('0x41769033c04494ac0fbf956bf7db23c54cfbc23052f15f507dfaeaeabf23cedd'), 'address': '0x11c63490732A6BB77C5963b6Ef287946BD471fA1', 'blockHash': HexBytes('0x58e313c92cb3ebd97c85fc2d34d9dc1dfbf072c3ad694ef406292863c1d610be'), 'blockNumber': 39758967})

// Received TransferEventReceiver event: AttributeDict({'args': AttributeDict({'from': '0x0000000000000000000000000000000000000000', 'to': '0x7BBfC8C17619C0076C1a65EE89aEd5A3FD6eE797', 'value': 1000000000000000000000}), 'event': 'Transfer', 'logIndex': 1, 'transactionIndex': 1, 'transactionHash': HexBytes('0xf0c13b696db39a38072ce4f65b1e93c7940174d4b605e7abd5dcf5254cc06471'), 'address': '0x049fd2e07b3872c947C1F5a0dA888A5F76d1b980', 'blockHash': HexBytes('0x5f385a84fbb40525a2b0b9db184095882a5aa32347db70eebe3763dee1549cef'), 'blockNumber': 39883656})

// yodaplus-dev_comtech-celery-worker-1  | [2022-10-10 09:33:31,659: WARNING/ForkPoolWorker-2] Received Mint event: AttributeDict({'args': AttributeDict({'to': '0x7BBfC8C17619C0076C1a65EE89aEd5A3FD6eE797', 'amount': 1000000000000000000000, 'Bar_Number': 'barz1234', 'Warrant_Number': 'barz1234'}), 'event': 'BarMint', 'logIndex': 2, 'transactionIndex': 1, 'transactionHash': HexBytes('0xf0c13b696db39a38072ce4f65b1e93c7940174d4b605e7abd5dcf5254cc06471'), 'address': '0x348D90737268f35B162F4645771245aB2E609Fad', 'blockHash': HexBytes('0x5f385a84fbb40525a2b0b9db184095882a5aa32347db70eebe3763dee1549cef'), 'blockNumber': 39883656})

// Received TransferEventReceiver event: AttributeDict({'args': AttributeDict({'from': '0x88fc1b007Af9C38Cd217699B991b3889E080A251', 'to': '0x0000000000000000000000000000000000000000', 'value': 1000000000000000000000}), 'event': 'Transfer', 'logIndex': 1, 'transactionIndex': 1, 'transactionHash': HexBytes('0x69bd295ca31e8c838f4ef2d8028c32e4880d8c7c254058ce6c684dc75b275d9a'), 'address': '0x1ab4d1333a0Ed35797f4CC6B1Da12E6040d1592f', 'blockHash': HexBytes('0xc65dc36bd3d385dcf593947a7621eb76edb67e5a740392970443c4daa8394444'), 'blockNumber': 39939018})
// yodaplus-dev_comtech-celery-worker-1  | [2022-10-11 16:18:10,947: WARNING/ForkPoolWorker-2] Received Burn event: AttributeDict({'args': AttributeDict({'burn_from': '0x88fc1b007Af9C38Cd217699B991b3889E080A251', 'amount': 1000000000000000000000, 'Bar_Number': 'todaybar', 'Warrant_Number': 'todaybar'}), 'event': 'BarBurn', 'logIndex': 2, 'transactionIndex': 1, 'transactionHash': HexBytes('0x69bd295ca31e8c838f4ef2d8028c32e4880d8c7c254058ce6c684dc75b275d9a'), 'address': '0x88fc1b007Af9C38Cd217699B991b3889E080A251', 'blockHash': HexBytes('0xc65dc36bd3d385dcf593947a7621eb76edb67e5a740392970443c4daa8394444'), 'blockNumber': 39939018})
// yodaplus-dev_comtech-celery-worker-1  | [2022-10-11 16:18:10,990: WARNING/ForkPoolWorker-2] Burn From: 0x88fc1b007Af9C38Cd217699B991b3889E080A251, Amount: 1000000000000000000000, Warrant Number: todaybar, Bar Number: todaybar, tx_hash: 0x69bd295ca31e8c838f4ef2d8028c32e4880d8c7c254058ce6c684dc75b275d9a

const Tranferevent = {
  args: AttributeDict({
    from: '0x08c7b249A76aa982B01FAbc9a4D990BD39D3119a',
    to: '0x7BBfC8C17619C0076C1a65EE89aEd5A3FD6eE797',
    value: 5000000000000000000
  }),
  event: 'Transfer',
  logIndex: 1,
  transactionIndex: 1,
  transactionHash: HexBytes('0x41769033c04494ac0fbf956bf7db23c54cfbc23052f15f507dfaeaeabf23cedd'),
  address: '0x11c63490732A6BB77C5963b6Ef287946BD471fA1',
  blockHash: HexBytes('0x58e313c92cb3ebd97c85fc2d34d9dc1dfbf072c3ad694ef406292863c1d610be'),
  blockNumber: 39758967
};

const Mintevent = AttributeDict({
  args: AttributeDict({
    to: '0x7BBfC8C17619C0076C1a65EE89aEd5A3FD6eE797',
    amount: 1000000000000000000000,
    Bar_Number: 'barz1234',
    Warrant_Number: 'barz1234'
  }),
  event: 'BarMint',
  logIndex: 2,
  transactionIndex: 1,
  transactionHash: HexBytes('0xf0c13b696db39a38072ce4f65b1e93c7940174d4b605e7abd5dcf5254cc06471'),
  address: '0x348D90737268f35B162F4645771245aB2E609Fad',
  blockHash: HexBytes('0x5f385a84fbb40525a2b0b9db184095882a5aa32347db70eebe3763dee1549cef'),
  blockNumber: 39883656
});
