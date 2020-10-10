exports.hashes = [
  { hash: '0' },  { hash: '1' },  { hash: '2' },  { hash: '3' },
  { hash: '4' },  { hash: '5' },  { hash: '6' },  { hash: '7' },
  { hash: '8' },  { hash: '9' },  { hash: '10' }, { hash: '11' },
  { hash: '12' }, { hash: '13' }, { hash: '14' }, { hash: '15' },
  { hash: '16' }, { hash: '17' }, { hash: '18' }, { hash: '19' },
  { hash: '20' }, { hash: '21' }, { hash: '22' }, { hash: '23' },
  { hash: '24' }, { hash: '25' }, { hash: '26' }, { hash: '27' },
  { hash: '28' }, { hash: '29' }, { hash: '30' }, { hash: '31' },
  { hash: '32' }, { hash: '33' }, { hash: '34' }, { hash: '35' },
  { hash: '36' }, { hash: '37' }, { hash: '38' }, { hash: '39' },
  { hash: '40' }, { hash: '41' }, { hash: '42' }, { hash: '43' },
  { hash: '44' }, { hash: '45' }, { hash: '46' }, { hash: '47' },
  { hash: '48' }, { hash: '49' }, { hash: '50' }, { hash: '51' },
  { hash: '52' }, { hash: '53' }, { hash: '54' }, { hash: '55' },
  { hash: '56' }, { hash: '57' }, { hash: '58' }, { hash: '59' },
  { hash: '60' }, { hash: '61' }, { hash: '62' }, { hash: '63' },
  { hash: '64' }, { hash: '65' }, { hash: '66' }, { hash: '67' },
  { hash: '68' }, { hash: '69' }, { hash: '70' }, { hash: '71' },
  { hash: '72' }, { hash: '73' }, { hash: '74' }, { hash: '75' },
  { hash: '76' }, { hash: '77' }, { hash: '78' }, { hash: '79' },
  { hash: '80' }, { hash: '81' }, { hash: '82' }, { hash: '83' },
  { hash: '84' }, { hash: '85' }, { hash: '86' }, { hash: '87' },
  { hash: '88' }, { hash: '89' }, { hash: '90' }, { hash: '91' },
  { hash: '92' }, { hash: '93' }, { hash: '94' }, { hash: '95' },
  { hash: '96' }, { hash: '97' }, { hash: '98' }, { hash: '99' }
];

function generate() {
  let array = [];
  for(let i = 0; i<100; i++){
    array.push({hash: i.toString()})
  }
  console.log(array)
}

