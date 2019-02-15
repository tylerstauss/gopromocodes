class StoresController < ApplicationController

	def index
		@stores = Store.search(params[:term], params[:page])
		@subscriber = Subscriber.new
		@categories = Category.order('name ASC')
		@top_stores = Store.where(top_store: true).limit(12)
	end

	def all_stores
		authenticate_admin!
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
		today = Date.today
		@store = Store.find(params[:id])
		@expired = @store.promo_codes.where("expires <= '#{today}'")
		@freeshipping = @store.promo_codes.where(free_shipping: true).where(approved: true).where("expires >= '#{today}' or expires is null")
		@featured_codes = @store.promo_codes.where(approved: true).where("expires >= '#{today}' or expires is null").where("order_id < 0").order("order_id ASC")
		@non_featured_promo_codes = @store.promo_codes.where(approved: true).where("expires >= '#{today}' or expires is null").where("order_id > 0").order("order_id DESC")
		p @promo_codes = @featured_codes + @non_featured_promo_codes
		@subscriber = Subscriber.new
		@categories = Category.order('name ASC')
		@top_stores = Store.where(top_store: true).limit(12)
		@blogs = @store.store_blogs.order('pub_date DESC')
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
    params.require(:store).permit(:name, :description, :url, :meta_keywords, :meta_description, :meta_title, :active, :user_submit, :category_id, :slug, :top_store, :old_slug, :network_id, :network, :domain, :viglink_id, :viglink_group_id, :viglink_name)
  end
	
end