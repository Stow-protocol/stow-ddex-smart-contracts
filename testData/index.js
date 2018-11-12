const DDexHub = require('../build/contracts/LinniaDDEXHub');
const {getDDexContracts} = require('./ddexContracts');
const {web3} = require('./config');
const {fixWatch, getPastEvents} = require('./events');
const {setupStakes} = require('./setupStakes');
const {setupOffers} = require('./setupOffers');
const {setupApprovals} = require('./setupApprovals');

const setup = async () => {
  const networkId = await web3.eth.net.getId();
  if(networkId === 3 || networkId === 4 || networkId === 5777) {
    const ddexHub = DDexHub.networks[networkId].address;
    const utils = await getDDexContracts(ddexHub); 
    const recordEvent = fixWatch(utils.records.LinniaRecordAdded, 'LinniaRecordAdded', utils.records);
    const events = await getPastEvents(recordEvent);
    utils.events = events.map(event => event.args);
    await setupStakes(utils);
    await setupOffers(utils);
    await setupApprovals(utils);
  }
};

setup();



