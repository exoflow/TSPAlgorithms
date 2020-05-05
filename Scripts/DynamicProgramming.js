function SolveDynamicProgramming() {
    var memo = {};
    //Base case 
    for (var i = 1; i < edgeArray[0].length; i++) {
        memo[i] = edgeArray[i][0]; //distance from vertex 0 to other verticies
    }
    //Generating path to solve 0 ... n 
    var toSolve = []
    for (var i = 0; i < edgeArray[0].length; i++) {
        toSolve.push(i);
    }
    var totalDistance = GetMinimum(toSolve, memo)
    var runtime = performance.now() - startTime
    DrawPath();
    ShowResult('DP', totalDistance, runtime)
}

function GetMinimum(key, memo) {
    //Key already stored
    if (key in memo) {
        return memo[key];
    }
    var solutions = [];
    var allKeys = [];

    for (var i = 1; i < key.length; i++) {
        executionTime = performance.now() - startTime
        if (executionTime > 5000) {
            timeout = true;
            break;
        }
        var newKey = JSON.parse(JSON.stringify(key)); //Copy key
        newKey.shift(); //Remove first item
        newKey.splice(newKey.indexOf(key[i]), 1); //Remove current item
        allKeys.push([key[i], newKey].flat());
        var result = GetMinimum([key[i], newKey].flat(), memo); //Recursive call
        solutions.push(result + edgeArray[key[0]][key[i]]) //Recursive result + edge weight
    }
    //Store key
    memo[key] = Math.min.apply(null, solutions);
    //Add path
    path.push([key, allKeys[solutions.indexOf(memo[key])]])
    return memo[key];
}

function DrawPath() {
    if (!timeout) {
        var output = [0] //Start at 0
        var solution = path.pop();
        output.push(solution[1][0]);

        //Loop through all solutions
        for (var i = 0; i < edgeArray[0].length - 1; i++) {
            for (var j = 0; j < path.length; j++) {
                if (solution[1].toString() == path[j][0].toString()) {
                    solution = path[j]
                    output.push(solution[1][0]);
                    break;
                }
            }
        }
        output.push(0); //End at 0

        //Draw on map

        for (var i = 0; i < output.length - 1; i++) {
            AddConnection(Object.keys(activeCities)[output[i]], Object.keys(activeCities)[output[i + 1]]);
        }
    }
}








