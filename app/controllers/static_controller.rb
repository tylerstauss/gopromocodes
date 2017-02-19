class StaticController < ApplicationController
	
	def index
		@subscriber = Subscriber.new
		@promo_codes = PromoCode.where(homepage: true)
		@categories = Category.order('name ASC')
		@top_stores = Store.where(top_store: true).limit(12)
	end

	def about
				@subscriber = Subscriber.new
		@categories = Category.order('name ASC')
		@top_stores = Store.where(top_store: true).limit(12)
	end

	def search
				@subscriber = Subscriber.new
		@search_term = params[:search_term]
		p @search_term
		@stores = Store.where("name like ? or description like ? or slug like ? or search_terms like ?", "%"+@search_term+"%", "%"+@search_term+"%", "%"+@search_term+"%", "%"+@search_term+"%")
		@promo_codes = PromoCode.where("title like ? or description like ?", "%"+@search_term+"%", "%"+@search_term+"%")
		@categories = Category.order('name ASC')
		@top_stores = Store.where(top_store: true).limit(12)
	end

	def contact
				@subscriber = Subscriber.new
		@categories = Category.order('name ASC')
		@top_stores = Store.where(top_store: true).limit(12)
	end

	def grocery
				@subscriber = Subscriber.new
		@categories = Category.order('name ASC')
		@top_stores = Store.where(top_store: true).limit(12)
	end

	def terms
				@subscriber = Subscriber.new
				@subscriber = Subscriber.new
		@categories = Category.order('name ASC')
		@top_stores = Store.where(top_store: true).limit(12)
	end

	def articles
				@subscriber = Subscriber.new
		@categories = Category.order('name ASC')
		@top_stores = Store.where(top_store: true).limit(12)
	end

	def gardening
				@subscriber = Subscriber.new
		@categories = Category.order('name ASC')
		@top_stores = Store.where(top_store: true).limit(12)
	end

	def games
				@subscriber = Subscriber.new
		@categories = Category.order('name ASC')
		@top_stores = Store.where(top_store: true).limit(12)
	end

	def clipart
				@subscriber = Subscriber.new
		@categories = Category.order('name ASC')
		@top_stores = Store.where(top_store: true).limit(12)
	end

	def entertainment
				@subscriber = Subscriber.new
		@categories = Category.order('name ASC')
		@top_stores = Store.where(top_store: true).limit(12)
	end

	def cellphones
				@subscriber = Subscriber.new
		@categories = Category.order('name ASC')
		@top_stores = Store.where(top_store: true).limit(12)
	end

	def moneysaving
				@subscriber = Subscriber.new
		@categories = Category.order('name ASC')
		@top_stores = Store.where(top_store: true).limit(12)
	end

	def photography
				@subscriber = Subscriber.new
		@categories = Category.order('name ASC')
		@top_stores = Store.where(top_store: true).limit(12)
	end

	def keyboarding
				@subscriber = Subscriber.new
		@categories = Category.order('name ASC')
		@top_stores = Store.where(top_store: true).limit(12)
	end

	def classics
				@subscriber = Subscriber.new
		@categories = Category.order('name ASC')
		@top_stores = Store.where(top_store: true).limit(12)
	end
	
	def newyears
				@subscriber = Subscriber.new
		@categories = Category.order('name ASC')
		@top_stores = Store.where(top_store: true).limit(12)
	end

	def fairtrade
				@subscriber = Subscriber.new
		@categories = Category.order('name ASC')
		@top_stores = Store.where(top_store: true).limit(12)
	end

	def zoe_stauss
				@subscriber = Subscriber.new
		@categories = Category.order('name ASC')
		@top_stores = Store.where(top_store: true).limit(12)
	end

		def tyler_stauss
				@subscriber = Subscriber.new
		@categories = Category.order('name ASC')
		@top_stores = Store.where(top_store: true).limit(12)
	end
end