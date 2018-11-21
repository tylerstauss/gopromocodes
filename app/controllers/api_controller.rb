require 'csv'
class ApiController < ApplicationController

	def coupons
		today = Date.today
		today = params[:starts] if params[:starts]
		@promo_codes = []
		@promo_codes = PromoCode.where(approved: true).where("promo_codes.created_at >= '#{today}'").joins(:store).select("promo_codes.id","stores.name","stores.domain","stores.id","promo_codes.title","promo_codes.description","promo_codes.starts","promo_codes.expires","promo_codes.code","promo_codes.link","promo_codes.free_shipping").where(approved: true).where("promo_codes.created_at >= '#{today}'").limit(10000)
		@promo_codes.each do |code|
			p "here"
			p code.id,code.title,code.description,code.starts,code.expires,code.code,code.link,code.free_shipping
		end
		if params[:format] == 'json'
			render json: @promo_codes
		elsif params[:format] == 'csv'
			headers['Content-Disposition'] = "attachment; filename=\"promo-codes\""
		    headers['Content-Type'] ||= 'text/csv'
		else
			render json: @promo_codes
		end
	end

	def coupons_by_domain
		today = Date.today
		@domain = params[:domain]
		@store = Store.where(domain: @domain).first
		@key = params[:key]
		@promo_codes = []
		if @store
			@promo_codes = @store.promo_codes.select("id","title","description","starts","expires","code","link","free_shipping").where(approved: true).where("expires >= '#{today}' or expires is null").order("created_at DESC").limit(100)
			if @promo_codes.length > 0
				@here = @promo_codes
			else
				@promo_codes = []
			end
		end
		if params[:format] == 'json'
			render json: @promo_codes
		elsif params[:format] == 'csv'
			headers['Content-Disposition'] = "attachment; filename=\"promo-codes\""
		    headers['Content-Type'] ||= 'text/csv'
		else
			render json: @promo_codes
		end
		# respond_to do |format|
		#     format.html {render json: @promo_codes} if params[:format] == 'json'
		#     format.json {render json: @promo_codes} if params[:format] == 'json'
		#     format.csv do
		#       	headers['Content-Disposition'] = "attachment; filename=\"promo-codes\""
		#     	headers['Content-Type'] ||= 'text/csv'
		#     end
  # 		end
		
	end
end