function SolveNearestNeighbor() {
    var totalDistance = 0;
    var nVertices = edgeArray[0].length;
    var isVisited = new Array(nVertices).fill(0)
    var startVertex = Math.floor(Math.random() * nVertices); //Random start vertex
    var currentVertex = startVertex;
    
    //Loop through all verticies
    for (var i = 0; i < nVertices; i++) {
        AddMarker(Object.keys(activeCities)[currentVertex], "red");
        isVisited[currentVertex] = 1;
        path.push(currentVertex);
        var lastVertex = currentVertex;
        var shortestDistance = Number.POSITIVE_INFINITY;
        
        //Loop through outgoing edges of current vertex
        for (var j = 0; j < nVertices; j++) {
            var distance = edgeArray[lastVertex][j];
            if (isVisited[j] == 0 && distance < shortestDistance) {
                currentVertex = j; //Current best next vertex
                shortestDistance = distance; //Current best distance
            }
        }
        //Move along shortest edge
        AddConnection(Object.keys(activeCities)[lastVertex], Object.keys(activeCities)[currentVertex]);
        totalDistance += edgeArray[lastVertex][currentVertex];
    }
    //Back to start
    AddConnection(Object.keys(activeCities)[currentVertex], Object.keys(activeCities)[startVertex]);
    totalDistance += edgeArray[currentVertex][startVertex];
    var runtime = performance.now() - startTime
    ShowResult('NN', totalDistance, runtime)
}




