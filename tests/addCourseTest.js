const Eadbox = require('../src/eadbox-api');

async function start() {
  const adminAuthToken = 'TTZzhduB6szRJGHcPtBi';
  const userName = 'Marco Tulio Candeo - SPK';
  const courseName = 'Financeiro - Introdução';
  const url = 'https://unispk.com.br';

  const ead = new Eadbox(url);

  const course = await ead.addCourseForUser(adminAuthToken, userName, courseName);
  console.log(course);
}

start();
