var points = 25;
var length = 35;
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

var path = new Path({
	strokeColor: '#fff',
	strokeWidth: 5,
	strokeCap: 'round'
});

var start = view.center / [10, 1];
for (var i = 0; i < points; i++)
	path.add(start + new Point(i * length, 0));

function onMouseMove(event) {
    path.firstSegment.point = event.point;
	for (var i = 0; i < points - 1; i++) {
		var segment = path.segments[i];
		var nextSegment = segment.next;
		var vector = segment.point - nextSegment.point;
		vector.length = length;
		nextSegment.point = segment.point - vector;
	}
    path.smooth({ type: 'continuous' });
}

function onFrame(event) {
    var pos = (path.firstSegment.point.x / view.size._width) * neonsoc.length;
    pos = Math.round(pos-.5);
    path.strokeColor = neonsoc[pos] || "#fff"
}