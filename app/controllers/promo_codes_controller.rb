

class PromoCodesController < ApplicationController

require 'uri'
	
	def index
		@promo_codes = PromoCode.all
	end

	def new
		@promo_code = PromoCode.new
	end

	def create
		@promo_code = PromoCode.new(promo_code_params)
	  @promo_code.save

	  redirect_to @promo_code
	end

	def show
		@promo_code = PromoCode.find(params[:id])
		vl_api = '2629ea091f62c185fac384857620742c'
		@link =  CGI.escape(@promo_code.link)
		p @link
		redirect_to "http://redirect.viglink.com/?u=#{@link}&key=#{vl_api}"
	end

	def edit
		@promo_code = PromoCode.find(params[:id])
	end

	def update
		promo_code = PromoCode.find(params[:id])
    promo_code.update!(promo_code_params)
    redirect_to promo_code
	end

	def delete
	end

	private
  def promo_code_params
    params.require(:promo_code).permit(:title,:description, :promo_code, :store_id, :category_id, :starts, :expires, :link, :homepage, :free_shipping, :user_submit)
  end
	
	
end