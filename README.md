[![Build Status](https://secure.travis-ci.org/piumosso/UserStory.png)](http://travis-ci.org/piumosso/UserStory)
[![Coverage Status](https://coveralls.io/repos/piumosso/UserStory/badge.png)](https://coveralls.io/r/piumosso/UserStory)

[![NPM](https://nodei.co/npm/user-story.png)](https://nodei.co/npm/user-story/)


# UserStory — client-side logger

![](example/example.png?raw=true)


## Usage


### Install

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
