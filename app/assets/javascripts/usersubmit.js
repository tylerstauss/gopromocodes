var UserSubmit = {
	init: function(){
		console.log('user submit initialized')
		$('.new_promo_code').on('ajax:success', this.addPromoCode);
		// $('#subscriber-email').on('ajax:error', this.showError);
	},
	addPromoCode: function(e, data){
		console.log('promo code on success added')
		// console.log(e)
		// console.log(data)
		$('p.success').html("Thank you for submitting a coupon! It will show up once approved by GoPromoCodes admins.");
		// $('.remove-' + $(this).attr("id") + "" ).remove();
	},
	// showError: function(e,data){
	// 	$('.response').html(data.responseText)
	// }
} 