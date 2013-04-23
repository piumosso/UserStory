(function(){
    var UserStory = {};


    UserStory.log = function(message, level, context){
        console.log(message);
    };


    /**
     * Export
     */
    if (typeof exports === 'object') {
        exports.UserStory = UserStory;
    } else if (typeof define === 'function' && define.amd) {
        define(['UserStory', function(){
            return UserStory;
        }]);
    } else {
        window['UserStory'] = UserStory;
    }
})();
