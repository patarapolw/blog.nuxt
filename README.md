# blog.nuxt

Markdown static blog generator with Showdown.js based on Nuxt

## Why another static blog generator?

I find Showdown.js easy to extend with <https://github.com/patarapolw/indented-filter>. Pug is also easy to extend with Pug filters. I find popular static blog generators to use Showdown-it or something else, with makes it hard to extend, not to mention that there is no Pug.

## Why Nuxt?

In order to be SEO-friendly and on GitHub Pages as well.

## Installation

```
npm init -y
npm i https://github.com/patarapolw/blog.nuxt.git
```

- Then, add `blog.nuxt` and `blog.nuxt -b` to `"scripts"` section of `package.json`
- Create `config.json`, filled with settings, as will be describe in the example
- `blog.nuxt` to run a development server. `blog.nuxt -b` to build for GitHub Pages.

## Publishing to GitHub

- You might use <https://www.npmjs.com/package/gh-pages>
- `gh-pages -d dist -t true`

## Example

<https://patarapolw.github.io/blog>