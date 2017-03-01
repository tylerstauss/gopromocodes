var UserSubmit = {
	init: function(){
		console.log('user submit initialized')
		$('.new_promo_code').on('ajax:success', this.addPromoCode);
		$('.new_promo_code').on('ajax:error', this.showError);
	},
	addPromoCode: function(e, data){
		console.log('promo code on success added')
		$('p.success').html("Thank you for submitting a coupon! It will show up once approved by GoPromoCodes admins.");
	},
	showError: function(e,data){
		$('p.error').html("Sorry, your code could not be submitted, please try again.")
	}
} 