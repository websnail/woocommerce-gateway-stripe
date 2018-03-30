=== WooCommerce Stripe Payment Gateway ===

Stripe provides functionality that allows for multiple "bank accounts" to be created. This in turn allows for
true multi-currency handling through Stripe which, if appropriate currency accounts for payouts are available
(eg: Transferwise) means no currency exchange fees.

Short version: You accept dollars, you payout in dollars, you keep dollars. You accept Euros, you keep Euros, etc...

The limitations:
- Stripe treats each of its users "bank accounts" as separate entities including the API keys
- So, no way to use single API key set and redirect on the basis of currency

Solution:
- We collect all the API keys and associate to the relevant currencies
- We determine which currency is being used for payment
- We assign the correct keys



TODO: Determine which currencies are acceptable as bank accounts on Stripe
TODO: Create full array ( $stripe_accepted_currencies ) of the above Stripe:bank currencies
TODO: Create dynamic way to generate the settings fields for each currency set based on currencies selected
TODO: Sanity check which currencies the store is accepting payment in (Aelia Currency Selector?)
TODO: Resolve currency key settings for check_environment()
TODO: Intercept/Redirect $this->get_option( 'CURRENCY_FOO_key' ) calls to return correct currency based keys
TODO: Graceful default to store default currency
TODO: Block any attempts to unset the default currency as a key setting group

TODO: Determine the other task items