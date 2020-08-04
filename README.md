# PostCSS RFS Autopilot

[PostCSS] A plugin that automagically mark your CSS up with `rfs()` for [RFS](https://github.com/twbs/rfs).

[PostCSS]: https://github.com/postcss/postcss

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

## Autopilot for RFS, what about freedom?

There is no shortcut for freedom. As we Hong Kongers fighting for our freedom and our very existence, your support is crucial to us.  Check out [what you can do to fight with us]().

## Installation

Input this command in terminal and download this PostCSS plugin.

```

npm i postcss-rfs-autopilot

```

[RFS](https://github.com/twbs/rfs) is treated as an external dependency for this plugin, thus you would need to download and include it manually in your PostCSS config as usual.

```

npm i rfs

```

## Usage

Check you project for existed PostCSS config: `postcss.config.js`
in the project root, `"postcss"` section in `package.json`
or `postcss` in bundle config.

If you already use PostCSS, add the plugin to plugins list:

As this plugin only adds `rfs()` to values of your CSS, you have to require it before `rfs` in order to make it useful. 

```diff
module.exports = {
  plugins: [
+   require('postcss-rfs-autopilot'),
    require('autoprefixer')
  ]
}
```

If you do not use PostCSS, add it according to [official docs]
and set this plugin in settings.

[official docs]: https://github.com/postcss/postcss#usage

## API Reference

TODO
