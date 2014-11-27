var _ = require('lodash'),
    moveToNext = function (creep, target) {
        return findAndMove(creep, creep.room.find(target));
    },
    findAndMove = function (creep, targets) {
        console.log('findAndMove',  JSON.stringify(creep),  JSON.stringify(targets));
        var target;

        if (creep.memory.ct) {
            return moveOrFindNewTarget(creep, creep.memory.ct, targets);
        } else {
            if(targets.length > 0) {
                target = targets.splice(0,1)[0];
                console.log('findAndMove - target:', JSON.stringify(target));
                return moveOrFindNewTarget(creep, target, targets);
            } else {
                console.log('no path to any targets');
            }
        }

    },
    moveOrFindNewTarget = function (creep, target, targets) {
        var moveResult = creep.moveTo(target);
        switch (moveResult) {
            case -2:
                console.log('findAndMove - no path to target:');
                return findAndMove(creep, targets);
            case 0:
                return target;
            default:
                console.log('move failed', moveResult);
                return moveResult;
        }
    };

module.exports = {
    moveToNext: moveToNext,
    findAndMove: findAndMove
};
