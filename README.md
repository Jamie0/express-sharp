[![Build Status](https://travis-ci.org/pmb0/express-sharp.svg?branch=develop)](https://travis-ci.org/pmb0/express-sharp)
[![Test Coverage][coveralls-image]][coveralls-url]

# express-sharp

express-sharp adds real-time image processing routes to your express application. Images are processed with [sharp](https://github.com/lovell/sharp), a fast Node.js module for resizing images.


## Installation

```sh
$ yarn add express-sharp
$ npm install express-sharp --save
```

See [sharp installation](https://sharp.pixelplumbing.com/install) for additional installation instructions.

## Usage

Example *app.js*:

```js
const express = require('express')
const app = express()
const scale = require('express-sharp')

app.use('/my-scale', scale())

app.listen(3000)
```

Render `http://mybasehost.com/image.jpg` with 400x400 pixels:

```
GET /my-scale/resize/400?url=%2Fimage.jpg HTTP/1.1
Host: localhost:3000

--> invokes in background:
  GET image.jpg HTTP/1.1
  Host: mybasehost.com
```

Same as above, but with 80% quality, `webp` image type and with progressive enabled:

```
GET /my-scale/resize/400?format=webp&quality=80&progressive=true&url=%2Fimage.jpg HTTP/1.1
Host: localhost:3000
```

## Options

```js
const scale = require('express-sharp')
app.use('/some-path', scale(options))
```

Supported options:

### `baseHost`

Specify the HTTP base host from which images will be requested. Default: Requested host.

### `cropMaxSize`

The maximum length in pixels (width or height) a cropped Image is allowed to have.
Note: if this value is too high an attacker could use this to slow down your server.
Default is `2000`

### `cors`

Specify CORS options as described in [cors docs](https://github.com/expressjs/cors). Example:

```js
app.use('/some-path', scale({
  cors: {
    origin: 'http://example.com'
  }
}))
```

If not specified, a `Access-Control-Allow-Origin: *` header is being sent.

## Path and query params

### `format`

Output image format.

Default: `webp` if supported else the output format of the requested image.

Valid values: every valid [sharp output format string](https://sharp.pixelplumbing.com/api-output#toformat), i.e. `jpeg`, `gif`, `webp` or `raw`.

### `progressive`

only available for jpeg and png formats:

See [sharp docs for jpeg](https://sharp.pixelplumbing.com/api-output#jpeg).

See [sharp docs for png](https://sharp.pixelplumbing.com/api-output#png).

Use `&progressive=true` to enable progressive scan.

### `quality`

See [sharp docs](https://sharp.pixelplumbing.com/en/stable/api-output/).

quality is a Number between 1 and 100.

### `crop`

See [sharp docs](https://sharp.pixelplumbing.com/api-resize#crop).

Use `&crop=true` to enable the sharp cropping feature. 

Default is `false.

Note: Both `width` and `height` params are neccessary for crop to work.

### `gravity`

See [sharp docs](https://sharp.pixelplumbing.com/api-resize#resize).

When the crop option is activated you can specify the gravity of the cropping.

Possible attributes of the optional `gravity` are 
`north`, `northeast`, `east`, `southeast`, `south`, `southwest`, `west`, `northwest`, `center` and `centre`.

Default is `center`;


### `url`

URL/path to original image.

## License

[MIT](LICENSE)

[coveralls-image]: https://img.shields.io/coveralls/pmb0/express-sharp/master.svg
[coveralls-url]: https://coveralls.io/r/pmb0/express-sharp?branch=master
