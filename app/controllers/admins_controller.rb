class AdminsController < ApplicationController

	def index
		authenticate_admin!
		p @total_discounts = PromoCode.where(approved: true).where("expires >= '#{today}' or expires is null").count
		p @total_stores = Store.count
		p @total_codes = PromoCode.where(approved: true).where("expires >= '#{today}' or expires is null").where("code is not null").count
		p @total_free_shipping = PromoCode.where(approved: true).where("expires >= '#{today}' or expires is null").where(free_shipping: true).count
		@subscriber = Subscriber.new
		@categories = Category.order('name ASC')
		@top_stores = Store.where(top_store: true).limit(12)
	end

	def code_approval
		authenticate_admin!
		@subscriber = Subscriber.new
		@categories = Category.order('name ASC')
		@top_stores = Store.where(top_store: true).limit(12)
		@promo_codes = PromoCode.where(approved: false, user_submit: true)
	end
end