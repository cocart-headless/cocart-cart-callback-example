<h1 align="center">CoCart - Cart Callback Example</h1>

<p align="center"><img src="https://cocart.xyz/wp-content/uploads/2021/11/cocart-home-default.png.webp" alt="CoCart" /></p>

<br>

This is a Cart Callback Example plugin for CoCart. It is setup so that it can be installed standalone as a WordPress plugin.

It provides you an example of registering a callback that can be triggered when updating the cart with CoCart.

> Callback can only be triggered if CoCart v4.0 is installed.

Here's some more details on the configuration options:

#### `$name` (required)

This is the namespace string that is used to identifier the callback when called via the cart update API.

#### `callback()` (required)

The callback function is where you will place your code to do what you need to the cart before it returns the updated cart response.

If the callback function is missing an error will return when called.

### Example of calling the callback.

> This example shows we are triggering a callback to use 10 points to save on the cart total.

```http
curl --location --request POST 'https://example.com/wp-json/cocart/v2/cart/update' \
--header 'Content-Type: application/json' \
--data '{
  "namespace": "my-custom-callback",
  "data": {
    "points": "10",
  }
}'
```

---

### Register Callback

To register a callback, simply load and hook the callback like so.

```php
add_action( 'cocart_register_extension_callback', 'register_extension_callback_test' );

function register_extension_callback_test( $callback ) {
  include_once( dirname( __FILE__) . '/callback/test.php' );

  $callback->register( new CoCart_Callback_Test() );
}
```

----

## Main directories and files

- `cocart-cart-callback-example.php` - The main plugin file. ONLY used when using this package as a plugin!
- `includes/class-cocart-cart-callback-example.php`
- `includes/callback/test.php`

  - `init` - Init your package. If it needs to hook into WordPress, do so here.


## License

Released under [GNU General Public License v3.0](http://www.gnu.org/licenses/gpl-3.0.html).

---

## CoCart Channels

We have different channels at your disposal where you can find information about the CoCart project, discuss it and get involved:

[![Twitter: cocartapi](https://img.shields.io/twitter/follow/cocartapi?style=social)](https://twitter.com/cocartapi) [![CoCart GitHub Stars](https://img.shields.io/github/stars/co-cart/co-cart?style=social)](https://github.com/co-cart/co-cart)

<ul>
  <li>📖 <strong>Docs</strong>: this is the place to learn how to use CoCart API. <a href="https://docs.cocart.xyz/#getting-started">Get started!</a></li>
  <li>🧰 <strong>Resources</strong>: this is the hub of all CoCart resources to help you build a headless store. <a href="https://cocart.dev/?utm_medium=repo&utm_source=github.com&utm_campaign=readme&utm_content=cocartcore">Get resources!</a></li>
  <li>👪 <strong>Community</strong>: use our Discord chat room to share any doubts, feedback and meet great people. This is your place too to share <a href="https://cocartapi.com/community/?utm_medium=repo&utm_source=github.com&utm_campaign=readme&utm_content=cocartcore">how are you planning to use CoCart!</a></li>
  <li>🐞 <strong>GitHub</strong>: we use GitHub for bugs and pull requests, doubts are solved with the community.</li>
  <li>🐦 <strong>Social media</strong>: a more informal place to interact with CoCart users, reach out to us on <a href="https://twitter.com/cocartapi">Twitter.</a></li>
  <li>💌 <strong>Newsletter</strong>: do you want to receive the latest plugin updates and news? Subscribe <a href="https://twitter.com/cocartapi">here.</a></li>
</ul>

---

## Get involved

Do you like the idea of creating a headless store with WooCommerce? Got questions or feedback? We'd love to hear from you. Come [join our community](https://cocartapi.com/community/?utm_medium=repo&utm_source=github.com&utm_campaign=readme&utm_content=cocartcore)! ❤️

---

## Credits

Website [cocartapi.com](https://cocartapi.com) &nbsp;&middot;&nbsp;
GitHub [@co-cart](https://github.com/co-cart) &nbsp;&middot;&nbsp;
Twitter [@cocartapi](https://twitter.com/cocartapi)

---

CoCart is developed and maintained by [Sébastien Dumont](https://github.com/seb86).
Founder of [CoCart Headless, LLC](https://github.com/cocart-headless).

Website [sebastiendumont.com](https://sebastiendumont.com) &nbsp;&middot;&nbsp;
GitHub [@seb86](https://github.com/seb86) &nbsp;&middot;&nbsp;
Twitter [@sebd86](https://twitter.com/sebd86)