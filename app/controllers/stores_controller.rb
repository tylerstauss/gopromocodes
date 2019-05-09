class StoresController < ApplicationController
	add_breadcrumb "stores", :stores_path
	def index
		p params
		@stores = Store.where(active: true).search(params[:term], params[:page])
		if params["new"]
			@stores = Store.where(active: true).search(params[:term], params[:page]).order(created_at: :desc)
		end
		@subscriber = Subscriber.new
		@categories = Category.order('name ASC')
		@top_stores = Store.where(top_store: true).limit(12)
	end

	def all_stores
		authenticate_admin!
		p params["new"]
		@stores = Store.where(active: true).order(name: :asc).search(params[:term], params[:page])
		if params["new"]
			p 'newest stores'
			@stores = Store.where(active: true).order(created_at: :desc).search(params[:term], params[:page])
		end
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
		@amp = request.format.amp?
		p "amp #{@amp}"
		today = Date.today
		@store = Store.find(params[:id])
		if @store.promo_codes
			@expired = @store.promo_codes.where("expires <= '#{today}' or approved != true")
			@freeshipping = @store.promo_codes.where(free_shipping: true).where(approved: true).where("expires >= '#{today}' or expires is null")
			@featured_codes = @store.promo_codes.where(approved: true).where("expires >= '#{today}' or expires is null").where("order_id < 0").order("order_id ASC")
			@non_featured_promo_codes = @store.promo_codes.where(approved: true).where("expires >= '#{today}' or expires is null").where("order_id > 0").order("order_id DESC")
		end
		p @promo_codes = @featured_codes + @non_featured_promo_codes
		@subscriber = Subscriber.new
		@categories = Category.order('name ASC')
		@top_stores = Store.where(top_store: true).limit(12)
		# p @store.meta_description
		@blogs = @store.store_blogs.order('pub_date DESC')
		@promo_code = PromoCode.new
		add_breadcrumb @store.name, store_path(@store)
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