var _ = require('lodash'),
    move = require('move'),
    findMedics = function () {
        return _.filter(Game.creeps, function (creep) {
            return creep.memory.role === 'medic';
        });
    },
    createMedic = function ( spawn , lvl) {
        var body = [Game.TOUGH, Game.MOVE, Game.HEAL];
        lvl = lvl || 0;

        switch (lvl) {
            case 0:
                body = [Game.TOUGH, Game.MOVE, Game.HEAL];
                break;
            case 1:
                body = [Game.TOUGH, Game.MOVE, Game.MOVE, Game.HEAL, Game.HEAL];
                break;
        }
        spawn.createCreep( body , 'medic' + findMedics().length, {role: 'medic', lvl: lvl});
    },
    shouldRunTheFuckAway = function ( medic ) {
        return medic.hits < medic.hitsMax * .7;
    },
    targetValid = function ( target, injuredCreeps) {
        return _.filter(injuredCreeps, function (suspect) {
            return target !== undefined && target.id === suspect.id;
        }).length === 1;
    },
    findInjuredCreeps = function () {
        return _.filter(Game.creeps, function ( creep ) {
            return creep.hits < creep.hitsMax;
        })
    },
    medic = function () {
        var medics = findMedics();
        console.log('medics found', JSON.stringify(medics));
        _.each(medics, function ( medic ) {

            if ( shouldRunTheFuckAway(medic) ) {
                console.log('run away!');

                delete medic.memory.ct;
                move.moveToNext(medic, Game.MY_SPAWNS)
            } else {

                var creepsToHeal = findInjuredCreeps(),
                    target = medic.memory.ct;

                console.log('attempting to heal', JSON.stringify(target), JSON.stringify(creepsToHeal));

                if (!targetValid(target, creepsToHeal)) {
                    console.log('invalid target');
                    delete medic.memory.ct;
                }

                target = move.findAndMove(medic, creepsToHeal);
                console.log('heal move result', JSON.stringify(target));
                medic.heal(target);
            }
        });
    };

module.exports = {
    medic: medic,
    createMedic: createMedic,
    findMedics: findMedics
};
