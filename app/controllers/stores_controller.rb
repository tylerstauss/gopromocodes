class StoresController < ApplicationController

	def index
		@stores = Store.search(params[:term], params[:page])
		@subscriber = Subscriber.new
		@categories = Category.order('name ASC')
		@top_stores = Store.where(top_store: true).limit(12)
	end

	def new
		authenticate_admin!
		@store = Store.new
	end

	def create
		@store = Store.new(store_params)
	  @store.save
		@subscriber = Subscriber.new
	  @categories = Category.order('name ASC')
		@top_stores = Store.where(top_store: true).limit(12)
	  redirect_to @store
	end

	def show
		@store = Store.find(params[:id])
		@promo_codes = @store.promo_codes.where(approved: true)
		@subscriber = Subscriber.new
		@categories = Category.order('name ASC')
		@top_stores = Store.where(top_store: true).limit(12)
		@blogs = @store.store_blogs.order('publish_date DESC')
		@promo_code = PromoCode.new

	end

	def edit
		authenticate_admin!
		@store = Store.find(params[:id])
		@subscriber = Subscriber.new
		@categories = Category.order('name ASC')
		@top_stores = Store.where(top_store: true).limit(12)
	end

	def update
		store = Store.find(params[:id])
    store.update!(store_params)
    redirect_to store
	end

	def delete
	end

private
  def store_params
    params.require(:store).permit(:name, :description, :url, :meta_keywords, :meta_description, :meta_title, :active, :user_submit, :category_id, :slug, :top_store, :old_slug)
  end
	
end