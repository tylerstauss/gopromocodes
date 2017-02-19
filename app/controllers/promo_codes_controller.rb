

class PromoCodesController < ApplicationController

require 'uri'
	
	def index
		@promo_codes = PromoCode.all
		@subscriber = Subscriber.new
		@categories = Category.order('name ASC')
		@top_stores = Store.where(top_store: true).limit(12)
	end

	def new
		authenticate_admin!
		@subscriber = Subscriber.new
		@categories = Category.order('name ASC')
		@top_stores = Store.where(top_store: true).limit(12)
		@promo_code = PromoCode.new
	end

	def create
		@promo_code = PromoCode.new(promo_code_params)
	  @promo_code.save
		@subscriber = Subscriber.new
		@categories = Category.order('name ASC')
		@top_stores = Store.where(top_store: true).limit(12)

	  redirect_to @promo_code
	end

	def show
		@promo_code = PromoCode.find(params[:id])
		vl_api = '2629ea091f62c185fac384857620742c'
		@link =  CGI.escape(@promo_code.link)
		@subscriber = Subscriber.new
		@categories = Category.order('name ASC')
		@top_stores = Store.where(top_store: true).limit(12)
		redirect_to "http://redirect.viglink.com/?u=#{@link}&key=#{vl_api}"
	end

	def edit
		authenticate_admin!
		@promo_code = PromoCode.find(params[:id])
		@subscriber = Subscriber.new
		@categories = Category.order('name ASC')
		@top_stores = Store.where(top_store: true).limit(12)
	end

	def update
		promo_code = PromoCode.find(params[:id])
    promo_code.update!(promo_code_params)
    redirect_to promo_code
	end

	def delete
	end

	def newest
		@subscriber = Subscriber.new
		@categories = Category.order('name ASC')
		@top_stores = Store.where(top_store: true).limit(12)
		@promo_codes = PromoCode.order('created_at DESC').limit(50)
	end

	private
  def promo_code_params
    params.require(:promo_code).permit(:title,:description, :promo_code, :store_id, :category_id, :starts, :expires, :link, :homepage, :free_shipping, :user_submit)
  end
	
	
end