![PostCSS RFS Autopilot terminal screenshot](https://github.com/winston0410/postcss-rfs-autopilot/blob/master/postcss-rsf-autopilot-example.png?raw=true)

# PostCSS RFS Autopilot

[![Maintainability](https://api.codeclimate.com/v1/badges/ff984c8d9c6e4277723f/maintainability)](https://codeclimate.com/github/winston0410/postcss-rfs-autopilot/maintainability) [![Known Vulnerabilities](https://snyk.io/test/github/winston0410/postcss-rfs-autopilot/badge.svg?targetFile=package.json)](https://snyk.io/test/github/winston0410/postcss-rfs-autopilot?targetFile=package.json) [![Codacy Badge](https://app.codacy.com/project/badge/Grade/5ce28bbbcc174bfdad1dabd6ab3c64f6)](https://www.codacy.com/manual/winston0410/postcss-rfs-autopilot?utm_source=github.com&utm_medium=referral&utm_content=winston0410/postcss-rfs-autopilot&utm_campaign=Badge_Grade)

[PostCSS] A plugin that automagically mark your CSS up with `rfs()` for [RFS](https://github.com/twbs/rfs).

```css
/* Original Input */
.foo {
    font-size: 4em;
}
```

```css
/* After the transformation of RFS Autopilot but before RFS*/
.foo {
  font-size: rfs(4em);
}
```

```css
/* After the transformation of RFS*/
.foo {
  font-size: calc(1.525rem + 3.3vw);
}

@media (min-width: 1200px) {
  .foo {
    font-size: 4rem;
  }
}
```

## Problem

[RFS](https://github.com/twbs/rfs) is a great unit resizing engine that helps you build responsive CSS layout, but writing `rfs()` everywhere manually is a pain in the ass.

With this plugin, you just need to declare rules you want to apply `rfs()` to, and it will do the heavy-lifting for you.

## Made in Hong Kong :free: :free:

This plugin is made with love by a Hong Konger.

## Installation

As this plugin is a PostCSS plugin, you need to install and set up PostCSS first before use it. If you haven't used PostCSS before, set it up according to [official docs](https://github.com/postcss/postcss#usage).

Input this command in terminal and download this PostCSS plugin.

```
npm i postcss-rfs-autopilot
```

[RFS](https://github.com/twbs/rfs) is treated as an external dependency for this plugin, thus you would need to download and include it manually in your PostCSS config as usual.

```
npm i rfs
```

After you have installed this plugin, require it **before `RFS`** in your [PostCSS configuration files, or the place where you config PostCSS in your environment](https://github.com/postcss/postcss#usage)

```javascript
//postcss.config.js or other files you use to config PostCSS

module.exports = {
  plugins: [
    //Other plugins...
    //You have to include this plugin before rfs
    require('postcss-rfs-autopilot'),
    require('rfs')
  ]
}
```

Now we will mark up all the values for you with `rfs()`:rocket::rocket::rocket:!

If you want to include or exclude some values or selectors, you can pass a configuration object to this plugin like this:

Check out our [API Reference](#api-reference) for configuration options.

```javascript
//postcss.config.js or other files you use to config PostCSS

module.exports = {
  plugins: [
    //Other plugins...
    //You have to include this plugin before rfs
    require('postcss-rfs-autopilot')({
      includedRules: [
        '*'
      ], //Rules you want to include, e.g. font-size
      includedSelectors: [
        'p #hello'
      ], //Selectors you want to include,
      includedUnits: [
        'px', 'rem'
      ], //Units you want to include, e.g. px.  Noted that RFS currently only works with px and rem
      excludedRules: [], //Rules you want to exclude
      excludedSelectors: [], //Selectors you want to exclude
      excludedUnits: [] //Units you want to exclude
      }),
    require('rfs')
  ]
}
```

### Advanced

Exclusion rules will have precedence over inclusion rules, which means that if a same rules is found in both `includedRules` and `excludedRules`, it will be excluded.

If you want to include all for an option, pass in `"*"` as its value.

## API Reference

### `options.includedRules`

Data type: `[Array]`

Default value: `[ '*' ]`

Description: Control which CSS rules you want this plugin wrap it up with `rfs()`, for example `font-size`

### `options.includedSelectors`

Data type: `[Array]`

Default value: `[ '*' ]`

Description: Control which CSS selectors you want this plugin wrap it up with `rfs()`, for example `p .free`

### `options.includedUnits`

Data type: `[Array]`

Default value: `[ 'px', 'rem' ]`

Description: Control which CSS units you want this plugin wrap it up with `rfs()`, for example `px`

### `options.excludedRules`

Data type: `[Array]`

Default value: `[]`

Description: Control which CSS rules you **do not** want this plugin wrap it up with `rfs()`, for example `font-size`

### `options.includedSelectors`

Data type: `[Array]`

Default value: `[]`

Description: Control which CSS selectors you **do not** want this plugin wrap it up with `rfs()`, for example `p .free`

### `options.includedUnits`

Data type: `[Array]`

Default value: `[]`

Description: Control which CSS units you **do not** want this plugin wrap it up with `rfs()`, for example `px`

[postcss]: https://github.com/postcss/postcss
