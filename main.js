var _ = require('lodash'),
    carry = require('carrier'),
    mine = require('miner'),
    creeps = require('creeps');

console.log('-------create-----------');
creeps.createResourceGatherers();

var miners = mine.findMiners();
console.log('----------mine-----------', miners);
mine.mine(miners);

var carriers = carry.findCarrys();
console.log('--------------carry------');
carry.carry(carriers);
