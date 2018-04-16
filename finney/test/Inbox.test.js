const assert = require('assert');
const ganache = require('ganache-cli');
const Web3 = require('Web3');


// UPDATE THESE TWO LINES RIGHT HERE!!! <--------
const provider = ganache.provider();
const web3 = new Web3(provider);


const { interface, bytecode } = require('../compile');

let accounts;
let inbox;
const INITIAL_STRING = 'Hi there!';

beforeEach(async () => {
// Get a list of alll accounts
accounts = await web3.eth.getAccounts()


// Use one of those accoutss to deploy
// the contract
inbox = await new web3.eth.Contract(JSON.parse(interface))
  .deploy({ data: bytecode, arguments:['Hi there!'] })
  .send({ from: accounts[0], gas: '1000000'});

  // ADD THIS ONE LINE RIGHT HERE!!! <--------
  inbox.setProvider(provider);
});

describe('Inbox', () => {
    it('deploys a contract', () => {
      assert.ok(inbox.options.address);
    });

    it('has a default message', async () => {
      const massage = await inbox.methods.message().call();
      assert.equal(message, 'Hi there!');
      })
});
