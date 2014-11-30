/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports = 'a thing';   && numberOfCarriers <= (2 * numberOfMiners + 1)
 *
 * You can import it from another modules like this:
 * var mod = require('creeps'); // -> 'a thing'
 */

var _ = require('lodash'),
    miner = require('mine'),
    carry = require('carry'),
    guard = require('guard'),
    medic = require('medic'),
    countRole = function (role) {
        return _.filter(Game.creeps, {memory: {role: role}}).length;
    },
    createResourceGatherers = function () {

        var numberOfRequiredMiners = (Game.spawns.Spawn1.room.find(Game.SOURCES).length - 1),
            numberOfRequiredCarriers = numberOfRequiredMiners * 2 + 1,
            numberOfMiners = miner.findMiners().length,
            numberOfCarriers = carry.findCarrys().length,
            numberOfGuards = guard.findGuards().length,
            numberOfMedics = medic.findMedics().length,
            unitCount = {
                carryCount: numberOfCarriers,
                minerCount: numberOfMiners,
                guardCount: numberOfGuards,
                medicCount: numberOfMedics
            };

        console.log(
            'nm: ' + numberOfMiners + '/' +numberOfRequiredMiners,
            'nrc: ' + numberOfCarriers + '/' + numberOfRequiredCarriers,
            'ng: ' + numberOfGuards,
            'nm: ' + numberOfMedics
        );

        if (shouldCreateMiner(unitCount, numberOfRequiredMiners)) {
            console.log('creating miner');
            miner.createMiner(Game.spawns.Spawn1, 'miner' + numberOfMiners, 0);
        } else if (shouldCreateCarry(unitCount)) {
            console.log('creating carry');
            carry.createCarry(Game.spawns.Spawn1, 'carry' + numberOfCarriers, 0);
        } else if (shouldCreateMedic(unitCount)) {
            console.log('creating medic');
            medic.createMedic(Game.spawns.Spawn1, 0);
        } else if (shouldCreateGuard(unitCount)) {
            console.log('creating guard');
            guard.createGuard(Game.spawns.Spawn1, 'guard' + numberOfGuards, 0);
        }
    },
    shouldCreateMiner = function (unitCount, numberOfRequiredMiners) {

        var requiredGuardsAndCarrys = unitCount.minerCount * 2;

        console.log('requiredGuardsAndCarrys', requiredGuardsAndCarrys, JSON.stringify(unitCount), numberOfRequiredMiners);
        return unitCount.carryCount >= requiredGuardsAndCarrys &&
            unitCount.guardCount >= requiredGuardsAndCarrys
            && unitCount.minerCount < numberOfRequiredMiners;
    },
    shouldCreateCarry = function ( unitCount ) {
        return unitCount.carryCount < unitCount.minerCount * 2;
    },
    shouldCreateGuard = function ( unitCount ) {
        return unitCount.guardCount < unitCount.minerCount * 4;
    },
    shouldCreateMedic = function ( unitCount ) {
        return unitCount.medicCount < unitCount.guardCount / 3
    };

module.exports = {
    countRole: countRole,
    createResourceGatherers: createResourceGatherers
};
