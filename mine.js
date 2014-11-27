/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('miner'); // -> 'a thing'
 */

var _ = require('lodash'),
    mine = function (creeps) {
        _.forEach(creeps, function (creep) {

            console.log('mining', creep);
            var target,
                dest;

            if (creep.memory.path && creep.memory.path.length >= 1 ) {
                console.log(creep, 'moving');
                dest = creep.memory.path.splice(0,1)[0];
                creep.moveTo(dest);
            } else if (creep.memory.ct) {
                console.log(creep, 'mining');
                var mineResult = creep.harvest(creep.pos.findNearest(Game.SOURCES_ACTIVE));
                if (mineResult !== 0) {
                    console.log('mine failed', mineResult);
                    delete creep.memory.path;
                    delete creep.memory.ct;
                }
            } else {
                console.log(creep, 'targeting');
                target = findSourceNotBeingMined(creep);
                console.log('target', target);
                if (target) {
                    creep.memory.path = target.room.findPath(creep.pos, target.pos);
                    creep.memory.ct = creep.memory.path[creep.memory.path.length - 1];
                    dest = creep.memory.path.splice(0,1)[0];
                    creep.moveTo(dest);
                    creep.harvest(dest);
                } else {
                    console.log('no target');
                }
            }
        });
    },
    findSourceNotBeingMined = function (creep) {
       var sources = creep.room.find(Game.SOURCES_ACTIVE),
           miners = findMiners(),
           freeSources;
       console.log('active sources', sources);
       freeSources = _.compact(_.map(sources, function (source) {
               if(!isSourceBeingMined(source,miners)) {
                   return source;
               }
           }));
       console.log('free sources', JSON.stringify(freeSources));

       return freeSources[0];
    },
    isSourceBeingMined = function (source, miners) {
        return _.find(miners, function (miner) {
            return miner.memory.ct && source.pos.x === miner.memory.ct.x && source.pos.y === miner.memory.ct.y;
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