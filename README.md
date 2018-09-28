# :o: ha11y

> Browserless Parallel Accessibility HTML Code Sniffer

[![Build Status](https://travis-ci.org/f1lt3r/ha11y.svg?branch=master)](https://travis-ci.org/f1lt3r/ha11y)
[![Coverage Status](https://coveralls.io/repos/github/f1lt3r/ha11y/badge.svg?branch=master)](https://coveralls.io/github/f1lt3r/ha11y?branch=master)
[![NPM Version](https://img.shields.io/npm/v/ha11y.svg)](https://www.npmjs.com/package/ha11y)
[![XO code style](https://img.shields.io/badge/code_style-XO-5ed9c7.svg)](https://github.com/sindresorhus/xo)

## Install

```
npm install --save-dev ha11y
```

## Usage

### React

```js
import React from 'react';
import {shallow} from 'enzyme';
import ha11y from 'ha11y';

import MyImgComp from '../MyImgComp';

it('ha11y test', () => {
    const wrapper = shallow(<ImgComp alt src="foo"/>);
    const html = wrapper.html();
    
    return ha11y.test(html)
        .then(results => {
            console.log(results);
            expect(results.length).toEqual(0);
        });
});
```

## Licence

Runs on [HTML_CodeSniffer](https://squizlabs.github.io/HTML_CodeSniffer/) &mdash; see [licence.txt](HTML_CodeSniffer/licence.txt)