class PromoCodesController < ApplicationController

require 'uri'
	
	def index
		@promo_codes = PromoCode.where(approved: true)
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
		@stores = Store.order("name ASC")
		@store = Store.find_by_id(params["store"]) if params["store"]
		@category_promo_code = CategoryPromoCode.new
	end

	def create
		@subscriber = Subscriber.new
		@categories = Category.order('name ASC')
		@top_stores = Store.where(top_store: true).limit(12)
		@promo_code = PromoCode.new(promo_code_params)

		respond_to do |format|
			if is_admin?
				if @promo_code.save && params["promo_code"]["category_ids"]
					if params["promo_code"]["category_ids"]
						params["promo_code"]["category_ids"].each do |category_id|
			    	CategoryPromoCode.create(promo_code_id: @promo_code.id, category_id: category_id)
				    end
					end
					format.html { redirect_to store_path(@promo_code.store) and return}
					format.js { p 'code was successfully created.' }
				elsif @promo_code.save
					format.html { redirect_to store_path(@promo_code.store) and return}
					format.js { p 'code was successfully created.' }
				else
					format.html { redirect_to new_promo_code_path(@promo_code) and return}
					format.js { p 'code was NOT successfully created.' }
					
				end
			else
				p verify_recaptcha
				if verify_recaptcha == true && @promo_code.save
					format.js { p 'code was successfully created.' }
				else
					render :status => 400
				end
			end
		end
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
		@stores = Store.order("name ASC")
		@category_promo_code = CategoryPromoCode.new
	end

	def update
		promo_code = PromoCode.find(params[:id])
    promo_code.update!(promo_code_params)
    if params["promo_code"]["category_ids"]
	    params["promo_code"]["category_ids"].each do |category_id|
	    	CategoryPromoCode.create(promo_code_id: promo_code.id, category_id: category_id)
	    end
	  end
    redirect_to store_path(promo_code.store)
	end

	def destroy
		authenticate_admin!
		@promo_code = PromoCode.find(params[:id])
		store = @promo_code.store
		@promo_code.destroy
		redirect_to store_path(store)
	end

	def newest
		@subscriber = Subscriber.new
		@categories = Category.order('name ASC')
		@top_stores = Store.where(top_store: true).limit(12)
		@promo_codes = PromoCode.where(approved: true).order('created_at DESC').limit(50)
	end

	private
  def promo_code_params
    params.require(:promo_code).permit(:title,:description, :code, :store_id, { :category_ids => [] }, :starts, :expires, :link, :homepage, :free_shipping, :user_submit, :approved, :expiration_date)
  end

  def get_pepperjam_promotions
  	PromoCode.get_pepperjam_promotions
  end
  
  def get_linkshare_promotions
  	PromoCode.get_linkshare_promotions
  end	
  
  def get_cj_promotions
  	PromoCode.get_cj_promotions
  end	
end