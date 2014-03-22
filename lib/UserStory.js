(function(){
    var root = this;

    var _ = root._ || (typeof require !== 'undefined' && require('underscore'));


    if (!_) {
        throw new Error('Underscore is not defined');
    }


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
        if (_.isObject(options)) {
            this.configure(options);
        }
    }

    _.extend(UserStory.prototype, {
        greeting: 'Yes, sir!',

        configure: function(options){
            _.extend(this.options, options);
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
            if (!_.isEmpty(sections)) {
                if (!_.isArray(sections)) {
                    sections = Array.prototype.slice.call(arguments);
                }
                this.options.on.push.apply(this.options.on, sections);
            }

            UserStoryPersistenceStorage.set(this.options);

            return this.greeting;
        },

        off: function(sections){
            if (!_.isEmpty(sections)) {
                if (!_.isArray(sections)) {
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

                if (!subsectionAllowed && !_.contains(this.options.on, '*')) {
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
}).call(this);
