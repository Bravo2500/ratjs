/*!
 * Rat JavaScript Library v0.0.1
 *
 * Copyright 2012, Jecki Go
 * Dual licensed under the MIT or GPL Version 2 licenses.
 * You are free to use the library in commercial use as long as
 * the copyright header is left intact
 *
 */
/*
 *
 * Sample usage:
 *
 * 	new Rat.Chainer({
 *      delay: 500,
 *      before: function() { console.log('before'); },
 *      after: function() { console.log('after'); },
 *      beforeEach: function() { console.log('beforeEach', this, arguments); },
 *      afterEach: function() { console.log('afterEach', this, arguments); }
 *	}).chain(function() {
 *      console.log('a');
 *	}).chain(function() {
 *      console.log('b');
 *  }).invoke();
 *
 * 
 */
 (function(window, undefined) {
	var Rat = window.Rat = {};
	
	Rat.Chainer = function(opts) {
		this.opts = {
			delay: 20,
			before: null,
			after: null,
			beforeEach: null,
			afterEach: null
		};
		
		if (opts && typeof opts == 'object') {
			for (var name in opts) {
				var val = opts[name];
				if (val != undefined) {
					this.opts[name] = val;
				}
			}
		}
		
		this.funcs = [];

		this.chain = function(fn) {
			if (!fn || !(typeof fn == 'function')) return;

			this.funcs.push(fn);
			return this;
		};

		this.invoke = function() {
			var i = 0;
			var funcs = this.funcs;
			var len = funcs.length;
			var opts = this.opts;
			var delay = opts.delay;

			var wrapper = function() {			
				if (i < len) {
					opts.beforeEach && opts.beforeEach(i);
					funcs[i]();
					opts.afterEach && opts.afterEach(i);
				}

				if (i < len - 1) {
					i++;
					setTimeout(wrapper, delay);
				} else if (opts.after) {
					setTimeout(opts.after, delay);
				}
			};

			if (opts.before) {
				opts.before();
				setTimeout(wrapper, delay);
			} else {
				wrapper();
			}

			return this;
		};
	};
})(window);


