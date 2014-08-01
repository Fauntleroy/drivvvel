# drivvvel

Basically just Dribbble comments.

### Development

Drivvvel uses [Gulp.js](http://gulpjs.com) to handle a few simple build tasks:

- `compile css` compiles `src/index.less` and deposits the result in `compiled/index.css`. It also handles livereload functionality.
- `compile js` compiles `src/index.js` and deposits the result in `compiled/index.js`
- `watch css` watches all the `less` and `css` files in `src` for changes, then recompiles `src/index.less`.
- `default` compiles everything, then starts watching for changes. This is the only task you'll need to run.

For the most part, you'll only need to run `gulp`, which will run the default task. The source javascript and CSS files are in the `src` directory, and the compiled files for use in the site are dropped in `compiled`. All of the site's markup is contained in `index.html`, the origin of all things.

### Deployment

Drivvvel is basically just a hacky [GitHub Pages](https://pages.github.com/) site. There's a branch called `gh-pages`, which contains the code currently used on the deployed site. To update the live site:

- commit and push your changes to `master`
- switch to `gh-pages` and merge `master` into it
- push `gh-pages`

Within a couple minutes, your new changes should go live!
