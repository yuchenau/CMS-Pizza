const bcrypt = require('bcrypt');

const password = '123';
const salt = bcrypt.genSaltSync(12);
const hashed = bcrypt.hashSync(password, salt);
console.log(hashed);

// $2b$12$uW1hzqcnbI6GOQCwDiKeZOhwRYynaQ2TjWve8dpBhMKEpDWEkYqJa
// $2b$12$cbpBc.JnZYnyV1qInjzDCu6PMcL2GeaA8g59lMeZHHM1jlWFzBdRa
// $2b$12$qIT4jKhf9up0UnBage.qd.riNQIeW1DnrLu984268M6zbIt.jNTRm