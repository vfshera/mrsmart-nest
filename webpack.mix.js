// eslint-disable-next-line @typescript-eslint/no-var-requires
const mix = require('laravel-mix');

mix
  .js('resources/js/app.js', 'public/js')
  .sass('resources/scss/app.scss', 'public/css')
  .options({
    postCss: [require('tailwindcss')],
  });

if (mix.inProduction()) {
  mix.version();
}
