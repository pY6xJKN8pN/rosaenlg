*Forked but not updated. This is the original Pug documentation.*

# pug-linker

Link multiple pug ASTs together using include/extends

[![Build Status](https://img.shields.io/travis/pugjs/pug-linker/master.svg)](https://travis-ci.org/pugjs/pug-linker)
[![Dependency Status](https://img.shields.io/david/pugjs/pug-linker.svg)](https://david-dm.org/pugjs/pug-linker)
[![NPM version](https://img.shields.io/npm/v/pug-linker.svg)](https://www.npmjs.org/package/pug-linker)

## Installation

    npm install pug-linker

## Usage

```js
var link = require('pug-linker');
```

### `link(ast)`

Flatten the Pug AST of inclusion and inheritance.

This function merely links the AST together; it doesn't read the file system to resolve and parse included and extended files. Thus, the main AST must already have the ASTs of the included and extended files embedded in the `FileReference` nodes. `pug-load` is designed to do that.

## License

  MIT
