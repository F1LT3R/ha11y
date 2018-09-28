<p align="center"><img src="ha11y.png" alt="ha11y logo" /></p>

# :o: ha11y

> Browserless Parallel Accessibility HTML Code Sniffer

[![Build Status](https://travis-ci.org/f1lt3r/ha11y.svg?branch=master)](https://travis-ci.org/f1lt3r/ha11y)
[![Coverage Status](https://coveralls.io/repos/github/f1lt3r/ha11y/badge.svg?branch=master)](https://coveralls.io/github/f1lt3r/ha11y?branch=master)
[![NPM Version](https://img.shields.io/npm/v/ha11y.svg)](https://www.npmjs.com/package/ha11y)
[![XO code style](https://img.shields.io/badge/code_style-XO-5ed9c7.svg)](https://github.com/sindresorhus/xo)

## :man_scientist: Experimental

**:o: ha11y** is a highly experimental package. The API is subject to rapid change.

## Install

```
npm install --save-dev ha11y
```

## Usage

### React

Test:

```js
import React from 'react';
import {shallow} from 'enzyme';
import ha11y from 'ha11y';

import MyImgComp from '../MyImgComp';

it('ha11y test', () => {
    const dom = (
        <html lang="en">
            <head>
                <title>Foo</title>
            </head>
            <body>
                {/* Oops... no ALT tag! */}
                <MyImgComp src="foo.png"/>
            </body>
        </html>
    );

    const html = shallow(dom).html();

    return ha11y.test(html)
        .then(results => {
            const errors = results.filter(result => result.heading === 'ERROR');
            console.log(errors);
            expect(errors.length).toEqual(0);
        });
});
```

Output:

```shell
  FAIL  src/comps/__tests__/passage.test.js
  ● Console
```
```json
[
    {
        "heading": "ERROR",
        "issue": "WCAG2AAA.Principle1.Guideline1_1.1_1_1.H37",
        "description": "Img element missing an alt attribute. Use the alt attribute to specify a short text alternative.",
        "position": {
            "lineNumber": 1,
            "columnNumber": 0
        },
        "element": {
            "node": "<img src=\"foo.png\">",
            "class": "", 
            "id": ""
        }
    }
]
```

## Licence

Runs on [HTML_CodeSniffer](https://squizlabs.github.io/HTML_CodeSniffer/) &mdash; see [licence.txt](HTML_CodeSniffer/licence.txt)