(function(win) {
    function _iterateData(context, originalVal, parentProp, data, dataObserveObj4Watch, watch, computed) {
        var newProps = {};

        for (var key in data) {
            if (data.hasOwnProperty(key)) {
                var val = data[key];
                var isObservable = ko.isObservable(val);
                var isArray = !isObservable && Array.isArray(val);
                var isObj = !isObservable && !isArray && typeof val === 'object';
                var observable = isObservable ? val :
                    isArray ? ko.observableArray(val) :
                    ko.observable(val);
                var watchKey = parentProp === "" ? key : parentProp + '.' + key;
                if (isObj) {
                    _iterateData(context, val, watchKey, val, dataObserveObj4Watch, watch, null);
                } else if (isArray) {
                    // debugger;
                }
                if (watch[watchKey]) {
                    dataObserveObj4Watch[watchKey] = observable;
                }
                newProps[key] = {
                    configurable: true,
                    enumerable: true,
                    get: observable,
                    set: ko.isWriteableObservable(observable) ? observable : undefined
                };
            }
        }

        // go through computed
        if (computed) {
            for (var computedProp in computed) {
                if (Object.keys(data).indexOf(computedProp) > -1) {
                    throw new Error('Computed property' + computedProp + 'should not be in data properties');
                } else {
                    newProps[computedProp] = {
                        configurable: true,
                        enumerable: true,
                        get: computed[computedProp].bind(context),
                        set: undefined
                    };
                }
            }
        }

        Object.defineProperties(originalVal, newProps);
    }

    function ease(observeObj) {
        // common error check
        var allowedPropertyArr = ['context', 'data', 'watch', 'computed'];
        for (var prop in observeObj) {
            if (observeObj.hasOwnProperty(prop)) {
                if (allowedPropertyArr.indexOf(prop) === -1) {
                    throw new Error('Property' + prop + 'needs to be in' + allowedPropertyArr.join(','));
                }
            }
        }
        if (!observeObj.context || !observeObj.data) {
            throw new Error('You need to have both context and data properties');
        }
        var data = observeObj.data;
        var watch = observeObj.watch;
        var context = observeObj.context;
        var dataObserveObj4Watch = {};

        // go through data
        _iterateData(context, context, "", data, dataObserveObj4Watch, watch, observeObj.computed);



        // go through watch
        for (var watchProp in watch) {
            if (Object.keys(dataObserveObj4Watch).indexOf(watchProp) === -1) {
                throw new Error('Watch property' + watchProp + 'should be in data properties');
            } else {
                dataObserveObj4Watch[watchProp].subscribe(watch[watchProp].bind(context));
            }
        }
    }

    (function addKoFunctions() {
        var ko = require('knockout') || win.ko;
        if (!ko) {
            throw new Error('knockout is not found. ');
        }
        ko.ease = ease;
        if (typeof exports === 'object' && typeof module === 'object') {
            module.exports = ko;
        }
    })();
})(window ? window : global);