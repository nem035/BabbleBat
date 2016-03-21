'use strict';

const flattenObject = (obj) => {
  const flatten = {};
	
  for (let p in obj) {
    if (!obj.hasOwnProperty(p)) continue;
		
    if ((typeof obj[p]) == 'object') {
      let flat = flattenObject(obj[p]);
      for (let q in flat) {
        if (!flat.hasOwnProperty(q)) continue;
        flatten[`${p}.${q}`] = flat[q];
      }
    } else {
      flatten[p] = obj[p];
    }
  }
  return flatten;
};

const randomHex = () => {
  return require('crypto').randomBytes(24).toString('hex');
};

module.exports = {
  flattenObject,
  randomHex
};