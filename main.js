var _ = require('lodash'),
    carry = require('carry'),
    mine = require('mine'),
    creeps = require('creeps'),
    guard = require('guard'),
    medic = require('medic');

console.log('-------create-----------');
creeps.createResourceGatherers();

console.log('-----------guard---------');
var guards = guard.findGuards();
guard.guard(guards);

console.log('-----------medic---------');
var medics = medic.findMedics();
medic.medic(medics);

console.log('----------mine-----------');
var miners = mine.findMiners();
mine.mine(miners);

console.log('--------------carry------');
var carriers = carry.findCarrys();
carry.carry(carriers);
