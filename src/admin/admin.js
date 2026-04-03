import './admin.scss';

jQuery( function ( $ ) {
	$( 'body' ).addClass( 'about-php' );

	$( '.copy-settings-form' ).on( 'submit', function () {
		const text = $( this ).data( 'confirm' );
		const c = confirm( text );
		if ( ! c ) {
			return false;
		}
	} );
} );
