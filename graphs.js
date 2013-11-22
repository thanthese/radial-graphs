// To generate diagrams, paste this code into http://sketch.paperjs.org/
//

////////////////////////////////////////////////////////////
// settings

var SIZE = {
    firstGraphPosition: {x: 80, y: 100},
    spaceBetweenGraphs: {x: 150, y: 170},

    headerOffset: {x: 55, y: 75},
    headerFontSize: 15,

    letterFontSize: 15,
    radius: 50,
    spokeScaleFactor: 0.75,
    spokeOffset: {x: 0, y: -7},
    spokeWidth: 3,

    symbols: "C+D+EF+G+A+B",
    scales: ["C", "C#/Db", "D",
             "D#/Eb", "E", "F",
             "F#/Gb", "G", "G#/Ab",
             "A", "A#/Bb", "B"],
};

////////////////////////////////////////////////////////////
// utils

// doesn't mutate original
Array.prototype.rotate = function(n) {
    // http://stackoverflow.com/questions/1985260/javascript-array-rotate
    return this.slice(n, this.length).concat(this.slice(0, n));
}

// location of graph in grid
function Position() {
    this.x = SIZE.firstGraphPosition.x;
    this.y = SIZE.firstGraphPosition.y;
}

// next to the right, an iterator
Position.prototype.next = function() {
    var originalX = this.x;
    this.x = this.x + SIZE.spaceBetweenGraphs.x;
    return {x: originalX, y: this.y};
};

// "carriage return"
Position.prototype.break = function() {
    this.x = SIZE.firstGraphPosition.x;
    this.y = this.y + SIZE.spaceBetweenGraphs.y;
};

////////////////////////////////////////////////////////////
// draw graphs

function drawGraph(filter, header, center) {
    _addHeader(header, center);
    for(var i = 0; i < 12; ++i) {
        var angle = i * Math.PI * 2 / 12 - Math.PI / 2;
        if(filter[i] === 1) {
            _addLine(center, angle);
        }
        _addLetter(SIZE.symbols[i], center, angle);
    }
}

function _addHeader(header, center) {
    var text = new PointText(center.x - SIZE.headerOffset.x,
                             center.y - SIZE.headerOffset.y);
    text.content = header;
    text.style = {
        fontSize: SIZE.headerFontSize,
        fillColor: 'black',
        justification: 'left'
    };
}

function _addLine(center, angle) {
    var line = new Path();
    line.strokeColor = 'black';
    line.strokeWidth = SIZE.spokeWidth;
    line.add(new Point(center.x + SIZE.spokeOffset.x,
                       center.y + SIZE.spokeOffset.y));
    line.add(new Point(
        Math.cos(angle) * SIZE.radius * SIZE.spokeScaleFactor
            + center.x + SIZE.spokeOffset.x,
        Math.sin(angle) * SIZE.radius * SIZE.spokeScaleFactor
            + center.y + SIZE.spokeOffset.y));
}

function _addLetter(letter, center, angle) {
    var text = new PointText(
        Math.cos(angle) * SIZE.radius + center.x,
        Math.sin(angle) * SIZE.radius + center.y);
    text.content = letter;
    text.style = {
        fontSize: SIZE.letterFontSize,
        fillColor: 'black',
        justification: 'center'
    };
}

function drawN(n, type, description) {
  for(var i = 0; i < n; ++i) {
    if(i > 0 && i % 4 === 0) {
      p.break();
    }
    drawGraph(scale[type].rotate(-i),
        SIZE.scales.rotate(i)[0] + " " + description,
        p.next());
  }
}

////////////////////////////////////////////////////////////
// main

var scale = {
    //  :  C   D   E F   G   A   B
    n1  : [1,1,1,1,1,1,1,1,1,1,1,1],
    n2  : [1,0,1,0,1,0,1,0,1,0,1,0],
    n3  : [1,0,0,1,0,0,1,0,0,1,0,0],
    n4  : [1,0,0,0,1,0,0,0,1,0,0,0],
    n6  : [1,0,0,0,0,0,1,0,0,0,0,0],
    n12 : [1,0,0,0,0,0,0,0,0,0,0,0],

    // scales  :  C   D   E F   G   A   B
    majorScale : [1,0,1,0,1,1,0,1,0,1,0,1],
    minorScale : [1,0,1,1,0,1,0,1,0,1,0,1],
    dimScale   : [1,1,0,1,1,0,1,1,0,1,1,0],
    bebopScale : [1,0,1,0,1,1,0,1,1,1,0,1],

    // triads  :  C   D   E F   G   A   B
    majorTriad : [1,0,0,0,1,0,0,1,0,0,0,0],
    minorTriad : [1,0,0,1,0,0,0,1,0,0,0,0],

    // 7ths    :  C   D   E F   G   A   B
    major7th   : [1,0,0,0,1,0,0,1,0,0,0,1],
    minor7th   : [1,0,0,1,0,0,0,1,0,0,1,0],
    dim7       : [1,0,0,1,0,0,1,0,0,1,0,0],
    dominant   : [1,0,0,0,1,0,0,1,0,0,1,0],
    dominant9b : [1,1,0,0,1,0,0,1,0,0,1,0],
    alt        : [1,1,0,1,1,0,1,0,1,0,1,0],
}

var p = new Position();

// command + shift + 4 to take screenshot

// // factors of 12
// drawGraph(scale.n1, "chromatic scale (1)", p.next());
// drawGraph(scale.n2, "wholetone scale (2)", p.next());
// drawGraph(scale.n3, "dim7 chord (3)", p.next());
// p.break();
// drawGraph(scale.n4, "aug chord (4)", p.next());
// drawGraph(scale.n6, "tritone interaval (6)", p.next());
// drawGraph(scale.n12, "single note (12)", p.next());
// p.break();

// scales
// drawN(12, "majorScale", "major scale");
// drawN(12, "minorScale", "minor scale");
// drawN(12, "bebopScale", "bebop scale");
// drawN(12, "alt", "alt");
// drawN(3, "dimScale", "dim scale");

// triads
// drawN(12, "majorTriad", "major triad");
// drawN(12, "minorTriad", "minor triad");

// 7ths
// drawN(12, "major7th", "major 7th");
// drawN(12, "minor7th", "minor 7th");
// drawN(12, "dominant", "dominant 7th");
// drawN(12, "dominant9b", "7th, b9");
// drawN(3, "dim7", "dim7");

// ii-V7-I progression
// drawGraph(scale.minor7th.rotate(-2), "D-7", p.next());
// drawGraph(scale.dominant.rotate(-7), "G7", p.next());
// drawGraph(scale.major7th.rotate(0), "Cmaj7", p.next());
