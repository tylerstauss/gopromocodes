var Clicks = {
	init: function(){
		console.log('extension initialized')
		$('button.extension-download').on('click', this.extensionClick);
	},
	extensionClick: function(){
	console.log('extension download')
	  gtag('event', 'click', {
	    'event_category': 'extension',
	    'event_label': 'download',
	    'transport_type': 'beacon',
	    'event_callback': function(){document.location = url;}
	  });
	window.open("https://chrome.google.com/webstore/detail/immfhcnfbbkmalfgmdhgmfgfmffbegbf", "_blank"); 
	}
}