jQuery( function( $ ) {
	'use strict';

	/*
	 * Multi-currency MOD
	 */
	var wc_stripe_accepted_currencies = array('gbp','usd','eur');

	/**
	 * Object to handle Stripe admin functions.
	 */
	var wc_stripe_admin = {
		isTestMode: function() {
			return $( '#woocommerce_stripe_testmode' ).is( ':checked' );
		},

		getSecretKey: function() {
			if ( wc_stripe_admin.isTestMode() ) {
				return $( '#woocommerce_stripe_test_secret_key' ).val();
			} else {
				return $( '#woocommerce_stripe_secret_key' ).val();
			}
		},

		/**
		 * Initialize.
		 */
		init: function() {
			$( document.body ).on( 'change', '#woocommerce_stripe_testmode', function() {

				$.each(wc_stripe_accepted_currencies, function(index, currency) {

					var label = '#woocommerce_stripe_'+currency;

					/*
					 * Skip these keys if the [currency]_test_secret_key field doesn't exist
					 */
					if( !$((label+'_test_secret_key')).length ) {
						return;
					}

					var test_secret_key = $( (label+'_test_secret_key') ).parents( 'tr' ).eq( 0 ),
						test_publishable_key = $( (label+'_test_publishable_key') ).parents( 'tr' ).eq( 0 ),
						live_secret_key = $( (label+'_secret_key') ).parents( 'tr' ).eq( 0 ),
						live_publishable_key = $( (label+'_publishable_key') ).parents( 'tr' ).eq( 0 );

					if ( $( this ).is( ':checked' ) ) {
						test_secret_key.show();
						test_publishable_key.show();
						live_secret_key.hide();
						live_publishable_key.hide();
					} else {
						test_secret_key.hide();
						test_publishable_key.hide();
						live_secret_key.show();
						live_publishable_key.show();
					}
				} );
			} );

			$( '#woocommerce_stripe_testmode' ).change();

			// Toggle Stripe Checkout settings.
			$( '#woocommerce_stripe_stripe_checkout' ).change( function() {
				if ( $( this ).is( ':checked' ) ) {
					$( '#woocommerce_stripe_stripe_bitcoin, #woocommerce_stripe_stripe_checkout_image, #woocommerce_stripe_stripe_checkout_description' ).closest( 'tr' ).show();
				} else {
					$( '#woocommerce_stripe_stripe_bitcoin, #woocommerce_stripe_stripe_checkout_image, #woocommerce_stripe_stripe_checkout_description' ).closest( 'tr' ).hide();
				}
			} ).change();

			// Toggle Payment Request buttons settings.
			$( '#woocommerce_stripe_payment_request' ).change( function() {
				if ( $( this ).is( ':checked' ) ) {
					$( '#woocommerce_stripe_payment_request_button_theme, #woocommerce_stripe_payment_request_button_type, #woocommerce_stripe_payment_request_button_height' ).closest( 'tr' ).show();
				} else {
					$( '#woocommerce_stripe_payment_request_button_theme, #woocommerce_stripe_payment_request_button_type, #woocommerce_stripe_payment_request_button_height' ).closest( 'tr' ).hide();
				}
			} ).change();
		}
	};

	wc_stripe_admin.init();
} );
