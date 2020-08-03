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
  /* After the transformation of RFS Autopilot but before RFS*/
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

With this plugin, you just need to declare rules you want to apply `rfs()` to, and it will do the heavy lifting for you.

## Usage

Check you project for existed PostCSS config: `postcss.config.js`
in the project root, `"postcss"` section in `package.json`
or `postcss` in bundle config.

If you already use PostCSS, add the plugin to plugins list:

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
