/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('carrier'); // -> 'a thing'
 */
var _ = require('lodash'),
    move = require('move'),
    carry = function (creeps) {
        _.each(creeps, function (creep){
            var target;
            if (creep.energy <  creep.energyCapacity) {
                target = move.moveToNext(creep, Game.DROPPED_ENERGY);
                creep.pickup(target);
            } else {
                target = move.moveToNext(creep, Game.MY_SPAWNS);
                creep.transferEnergy(target);
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