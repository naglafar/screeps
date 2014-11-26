/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports = 'a thing';   && numberOfCarriers <= (2 * numberOfMiners + 1)
 *
 * You can import it from another modules like this:
 * var mod = require('creeps'); // -> 'a thing'
 */

var _ = require('lodash'),
    miner = require('miner'),
    carry = require('carrier'),
    countRole = function (role) {
        return _.filter(Game.creeps, {memory: {role: role}}).length;
    },
    createResourceGatherers = function () {

        var numberOfRequiredMiners = (Game.spawns.Spawn1.room.find(Game.SOURCES).length - 1),
            numberOfRequiredCarriers = numberOfRequiredMiners * 2 + 1,
            numberOfMiners = miner.findMiners().length,
            numberOfCarriers = carry.findCarrys().length;

        console.log(numberOfRequiredMiners, numberOfRequiredCarriers, numberOfMiners, numberOfCarriers);

        if (numberOfMiners < numberOfRequiredMiners) {
            miner.createMiner(Game.spawns.Spawn1);
        }

        if (numberOfCarriers < numberOfRequiredCarriers) {
            carry.createCarry(Game.spawns.Spawn1);
        }
    };

module.exports = {
    countRole: countRole,
    createResourceGatherers: createResourceGatherers
};
