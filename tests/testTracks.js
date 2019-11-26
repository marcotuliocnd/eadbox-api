const Eadbox = require('../src/eadbox-api');

async function start() {
  const adminAuthToken = 'TTZzhduB6szRJGHcPtBi';

  const url = 'https://unispk.com.br';
  const ead = new Eadbox(url);

  const allTracks = await ead.getAllTracks(adminAuthToken);
  console.log(allTracks);

  const numberOfTracks = await ead.getNumberOfTracks(adminAuthToken);

  console.log(`Esse ead possui ${numberOfTracks} trilhas`);
}

start();
