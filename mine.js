/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('miner'); // -> 'a thing'
 */

var _ = require('lodash'),
    mine = function (creeps) {

        console.log('mining', JSON.stringify(arguments));


        _.forEach(creeps, function (creep) {

            var activeSrc = creep.room.find(Game.SOURCES_ACTIVE),
                target,
                dest;

            if (creep.memory.path && creep.memory.path.length >= 1 ) {
                dest = creep.memory.path.splice(0,1)[0];
                creep.moveTo(dest);
            } else if (creep.memory.ct) {
                var mineResult = creep.harvest(creep.pos.findNearest(Game.SOURCES_ACTIVE));
                if (mineResult !== 0) {
                    console.log('mine failed', mineResult);
                    delete creep.memory.path;
                    delete creep.memory.ct;
                }
            } else {
                target = activeSrc[0];
                if (target) {
                    creep.memory.path = target.room.findPath(creep.pos, target.pos);
                    creep.memory.ct = creep.memory.path[creep.memory.path.length - 1];
                    dest = creep.memory.path.splice(0,1)[0];
                    creep.moveTo(dest);
                    creep.harvest(dest);
                }
            }
        });
    },
    createMiner = function (spawn, name) {
        spawn.createCreep([Game.WORK, Game.WORK, Game.WORK, Game.WORK, Game.MOVE], name, {role: 'miner'});
    },
    findMiners = function () {
        return _.filter(Game.creeps, function (creep) {
            return creep.memory.role === 'miner';
        });
    };

module.exports = {
    mine: mine,
    createMiner: createMiner,
    findMiners: findMiners
};