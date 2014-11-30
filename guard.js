/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('carrier'); // -> 'a thing'
 */
var _ = require('lodash'),
    exits = [Game.EXIT_TOP, Game.EXIT_LEFT, Game.EXIT_RIGHT, Game.EXIT_BOTTOM],
    move = require('move'),
    guard = function (creeps) {
        var target;
        _.each(creeps, function (creep) {
            target = move.moveToNext(creep, Game.HOSTILE_CREEPS);

            if (target) {
                creep.attack(target);
                return;
            }
            move.moveToNext(creep, exits[_.random(0, 3)]);
        });
    },
    createGuard = function (spawn, name, lvl) {
        var body = [Game.TOUGH],
            lvl = lvl || 0;

        switch (lvl) {
            case 0:
                body.push(Game.MOVE, Game.ATTACK);
                break;
            case 1:
                body.push(Game.TOUGH, Game.MOVE, Game.ATTACK);
                break;
            case 2:
                body.push(Game.TOUGH, Game.ATTACK, Game.ATTACK, Game.MOVE);
                break;
        }

        return spawn.createCreep(body, name, {role: 'guard'});
    },
    findGuards = function () {
        return _.filter(Game.creeps, function (creep) {
            return creep.memory.role === 'guard';
        });
    };

module.exports = {
    guard: guard,
    createGuard: createGuard,
    findGuards: findGuards
};