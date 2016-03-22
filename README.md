# TouchFaker

[![Join the chat at https://gitter.im/Johann-S/TouchFaker](https://badges.gitter.im/Join%20Chat.svg)](https://gitter.im/Johann-S/TouchFaker?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)
[![GitHub Release](https://img.shields.io/github/release/Johann-S/TouchFaker.svg)](https://github.com/Johann-S/TouchFaker/releases)
[![Build Status](https://travis-ci.org/Johann-S/TouchFaker.svg?style=flat)](https://travis-ci.org/Johann-S/TouchFaker) 
[![devDependency Status](https://david-dm.org/Johann-S/TouchFaker/dev-status.svg)](https://david-dm.org/Johann-S/TouchFaker#info=devDependencies)

An Object to fake touch events.

TouchFaker is based on a fork of [TouchEmulator][1]

## Usage

```js
TouchFaker.fakeEvent('touchstart', '#wrapper');
TouchFaker.fakeEvent('touchmove', '#wrapper');
TouchFaker.fakeEvent('touchend', '#wrapper');

// The selector can be a DOM element
var target = document.getElementById('wrapper');
TouchFaker.fakeEvent('touchend', target);

// Send custom parameters
var params = {
    pageX: 50,
    pageY: 10
};
TouchFaker.fakeEvent('touchstart', target, params);
```

## Used by

- [Ratchet][2]

[1]: https://github.com/hammerjs/touchemulator
[2]: https://github.com/twbs/ratchet
