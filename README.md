# blog.nuxt

Markdown static blog generator with Showdown.js and Pug based on Nuxt

## Why another static blog generator?

I find Showdown.js easy to extend with <https://github.com/patarapolw/indented-filter>. Pug is also easy to extend with Pug filters. I find popular static blog generators to use Showdown-it or something else, with makes it hard to extend, not to mention that there is no Pug.

## Why Nuxt?

In order to be SEO-friendly and on GitHub Pages as well, as GitHub Pages doesn't allow SPA with History Router.

## Installation

- `npm i -g https://github.com/patarapolw/blog.nuxt.git`
- Create `config.json`, filled with settings, as will be describe in the example
- `blog.nuxt` to run a development server. `blog.nuxt -b` to build for GitHub Pages.

## Publishing to GitHub

- You might use <https://www.npmjs.com/package/gh-pages>
- `gh-pages -d dist -t true`

## Development mode

```
npm init -y
git init
git submodule add https://github.com/patarapolw/blog.nuxt.git
npm i ./blog.nuxt
```

## Creating add new theme

- Add these to `.gitignore`

```
# Blog.nuxt
assets/build/
static/build/
```

- Edit `nuxt.config.js`

## Example

- <https://www.polvcode.dev>
  - I also used a different theme from default, which will probably be more updated. You can get the idea here.
- <https://zhlab.polvcode.dev>
