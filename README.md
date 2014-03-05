[![Build Status](https://secure.travis-ci.org/piumosso/UserStory.png)](http://travis-ci.org/piumosso/UserStory)
[![Coverage Status](https://coveralls.io/repos/piumosso/UserStory/badge.png)](https://coveralls.io/r/piumosso/UserStory)

[![NPM](https://nodei.co/npm/user-story.png)](https://nodei.co/npm/user-story/)


# UserStory v0.0.3 — client-side logger

![](example/example.png?raw=true)


## Installation


### NPM

```bash
npm install user-story
```


### Parse scripts

```bash
cat input.js | ./node_modules/user-story/bin/us > output.js
```


### Include client-side part

```xml
<script type="text/javascript" src="underscore.js"></script>
<script type="text/javascript" src="UserStory.js"></script>
<script type="text/javascript" src="output.js"></script>
```


## Usage


Configure UserStory after script loading:

```xml
<script type="text/javascript" src="UserStory.js"></script>
<script type="text/javascript">
    UserStory.configure({
        on: ['*'],
        off: ['foo.bar'],
        logger: function (message, section){
            console.log('My custon log', message, section);
        }
    });
</script>
```

or type in console:


```javascript
UserStory.on('*');
```

```javascript
UserStory.off('foo.bar');
```

```javascript
UserStory.reset();
```
