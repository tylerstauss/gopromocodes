require 'csv'
class ApiController < ApplicationController

	def coupons_test
		today = Date.today
		today = params[:starts] if params[:starts]
		keyword = params[:keyword].downcase if params[:keyword]
		expires_after_today = Date.today
		@promo_codes = []
		@promo_codes = PromoCode.where(approved: true).where("promo_codes.expires >= '#{today}' or promo_codes.expires is null").joins(:store).select("promo_codes.title","promo_codes.description","promo_codes.link as url","promo_codes.starts as startDate","promo_codes.expires as endDate","stores.viglink_id as merchantId","promo_codes.code as promocode").where(approved: true).where("promo_codes.expires >= '#{expires_after_today}' and viglink_id is not null").limit(3000)
		if keyword
			@promo_codes = PromoCode.where(approved: true).where("lower(promo_codes.title) like ? or lower(promo_codes.description) like ?", "%#{keyword}%", "%#{keyword}%").where("promo_codes.created_at >= '#{today}'").joins(:store).select("stores.viglink_id, stores.viglink_name, stores.viglink_group_id, promo_codes.id","stores.name","stores.domain","stores.id as store_id","promo_codes.title","promo_codes.description","promo_codes.starts","promo_codes.expires","promo_codes.code","promo_codes.link","promo_codes.free_shipping").where(approved: true).where("promo_codes.created_at >= '#{today}'").limit(10000)
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

	def coupons
		today = Date.today
		today = params[:starts] if params[:starts]
		keyword = params[:keyword].downcase if params[:keyword]
		@promo_codes = []
		@promo_codes = PromoCode.where(approved: true).where("promo_codes.created_at >= '#{today}'").joins(:store).select("stores.viglink_id, stores.viglink_name, stores.viglink_group_id,promo_codes.id","stores.name","stores.domain","stores.id as store_id","promo_codes.title","promo_codes.description","promo_codes.starts","promo_codes.expires","promo_codes.code","promo_codes.link","promo_codes.free_shipping").where(approved: true).where("promo_codes.created_at >= '#{today}'").limit(10000)
		if keyword
			@promo_codes = PromoCode.where(approved: true).where("lower(promo_codes.title) like ? or lower(promo_codes.description) like ?", "%#{keyword}%", "%#{keyword}%").where("promo_codes.created_at >= '#{today}'").joins(:store).select("stores.viglink_id, stores.viglink_name, stores.viglink_group_id, promo_codes.id","stores.name","stores.domain","stores.id as store_id","promo_codes.title","promo_codes.description","promo_codes.starts","promo_codes.expires","promo_codes.code","promo_codes.link","promo_codes.free_shipping").where(approved: true).where("promo_codes.created_at >= '#{today}'").limit(10000)
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
			@featured_codes = @store.promo_codes.select("id","title","description","starts","expires","code","link","free_shipping").where(approved: true).where("expires >= '#{today}' or expires is null").where("order_id < 0").order("order_id ASC")
			@non_featured_promo_codes = @store.promo_codes.select("id","title","description","starts","expires","code","link","free_shipping").where(approved: true).where("expires >= '#{today}' or expires is null").where("order_id > 0").order("order_id DESC")
			# @promo_codes = @store.promo_codes.select("id","title","description","starts","expires","code","link","free_shipping").where(approved: true).where("expires >= '#{today}' or expires is null").order("created_at DESC").limit(100)
			p @promo_codes = @featured_codes + @non_featured_promo_codes
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