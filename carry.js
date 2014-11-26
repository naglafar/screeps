/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('carrier'); // -> 'a thing'
 */
var _ = require('lodash'),
    carry = function (creeps) {
        _.each(creeps, function (creep){
            if (creep.energy <  creep.energyCapacity) {
                var targets = creep.room.find(Game.DROPPED_ENERGY);
                if(targets.length) {
                    creep.moveTo(targets[0]);
                    creep.pickup(targets[0]);
                }
            } else {
                creep.moveTo(Game.spawns.Spawn1);
                creep.transferEnergy(Game.spawns.Spawn1);
            }
        });
    },
    createCarry = function (spawn, name) {
        spawn.createCreep([Game.CARRY, Game.CARRY, Game.CARRY, Game.MOVE, Game.MOVE], name, {role: 'carry'});
    },
    findCarrys = function () {
        return _.filter(Game.creeps, function (creep) {
            return creep.memory.role === 'carry';
        });
    };

module.exports = {
    carry: carry,
    createCarry: createCarry,
    findCarrys: findCarrys
};