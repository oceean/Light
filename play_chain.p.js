var length = 10;
var points = Math.round((view.size._width/4) / length);
var neonsoc = [
    'hsl(14, 86%, 60%)',
    'hsl(32, 86%, 65%)',
    'hsl(45, 86%, 65%)',
    'hsl(137, 86%, 65%)',
    'hsl(155, 90%, 65%)',
    'hsl(184, 86%, 65%)',
    'hsl(198, 86%, 65%)',
    'hsl(263, 86%, 75%)',
    'hsl(316, 86%, 75%)',
    '#eef'
]

for (var i = 0; i < neonsoc.length; i++) {
    var r = new Path.Rectangle((view.size._width/neonsoc.length)*i, view.size._height-5, view.size._width/neonsoc.length, 5);
    r.fillColor = new Color(neonsoc[i] || 'red');
}

var paths = [];
for (var index = 0; index < 10; index++) {
    var path = new Path({
        strokeColor: 'rgba(0,0,0,0)',
        strokeWidth: 10,
        strokeCap: 'round'
    });

    var start = new Point(view.center);
    // start.x *= .5;
    for (var i = 0; i < points; i++) {
        path.add(start + new Point(i * length, 0));
    }

    var movin = new Point(10, Math.round(Math.random()*10)-10);

    paths.push([path, movin])
}


function onFrame(event) {
    for (var index = 0; index < 10; index++) {
        var path = paths[index][0];
        var movin = paths[index][1];
        path.firstSegment.point.x += movin.x;
        path.firstSegment.point.y += movin.y;
        if (path.firstSegment.point.x < 5 || path.firstSegment.point.x > view.size._width - 5) {
            movin.x *= -1;
            // movin.x = (Math.abs(movin.x) + (Math.random()-.5)) * (movin.x>0 ? 1:-1);
            movin.y = (Math.abs(movin.y) + (Math.random()-.5)) * (movin.y>0 ? 1:-1);
        }
        if (path.firstSegment.point.y < 5 || path.firstSegment.point.y > view.size._height - 5) {
            movin.y *= -1;
            movin.x = (Math.abs(movin.x) + (Math.random()-.5)) * (movin.x>0 ? 1:-1);
            // movin.y = (Math.abs(movin.y) + (Math.random()-.5)) * (movin.y>0 ? 1:-1);
        }
        for (var i = 0; i < points - 1; i++) {
            var segment = path.segments[i];
            var nextSegment = segment.next;
            var vector = segment.point - nextSegment.point;
            vector.length = length;
            nextSegment.point = segment.point - vector;
        }
        path.smooth({ type: 'continuous' });
        if (path.firstSegment.point.y > view.size._height - 10) {
            var pos = (path.firstSegment.point.x / view.size._width) * neonsoc.length;
            pos = Math.round(pos-.5);
            path.strokeColor = neonsoc[pos] || "#fff";
        }
    }
}