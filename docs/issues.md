# Issues

## iron-iconset-svg.html

Around line 52 the comment is not closed correctly.

Because of this the icons fail to load.

Correctly close the comment before building the site

I filed an issue on the repo.

```javascript
...

   * @element iron-iconset-svg
   * @demo demo/index.html
   * @implements {Polymer.Iconset}
   **/
```
