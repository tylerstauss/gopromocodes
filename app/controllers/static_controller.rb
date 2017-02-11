class StaticController < ApplicationController
	
	def index
		@promo_codes = PromoCode.where(homepage: true)
		@categories = Category.order('name ASC')
		@top_stores = Store.where(top_store: true).limit(12)
	end

	def about
		@categories = Category.order('name ASC')
		@top_stores = Store.where(top_store: true).limit(12)
	end

	def search
		@search_term = params[:search_term]
		p @search_term
		@stores = Store.where("name like ? or description like ? or slug like ?", "%"+@search_term+"%", "%"+@search_term+"%", "%"+@search_term+"%")
		@promo_codes = PromoCode.where("title like ? or description like ?", "%"+@search_term+"%", "%"+@search_term+"%")
		@categories = Category.order('name ASC')
		@top_stores = Store.where(top_store: true).limit(12)
	end

	def contact
		@categories = Category.order('name ASC')
		@top_stores = Store.where(top_store: true).limit(12)
	end

	def grocery
		@categories = Category.order('name ASC')
		@top_stores = Store.where(top_store: true).limit(12)
	end
	
end