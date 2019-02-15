

class StoreBlogsController < ApplicationController

require 'uri'
	
	def index
		@promo_codes = StoreBlog.all
		@subscriber = Subscriber.new
		@categories = Category.order('name ASC')
		@top_stores = Store.where(top_store: true).limit(12)
	end

	def new
		authenticate_admin!
		@store_blog = StoreBlog.new
		@subscriber = Subscriber.new
		@categories = Category.order('name ASC')
		@top_stores = Store.where(top_store: true).limit(12)
	end

	def create
		p params
		p params["store_blog"]["store_id"]
		@store_blog = StoreBlog.new(store_blog_params)
	  	@store_blog.save
	  	@store = Store.find_by_id(params["store_blog"]["store_id"])
		@subscriber = Subscriber.new
		@categories = Category.order('name ASC')
		@top_stores = Store.where(top_store: true).limit(12)

	  redirect_to store_path(@store)
	end

	def show
		@promo_code = StoreBlog.find(params[:id])
		@link =  CGI.escape(@promo_code.link)
		@subscriber = Subscriber.new
		@categories = Category.order('name ASC')
		@top_stores = Store.where(top_store: true).limit(12)
		redirect_to "http://redirect.viglink.com/?u=#{@link}&key=#{vl_api}"
	end

	def edit
		authenticate_admin!
		@store_blog = StoreBlog.find(params[:id])
		@subscriber = Subscriber.new
		@categories = Category.order('name ASC')
		@top_stores = Store.where(top_store: true).limit(12)
	end

	def update
		store_blog = StoreBlog.find(params[:id])
    store_blog.update!(store_blog_params)
    redirect_to store_path(store_blog.store)
	end

	def destroy
		authenticate_admin!
		@blog = StoreBlog.find(params[:id])
		store = @pblog.store
		@pblog.destroy
		redirect_to store_path(store)
	end

	def newest
		@subscriber = Subscriber.new
		@categories = Category.order('name ASC')
		@top_stores = Store.where(top_store: true).limit(12)
		@promo_codes = StoreBlog.order('created_at DESC').limit(50)
	end

	private
  def store_blog_params
    params.require(:store_blog).permit(:store_id,:publish_date, :post, :author)
  end
	
	
end