# TouchFaker
An Object to fake touch events.

TouchFaker is based on a fork of [TouchEmulator][1]

[1]: https://github.com/hammerjs/touchemulator

## Usage

```js
TouchFaker.fakeEvent('touchstart','#wrapper');
TouchFaker.fakeEvent('touchmove','#wrapper');
TouchFaker.fakeEvent('touchend','#wrapper');
```
