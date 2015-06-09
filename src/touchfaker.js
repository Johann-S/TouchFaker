/*!
 * TouchFaker - v1.1.0 - 2015-05-21
 * https://github.com/Johann-S/TouchFaker
 * Copyright (c) 2015 Johann SERVOIRE; Licensed MIT
 */

!(function () {
  'use strict';

  // Polyfills
  if (!document.createTouch) {
    document.createTouch = function (view, target, identifier, pageX, pageY, screenX, screenY, clientX, clientY) {
      // auto set
      if (clientX === undefined || clientY === undefined) {
        clientX = pageX - window.pageXOffset;
        clientY = pageY - window.pageYOffset;
      }

      return new Touch(target, identifier, {
        pageX: pageX,
        pageY: pageY,
        screenX: screenX,
        screenY: screenY,
        clientX: clientX,
        clientY: clientY
      });
    };
  }

  if (!document.createTouchList) {
    document.createTouchList = function () {
      var touchList = new TouchList();
      for (var i = 0; i < arguments.length; i++) {
        touchList[i] = arguments[i];
      }
      touchList.length = arguments.length;
      return touchList;
    };
  }

  /**
   * create an touch point
   * @constructor
   * @param target
   * @param identifier
   * @param pos
   * @param deltaX
   * @param deltaY
   * @returns {Object} touchPoint
   */
  function Touch(target, identifier, pos, deltaX, deltaY) {
    deltaX = deltaX || 0;
    deltaY = deltaY || 0;

    this.identifier = identifier;
    this.target = target;
    this.clientX = (pos.clientX + deltaX) || 0;
    this.clientY = (pos.clientY + deltaY) || 0;
    this.screenX = (pos.screenX + deltaX) || 0;
    this.screenY = (pos.screenY + deltaY) || 0;
    this.pageX = (pos.pageX + deltaX) || 0;
    this.pageY = (pos.pageY + deltaY) || 0;
  }

  /**
   * create empty touchlist with the methods
   * @constructor
   * @returns touchList
   */
  function TouchList() {
    var touchList = [];
    touchList.item = function (index) {
      return this[index] || null;
    };

    // specified by Mozilla
    touchList.identifiedTouch = function (id) {
      return this[id + 1] || null;
    };
    return touchList;
  }

  /**
   * Simple trick to fake touch event support
   * this is enough for most libraries like Modernizr and Hammer
   */
  function fakeTouchSupport() {
    var objs = [window, document.documentElement];
    var props = ['ontouchstart', 'ontouchmove', 'ontouchcancel', 'ontouchend'];

    for (var o = 0; o < objs.length; o++) {
      for (var p = 0; p < props.length; p++) {
        if (objs[o] && objs[o][props[p]] === undefined) {
          objs[o][props[p]] = null;
        }
      }
    }
  }

  /**
   * we don't have to emulate on a touch device
   * @returns {boolean}
   */
  function hasTouchSupport() {
    return ('ontouchstart' in window) || // touch events
    (window.Modernizr && window.Modernizr.touch) || // modernizr
    (navigator.msMaxTouchPoints || navigator.maxTouchPoints) > 2; // pointer events
  }

  /**
   * trigger a touch event
   * @param eventName
   * @param eventTarget
   * @param params
   */
  function triggerTouch(eventName, eventTarget, params) {
    var touchEvent = document.createEvent('Event');
    touchEvent.initEvent(eventName, true, true);
    var mouseEv = (typeof params !== 'undefined') ? mergeParams(params) : getTargetCoordinate(eventTarget);
    touchEvent.touches = getActiveTouches(mouseEv, eventName, eventTarget);
    touchEvent.targetTouches = getActiveTouches(mouseEv, eventName, eventTarget);
    touchEvent.changedTouches = getChangedTouches(mouseEv, eventName, eventTarget);
    eventTarget.dispatchEvent(touchEvent);
  }

  /**
   * Get coordinate of the target
   * @returns Object
   */
  function getTargetCoordinate(target) {
    var targetPos = target.getBoundingClientRect();
    return {
      pageX: targetPos.left,
      pageY: targetPos.top
    };
  }

  /**
   * Merge custom parameters
   * @returns Object
   */
  function mergeParams(params) {
    var coordinate = {};
    coordinate.clientX = params.hasOwnProperty('clientX') ? params.clientX : 0;
    coordinate.clientY = params.hasOwnProperty('clientY') ? params.clientY : 0;
    coordinate.pageX = params.hasOwnProperty('pageX') ? params.pageX : 0;
    coordinate.pageY = params.hasOwnProperty('pageY') ? params.pageY : 0;
    coordinate.screenX = params.hasOwnProperty('screenX') ? params.screenX : 0;
    coordinate.screenY = params.hasOwnProperty('screenY') ? params.screenY : 0;
    return coordinate;
  }

  /**
   * create a touchList based on the mouse event
   * @param mouseEv
   * @param eventTarget
   * @returns {TouchList}
   */
  function createTouchList(mouseEv, eventTarget) {
    var touchList = new TouchList();
    touchList.push(new Touch(eventTarget, 1, mouseEv, 0, 0));
    return touchList;
  }

  /**
   * receive all active touches
   * @param mouseEv
   * @param eventName
   * @param eventTarget
   * @returns {TouchList}
   */
  function getActiveTouches(mouseEv, eventName, eventTarget) {
    var touchList = new TouchList();
    if (eventName !== 'touchend') {
      touchList = createTouchList(mouseEv, eventTarget);
    }
    return touchList;
  }

  /**
   * receive a filtered set of touches with only the changed pointers
   * @param mouseEv
   * @param eventName
   * @returns {TouchList}
   */
  function getChangedTouches(mouseEv, eventName, eventTarget) {
    var touchList = createTouchList(mouseEv, eventTarget);

    // we only want to return the added/removed item on multitouch
    // which is the second pointer, so remove the first pointer from the touchList
    //
    // but when the mouseEv.type is mouseup, we want to send all touches because then
    // no new input will be possible
    if (eventName === 'touchstart' || eventName === 'touchend') {
      touchList.splice(0, 1);
    }
    return touchList;
  }

  // Create TouchFaker object
  if (typeof window.TouchFaker === 'undefined') {
    window.TouchFaker = {};
  }

  // start distance when entering the multitouch mode
  window.TouchFaker.multiTouchOffset = 75;
  window.TouchFaker.init = (function () {
    if (!hasTouchSupport()) {
      fakeTouchSupport();
    }
  })();

  /**
   * Send a fake event on the selector
   * @param eventName
   * @param selector
   * @param params
   */
  window.TouchFaker.fakeEvent = function (eventName, selector, params) {
    var target = selector;
    if (typeof selector === 'string') {
      target = document.querySelector(selector);
    }

    if (!target) {
      throw new Error('Target cannot be found');
    }

    // Not a touch event
    if (eventName.indexOf('touch') === -1) {
      throw new Error('Not a touch event');
    }

    if (typeof params !== 'undefined' && typeof params !== 'object') {
      throw new Error('Params has to be an Object');
    }
    triggerTouch(eventName, target, params);
  };
}());
