var w = project.view.size.width;
var h = project.view.size.height;
var a = w / 40;
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
];

function froze(path) {
    var frozen = [];
    for (var s = 0; s < path.segments.length; s++) {
        var e = path.segments[s];
        var d = [e.point.x, e.point.y];
        frozen.push(d);
    }
    return JSON.stringify({
        "c": path.strokeColor.toCSS(),
        "p": frozen
    }) 
}
function fry(frozen) {
    template = JSON.parse(frozen)
    var defrozenpath = new Path({
        strokeColor: template["c"],
        strokeWidth: a,
        strokeCap: 'round',
        strokeJoin: 'round',
        shadowColor: template["c"],
        shadowBlur: a*1.5,
        shadowOffset: new Point(0, 0)
    });
    for (var s = 0; s < template['p'].length; s++) {
        p = new Point(template['p'][s]);
        p = p / a;
        p = p.round();
        p = p * a;
        defrozenpath.add(p);
    }
    return defrozenpath
}

for (var i = 0; i < w/a; i++) {
    var linepath = new Path.Line([i*a,0], [i*a,h]);
    linepath.strokeColor = '#222';
}
for (var j = 0; j < h/a; j++) {
    var linepath = new Path.Line([0,j*a], [w,j*a]);
    linepath.strokeColor = '#222';
}

fry('{"c":"rgb(89,232,243)","p":[[21,21],[62,21],[41,41],[41,82]]}');
fry('{"c":"rgb(89,232,243)","p":[[103,82],[103,21],[123,21],[144,41],[144,82],[123,62]]}');
fry('{"c":"rgb(89,232,243)","p":[[185,82],[185,21],[226,21],[226,62],[185,62]]}');

var cursor = new Path.Circle({
    center: [0, 0],
    radius: 5,
    fillColor: 'white'
});

var color = new Color(neonsoc[Math.floor(Math.random() * neonsoc.length)]);
var path = new Path({
    strokeColor: color,
    strokeWidth: a,
    strokeCap: 'round',
    strokeJoin: 'round',
    shadowColor: color,
    shadowBlur: a*1.5,
    shadowOffset: new Point(0, 0)
});
var path_start;

tool.onMouseUp = function(event) {
    p = new Point(event.point);
    p = p / a;
    p = p.round();
    p = p * a;
    p = p.round();
    path.add(p);
    path_start = new Path.Circle({
        center: p,
        radius: a/2,
        fillColor: color
    })
}

tool.onMouseMove = function(event) {
    p = new Point(event.point);
    p = p / a;
    p = p.round();
    p = p * a;
    p = p.round();
    cursor.position = p;
    cursor.fillColor = color;
}

tool.onKeyDown = function(event) {
    if (event.key == 'space') {
        console.log(froze(path));
        color = new Color(neonsoc[Math.floor(Math.random() * neonsoc.length)]);
        path = new Path({
            strokeColor: color,
            strokeWidth: a,
            strokeCap: 'round',
            strokeJoin: 'round',
            shadowColor: color,
            shadowBlur: a*1.5,
            shadowOffset: new Point(0, 0)
        });
        return false;
    }
}
