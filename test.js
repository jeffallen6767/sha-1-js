
var 
  sha1 = require("./index"),
  tester = require("testing").config({
    "fail.color": "white"
  }),
	fs = require('fs'),
  utf8 = require('utf8'),
  FORMAT_MAX_MSG_LEN = 45,
  tests = [],
  testData = [
    /*
    [
      "",
      "da39a3ee5e6b4b0d3255bfef95601890afd80709"
    ],
    */
    [
      "hello",
      "aaf4c61ddcc5e8a2dabede0f3b482cd9aea9434d"
    ],
    /*
    [
      "Jeffrey David Allen",
      "a3b4bd5d83d2fb6f04e802552c4a9c99746dca15"
    ],

    [
      "The quick brown fox jumps over the lazy dog",
      "2fd4e1c67a2d28fced849ee1bb76e7391b93eb12"
    ],

    [
      "The quick brown fox jumps over the lazy cog",
      "de9f2c7fd25e1b3afad3e85a0bd17d9b100db4b3"
    ],
    
    [
      "í",
      "b54664965911c6fe91e18cd01b68a75c8183b530"
    ],

    [
      fs.readFileSync("./data/5k.txt", 'utf8'),
      "????????????"
    ],
    
  
    [
      fs.readFileSync("./data/a_1m.dat.txt", 'utf8'),
      "????????????"
    ]
  */
  ];

function testFormat(msg, max) {
  var 
    quote = "'",
    max = max | 0,
    len = msg.length,
    result;
  if (max && len > max) {
    result = quote + msg.slice(0, max) + "..." + quote + " [+" + (len - max) + " more characters]";
  } else {
    result = quote + msg + quote;
  }
  return result;
}

testData.forEach(function(tdat) {
  
  var 
    message = tdat[0],
    expected = tdat[1].split(' ').join('').toLowerCase();

  tests["sync test sha-1() for " + testFormat(message, FORMAT_MAX_MSG_LEN)] = function(test) {
    test.startTime();
    var result = sha1(
      utf8.encode(message)
    );
    test.endTime();
    test.assert.identical(result, expected);
    test.done();
  };
});

// run tests
tester.run(tests);
