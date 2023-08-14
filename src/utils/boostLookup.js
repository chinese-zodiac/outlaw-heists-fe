export default async function boostLookup(outlawPersonalityIds) {
    if ([0, 1, 2, 3, 4].every(id => outlawPersonalityIds.includes(id))) {
        return {
            boostType: "STRAIGHT",
            boostBp: 40000
        }
    }

    if (outlawPersonalityIds.length == 0) {
        return {
            boostType: "NONE",
            boostBp: 0
        }
    }

    let sortedIds = outlawPersonalityIds.slice().sort();
    let highestFreq = [undefined, 0]
    let i = 0;
    sortedIds.reduce((prev, curr) => {
        prev == curr ? ++i > highestFreq[1] && (highestFreq = [curr, i]) : i = 1;
        return curr;
    });

    if (highestFreq[1] == 1) {
        return {
            boostType: "SINGLE",
            boostBp: 2500
        }
    }

    if (highestFreq[1] == 2) {
        return {
            boostType: "DOUBLE",
            boostBp: 5000
        }
    }

    if (highestFreq[1] == 3) {
        return {
            boostType: "3 OF A KIND",
            boostBp: 10000
        }
    }

    if (highestFreq[1] == 4) {
        return {
            boostType: "4 OF A KIND",
            boostBp: 20000
        }
    }

    if (highestFreq[1] == 5) {
        return {
            boostType: "5 OF A KIND",
            boostBp: 30000
        }
    }

}