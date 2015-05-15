# TouchFaker
[![Build Status](https://travis-ci.org/Johann-S/TouchFaker.svg?style=flat)](https://travis-ci.org/Johann-S/TouchFaker) [![devDependency Status](https://david-dm.org/Johann-S/TouchFaker/dev-status.svg)](https://david-dm.org/Johann-S/TouchFaker#info=devDependencies)

An Object to fake touch events.

TouchFaker is based on a fork of [TouchEmulator][1]

[1]: https://github.com/hammerjs/touchemulator

## Usage

```js
TouchFaker.fakeEvent('touchstart','#wrapper');
TouchFaker.fakeEvent('touchmove','#wrapper');
TouchFaker.fakeEvent('touchend','#wrapper');
```
