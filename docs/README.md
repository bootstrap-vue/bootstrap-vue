# Introduction

> **Bootstrap** is the world’s most popular framework for building responsive, mobile-first sites and applications. Inside you’ll find high quality HTML, CSS, and JavaScript to make starting any project easier than ever. 

>**Vue.js** is a library that focuses heavily on the ViewModel—the two-way data bindings that tie what we see and interact with on the screen with the application's data mode. 

>This library, **BootstrapVue**, helps you quickly integrate Bootstrap 4 components with Vue.js 2.

## Setup
To get started use [Quick Start](/docs/setup) guide.
 

## Migrating a project already using Bootstrap
If you've already been using Bootstrap 4, there are a couple adjustments you may need to make to your project:
 
- remove the bootstrap.js file from your page scripts or build pipeline
- if Bootstrap is the only thing relying on jQuery, you can safely remove it — BootstrapVue **does not** depend on jQuery
- don't forget to include the `bootstrap-vue.css` file!

## Browsers Support

**CSS**

BootstrapVue is to be used with Bootstrap 4 CSS.
Please see [Browsers and devices](https://v4-alpha.getbootstrap.com/getting-started/browsers-devices)
for more information about browsers currently supported by Bootstrap 4. 

**JS**

BootstrapVue is written in Vue! So this is up to your project and bundler that which browsers are supported.
If you want to support older IE, Android and IOS devices, you may want to use
[Babel Polyfill](https://babeljs.io/docs/usage/polyfill)

**IE 11**

You'll need babel-polyfill for BootstrapVue to work properly. In order to support this browser: 
- npm install babel-polyfill --save
- Import it in your app main entry point with `import 'babel-polyfill'`
