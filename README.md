# sha-1-js

A sha-1 hashing implementation in vanilla JavaScript.

Based on pseudocode found here:

https://en.wikipedia.org/wiki/SHA-1#Examples_and_pseudocode

## Install and use in your project:

```sh
npm install --save sha-1-js
```

## Usage

```js
var sha1 = require('sha-1-js');

console.log(
  sha1("abc")
);

// a9993e364706816aba3e25717850c26c9cd0d89d
```

## Text passed to sha1 should be UTF8 encoded:

```js
var sha1 = require('sha-1-js'),
  utf8 = require('utf8');

console.log(
  sha1(
    utf8.encode("í")
  )
);

// 265a0ae38fd8bef7d06ad56d84965afa92b59ee3
```

## Install globally and use on the command line:

```sh
git clone https://github.com/jeffallen6767/sha-1-js.git
cd sha-1-js
npm install -g
```

Examples:

```sh
  Usage: sha1  [options]


  Options:

    -V, --version             output the version number
    -m, --message [text]      text to apply sha-1
    -f, --file [path]         file to apply sha-1
    -c, --compare [checksum]  Checksum to compare generated with
    -h, --help                output usage information

C:\Users\jeffa\Downloads>dir

    Directory: C:\Users\jeffa\Downloads


Mode                LastWriteTime         Length Name
----                -------------         ------ ----
-a----        2/18/2018   5:55 PM        4521784 npp.7.5.4.Installer.x64.exe

C:\Users\jeffa\Downloads>sha1 -f .\npp.7.5.4.Installer.x64.exe
f6f63a8c489410f465ddbbd2d90f6ba97f590b48

C:\Users\jeffa\Downloads>sha1 -m abc
a9993e364706816aba3e25717850c26c9cd0d89d

C:\Users\jeffa\Downloads>sha1 -m "a b c"
6b3f339c67bb03d57a7195cf43ed86b12bfdd347

```
---

### Copyright (c) 2017 Jeffrey David Allen

#### Licensed under MIT License

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
