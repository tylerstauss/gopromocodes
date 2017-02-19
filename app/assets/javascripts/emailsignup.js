var EmailSignup = {
	init: function(){
		console.log('email sign up initialized')
		$('.new_subscriber').on('ajax:success', this.addSubscriber);
		// $('#subscriber-email').on('ajax:error', this.showError);
	},
	addSubscriber: function(e, data){
		console.log('here')
		// console.log(e)
		// console.log(data)
		$('div.email-signup h3').html("Thank you for subscribing!");
		// $('.remove-' + $(this).attr("id") + "" ).remove();
	},
	// showError: function(e,data){
	// 	$('.response').html(data.responseText)
	// }
} 