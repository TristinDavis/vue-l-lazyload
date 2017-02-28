/* global getComputedStyle window */
const win = window,
	round = Math.round;

function type(o) {
	return typeof o;
}

function isArr(o) {
	return o instanceof Array;
}

function isStr(o) {
	return type(o) == 'string';
}

function each(elements, callback) {
	for (let i = 0, len = elements.length, element; i < len; i++) {
		element = elements[i];
		callback.call(element, element, i);
	}
}

function on(element, ev, callback) {
	if (isStr(ev)) {
		element.addEventListener(ev, callback);
	}
	else if (isArr(ev)) {
		each(ev, e => on(element, e, callback));
	}
}

function off(element, ev, callback) {
	if (isStr(ev)) {
		element.removeEventListener(ev, callback);
	}
	else if (isArr(ev)) {
		each(ev, e => off(element, e, callback));
	}
}

function one(element, ev, callback) {
	function handler(...args) {
		callback.apply(this, args);
		off(element, ev, handler);
	}

	on(element, ev, handler);
}

function attr(element, name) {
	return element.getAttribute(name);
}

function addClass(element, className) {
	element.classList.add(className);
}

function removeClass(element, className) {
	element.classList.remove(className);
}

function offset(element) {
	const obj = element.getBoundingClientRect();
	return {
		left: obj.left + win.pageXOffset,
		top: obj.top + win.pageYOffset,
		width: round(obj.width),
		height: round(obj.height),
	};
}

function width(element) {
	return offset(element).width;
}

export const $ = {
	on,
	off,
	one,
	type,
	isArr,
	isStr,
	addClass,
	removeClass,
	attr,
	each,
	offset,
	width,
};
