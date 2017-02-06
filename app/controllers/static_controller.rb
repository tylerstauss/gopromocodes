class StaticController < ApplicationController
	
	def index
		@promo_codes = PromoCode.where(homepage: true)
		@categories = Category.all
	end

	def about
	end

	
end