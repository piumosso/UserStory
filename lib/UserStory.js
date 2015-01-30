(function(){
    var root = this;


    function log(messageParts, sections){
        var logCallArgs;

        logCallArgs = messageParts;
        logCallArgs.unshift('');
        logCallArgs.unshift('font-weight: bolder; background: #ffee00');
        logCallArgs.unshift('%c ' + sections.join(' ') + ' %c ');

        console && console.log && console.log.apply(console, logCallArgs);
    }


    function UserStory(options){
        this.options = {
            on: [],
            off: [],
            logger: log
        };
        if (_isObject(options)) {
            this.configure(options);
        }
    }

    _extend(UserStory.prototype, {
        greeting: 'Yes, sir!',

        configure: function(options){
            _extend(this.options, options);
        },

        sectionToSubSections: function(section){
            var parts = section.split('.'),
                prefix = '';

            for (var i = 0; i < parts.length; i++) {
                prefix = parts[i] = (prefix ? prefix + '.' : '') + parts[i];
            }

            return parts;
        },

        on: function(sections){
            if (!_isEmpty(sections)) {
                if (!_isArray(sections)) {
                    sections = Array.prototype.slice.call(arguments);
                }
                this.options.on.push.apply(this.options.on, sections);
            }

            UserStoryPersistenceStorage.set(this.options);

            return this.greeting;
        },

        off: function(sections){
            if (!_isEmpty(sections)) {
                if (!_isArray(sections)) {
                    sections = Array.prototype.slice.call(arguments);
                }
                this.options.off.push.apply(this.options.off, sections);
            }

            UserStoryPersistenceStorage.set(this.options);

            return this.greeting;
        },

        reset: function(){
            this.options.on = [];
            this.options.off = [];

            UserStoryPersistenceStorage.set(this.options);

            return this.greeting;
        },

        only: function () {
            this.reset();
            this.on.apply(this, arguments);
        },

        isAllowed: function(section){
            var subsections = this.sectionToSubSections(section);

            if (this.options.on.length) {
                var subsectionAllowed = false;

                for (var i = 0; i < this.options.on.length; i++) {
                    for (var j = 0; j < subsections.length; j++) {
                        if (this.options.on[i] == subsections[j]) {
                            subsectionAllowed = true;
                        }
                    }
                }

                if (!subsectionAllowed && !_contains(this.options.on, '*')) {
                    return false;
                }
            } else {
                return false;
            }

            if (this.options.off.length) {
                var subsectionDenied = false;

                for (var i = 0; i < this.options.off.length; i++) {
                    for (var j = 0; j < subsections.length; j++) {
                        if (this.options.off[i] == subsections[j]) {
                            subsectionDenied = true;
                        }
                    }
                }

                if (subsectionDenied) {
                    return false;
                }
            }

            return true;
        },

        log: function(messageParts, sections){
            for (var i = 0; i < sections.length; i++) {
                if (this.isAllowed(sections[i])) {
                    this.options.logger(messageParts, sections);
                    return;
                }
            }
        }
    });


    var UserStoryPersistenceStorage = {
        persistenceName: 'USER_STORY',

        get: function(){
            if (root.localStorage) {
                try {
                    return JSON.parse(root.localStorage.getItem(this.persistenceName));
                } catch (e) {
                    return {};
                }
            } else {
                return {};
            }
        },

        set: function(options){
            if (root.localStorage) {
                try {
                    root.localStorage.setItem(this.persistenceName, JSON.stringify(options));
                } catch (e) {}
            }
        }
    };


    var UserStoryInstance = new UserStory;
    UserStoryInstance.configure(UserStoryPersistenceStorage.get());


    if (typeof exports !== 'undefined') {
        exports.UserStory = UserStory;
        exports.UserStoryInstance = UserStoryInstance;
    } else {
        root.UserStory = UserStoryInstance;
    }


    // Methods from underscore.js
    hasOwnProperty = root.hasOwnProperty || Object.prototype.hasOwnProperty;
    toString = root.toString || Object.prototype.toString;
    function _isObject(obj) {
        var type = typeof obj;
        return type === 'function' || type === 'object' && !!obj;
    }
    function _isArray(obj) {
        return toString.call(obj) === '[object Array]';
    }
    function _isString(obj) {
        return toString.call(obj) === '[object String]';
    }
    function _isArguments(obj) {
        return toString.call(obj) === '[object Arguments]';
    }
    function _isEmpty(obj) {
        if (obj == null) return true;
        if (_isArray(obj) || _isString(obj) || _isArguments(obj)) return obj.length === 0;
        for (var key in obj) if (_has(obj, key)) return false;
        return true;
    }
    function _extend(obj) {
        if (!_isObject(obj)) return obj;
        var source, prop;
        for (var i = 1, length = arguments.length; i < length; i++) {
            source = arguments[i];
            for (prop in source) {
                if (hasOwnProperty.call(source, prop)) {
                    obj[prop] = source[prop];
                }
            }
        }
        return obj;
    }
    function _indexOf(array, item) {
        if (array == null) return -1;
        var i = 0, length = array.length;
        for (; i < length; i++) if (array[i] === item) return i;
        return -1;
    }
    function _has(obj, key) {
        return obj != null && hasOwnProperty.call(obj, key);
    }
    function _keys(obj) {
        if (!_isObject(obj)) return [];
        var keys = [];
        for (var key in obj) if (_has(obj, key)) keys.push(key);
        return keys;
    }
    function _values(obj) {
        var keys = _keys(obj);
        var length = keys.length;
        var values = Array(length);
        for (var i = 0; i < length; i++) {
            values[i] = obj[keys[i]];
        }
        return values;
    }
    function _contains(obj, target) {
        if (obj == null) return false;
        if (obj.length !== +obj.length) obj = _values(obj);
        return _indexOf(obj, target) >= 0;
    }
}).call(this);
