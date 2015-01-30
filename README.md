[![Build Status](https://secure.travis-ci.org/piumosso/UserStory.png)](http://travis-ci.org/piumosso/UserStory)
[![Coverage Status](https://coveralls.io/repos/piumosso/UserStory/badge.png)](https://coveralls.io/r/piumosso/UserStory)

[![NPM](https://nodei.co/npm/user-story.png)](https://nodei.co/npm/user-story/)


# UserStory v0.0.10 — client-side logger

![](https://raw.github.com/piumosso/UserStory/master/example/example.png)

### [gulp-user-story](https://github.com/piumosso/gulp-user-story)
### [grunt-user-story](https://github.com/piumosso/grunt-user-story)


## Installation


### Install backend && frontend

```bash
npm install user-story
bower install UserStory
```


### Format logs

```javascript
... // Message @foo
... // Message @foo @foo.bar @baz
... // Message [x] @foo
... // Message [`x] @foo
```

The last two examples show how to display variable, the last example displays the variables in the JSON.


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
<script type="text/javascript" src="bower_components/UserStory/lib/UserStory.js"></script>
<script type="text/javascript">
    UserStory.configure({
        on: ['*'],
        off: ['foo.bar'],
        logger: function (message, section){
            console.log('My custom log', message, section);
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


```javascript
UserStory.only('foo.bar'); // Equivalent of UserStory.reset(); UserStory.on('foo.bar');
```


### [Пост про UserStory.js](http://piumosso.ru/projects/user-story/userstory-review/)
