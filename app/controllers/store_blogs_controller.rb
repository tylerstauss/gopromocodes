

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
		@subscriber = Subscriber.new
		@categories = Category.order('name ASC')
		@top_stores = Store.where(top_store: true).limit(12)
		@promo_code = StoreBlog.new
	end

	def create
		@promo_code = StoreBlog.new(promo_code_params)
	  @promo_code.save
		@subscriber = Subscriber.new
		@categories = Category.order('name ASC')
		@top_stores = Store.where(top_store: true).limit(12)

	  redirect_to @promo_code
	end

	def show
		@promo_code = StoreBlog.find(params[:id])
		vl_api = '2629ea091f62c185fac384857620742c'
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

	def delete
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