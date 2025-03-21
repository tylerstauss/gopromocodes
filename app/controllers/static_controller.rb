require 'csv'
class StaticController < ApplicationController
	
	def index
		today = Date.today
		@subscriber = Subscriber.new
		p @total_discounts = PromoCode.where(approved: true).where("expires >= '#{today}' or expires is null").count
		p @total_stores = Store.count
		p @total_codes = PromoCode.where(approved: true).where("expires >= '#{today}' or expires is null").where("code is not null").count
		p @total_free_shipping = PromoCode.where(approved: true).where("expires >= '#{today}' or expires is null").where(free_shipping: true).count
		@promo_codes = PromoCode.where(homepage: true, approved: true).where("expires >= '#{today}' or expires is null")
		@categories = Category.order('name ASC')
		@top_stores = Store.where(top_store: true).limit(12)
	end

	def extension
		today = Date.today
		@promo_code_count = PromoCode.where(approved: true).where("expires >= '#{today}' or expires is null").where("code is not null").count
		@store_count = Store.count
		@subscriber = Subscriber.new
		@categories = Category.order('name ASC')
		@top_stores = Store.where(top_store: true).limit(12)
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
	end

	def coupons_by_domain_two
		today = Date.today
		@domain = params[:domain]
		@store = Store.select("name", "id", "domain", "paths", "slug").where(domain: @domain).first
		@key = params[:key]
		@data = {}
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
		@store = @store
		@data["promo_codes"] = @promo_codes
		@data["store"] = @store
		if params[:format] == 'json'
			render json: @data
		elsif params[:format] == 'csv'
			headers['Content-Disposition'] = "attachment; filename=\"promo-codes\""
		    headers['Content-Type'] ||= 'text/csv'
		else
			render json: @data
		end
	end

	def laptops
		p params
		if params['direct'] == "yes"
			p "here?"
			@keyword = params["keyword"] || "gaming laptop"
			@all_offers = []
			@url = "http://catalog.bizrate.com/services/catalog/v1/us/product?apiKey=cb889fdd39bf9f49d19e19253cef4245&publisherId=615103&placementId=1&categoryId=&keyword=#{@keyword}&offersOnly=true&biddedOnly=true&results=10&backfillResults=0&startOffers=0&resultsOffers=0&sort=ecpc_desc&minRelevancyScore=100&showRawUrl=true&format=json&callback=callback&showEcpc=true"		
			@response = HTTParty.get(@url)
			p "offers from pricegrabber"
			@shopzilla_offers = @response["offers"]["offer"]
			@shopzilla_offers.each do |shz|
				p shz
				@all_offers.push(category_id: shz["categoryId"], merchant: shz["merchantName"], price: shz["price"]["value"], discount: shz["markdownPercent"], keyword: @keyword, title: shz["title"].gsub("&", "&amp;" ), cpc: shz["estimatedCPC"]["integral"].to_f / 100, url: shz["url"]["value"], network: "SZ", img: shz["images"]["image"][-1]["value"])
			end
				@all_offers = @all_offers.sort_by { |x, y| x[:cpc]}
				@all_offers = @all_offers.reverse
				redirect_to("http://redirect.viglink.com?key=b4519aa721815a266d11aa648fe4e825&type=CO&u=#{CGI::escape(@all_offers.first[:url])}")
		else
			@subscriber = Subscriber.new
			@categories = Category.order('name ASC')
			@top_stores = Store.where(top_store: true).limit(12)
			@keyword = params["keyword"] || "gaming laptop"
			@all_offers = []
			@url = "http://catalog.bizrate.com/services/catalog/v1/us/product?apiKey=cb889fdd39bf9f49d19e19253cef4245&publisherId=615103&placementId=1&categoryId=&keyword=#{@keyword}&offersOnly=true&biddedOnly=true&results=10&backfillResults=0&startOffers=0&resultsOffers=0&sort=ecpc_desc&minRelevancyScore=100&showRawUrl=true&format=json&callback=callback&showEcpc=true"		
			@response = HTTParty.get(@url)
			p "offers from pricegrabber"
			@shopzilla_offers = @response["offers"]["offer"]
			@shopzilla_offers.each do |shz|
				p shz
				@all_offers.push(category_id: shz["categoryId"], merchant: shz["merchantName"], price: shz["price"]["value"], discount: shz["markdownPercent"], keyword: @keyword, title: shz["title"].gsub("&", "&amp;" ), cpc: shz["estimatedCPC"]["integral"].to_f / 100, url: shz["url"]["value"], network: "SZ", img: shz["images"]["image"][-1]["value"])
			end
			@all_offers = @all_offers.reject { |c| c.empty? }
		end
		
	end

	def deals
		keywords = [
			['face scrub', 10 ], 
			['dri-fit', 10 ],  
			['earrings', 10 ], 
			['laptop', 10 ],
			['dress', 10 ],
			['dining set', 20 ],
			['sports bra', 10 ],
			['headphones', 10 ],
			['sunscreen', 10 ],
			['boots', 10 ],
			['makeup', 10 ],
			['lipstick', 10 ],
			['skirt', 10 ],
			['soap', 10 ],
			['treadmill', 10 ],
			['bbq', 10 ],
			['wine', 10 ],
			['slow cooker', 10 ],
			['bikini', 10 ],
			['computer', 10 ],
			['camera', 10 ],
			['television', 10 ],
			['cellphone', 10 ],
			['clothes', 10 ],
			['dog', 10 ],
			['winter tires', 10 ],
			['strip light', 10 ],
			['dry cat food', 10 ],
			['microwave', 10]
		]
		keyword = keywords.sample
		keyword = keyword[0]
		cpc = params["cpc"]
		# set cpc = false to go through the javascript redirect method calling io bids service
		cpc = false
		if keyword && cpc
			p "here"
			url = "https://mysterious-spire-38481.herokuapp.com/offers-api.json?keyword=#{keyword}&cpc=#{cpc}&format=json"
			response = HTTParty.get(url)
			@all_offers = JSON.parse(response.body)
			@offer = @all_offers.sample
			@viglink_redirect = "http://redirect.viglink.com?key=b4519aa721815a266d11aa648fe4e825"
			@redirect_url = CGI::escape(@offer['url'])
			@cuid = @offer['cpc']
			# redirect_to("http://redirect.viglink.com?key=b4519aa721815a266d11aa648fe4e825&type=CD&cuid=#{@offer['cpc']}&u=#{CGI::escape(@offer['url'])}")
		elsif keyword
			p '$' * 50
			p keyword
			url = "http://catalog.bizrate.com/services/catalog/v1/us/product?apiKey=cb889fdd39bf9f49d19e19253cef4245&publisherId=615103&placementId=1&categoryId=&keyword=#{keyword}&offersOnly=true&biddedOnly=true&results=10&backfillResults=0&startOffers=0&resultsOffers=0&sort=ecpc_desc&minRelevancyScore=100&showRawUrl=true&format=json&callback=callback&showEcpc=true"
			# url = "http://viglink.io/bids?keywords=#{keyword}&categoryId=1"
			# p url
			headers = {Authorization: "secret a687ad9b2d71a29ec421bb941bfa709d51c7a940"}
			response = HTTParty.get(url)
			# response = HTTParty.get(url, headers: headers)
			# p response["bids"]["#{keyword}"]
			# bid = response["bids"]["#{keyword}"].sample
			# p bid["url"]
			# p bid["epc"]
			bid = response["offers"]["offer"][0]
			url = bid['url']['value']
			p url
			epc = bid["estimatedCPC"]["value"]
			p "first EPC #{epc}"
			if epc == '$0.00'
				i = 1
				while epc == '$0.00' && i < 5
					
					p i
					bid = response["offers"]["offer"][i]
					url = bid['url']['value']
					epc = bid["estimatedCPC"]["value"]
					p "new EPC #{epc}"
					i = i + 1
				end
				
			end
			@viglink_redirect = "http://redirect.viglink.com?key=76ca2df55a3062ee24f47c4456dc8a75"
			@redirect_url = CGI::escape(url)
			@cuid = "#{epc}-#{keyword}"
		else
			p "hello"
		end
	end

	def about
		@subscriber = Subscriber.new
		@categories = Category.order('name ASC')
		@top_stores = Store.where(top_store: true, active: true).limit(12)
	end

	def search
		@subscriber = Subscriber.new
		@search_term = params[:search_term]
		p @search_term
		@stores = Store.where(active: true).where("name like ? or description like ? or slug like ? or search_terms like ?", "%"+@search_term+"%", "%"+@search_term+"%", "%"+@search_term+"%", "%"+@search_term+"%")
		@promo_codes = PromoCode.where("title like ? or description like ?", "%"+@search_term+"%", "%"+@search_term+"%")
		@categories = Category.order('name ASC')
		@top_stores = Store.where(top_store: true, active: true).limit(12)
	end

	def contact
		@subscriber = Subscriber.new
		@categories = Category.order('name ASC')
		@top_stores = Store.where(top_store: true).limit(12)
	end

	def grocery
		@subscriber = Subscriber.new
		@categories = Category.order('name ASC')
		@top_stores = Store.where(top_store: true).limit(12)
	end

	def terms
		@subscriber = Subscriber.new
		@categories = Category.order('name ASC')
		@top_stores = Store.where(top_store: true).limit(12)
	end

	def articles
		@subscriber = Subscriber.new
		@categories = Category.order('name ASC')
		@top_stores = Store.where(top_store: true).limit(12)
	end

	def gardening
		@subscriber = Subscriber.new
		@categories = Category.order('name ASC')
		@top_stores = Store.where(top_store: true).limit(12)
	end

	def games
		@subscriber = Subscriber.new
		@categories = Category.order('name ASC')
		@top_stores = Store.where(top_store: true).limit(12)
	end

	def clipart
		@subscriber = Subscriber.new
		@categories = Category.order('name ASC')
		@top_stores = Store.where(top_store: true).limit(12)
	end

	def entertainment
		@subscriber = Subscriber.new
		@categories = Category.order('name ASC')
		@top_stores = Store.where(top_store: true).limit(12)
	end

	def cellphones
		@subscriber = Subscriber.new
		@categories = Category.order('name ASC')
		@top_stores = Store.where(top_store: true).limit(12)
	end

	def moneysaving
		@subscriber = Subscriber.new
		@categories = Category.order('name ASC')
		@top_stores = Store.where(top_store: true).limit(12)
	end

	def photography
		@subscriber = Subscriber.new
		@categories = Category.order('name ASC')
		@top_stores = Store.where(top_store: true).limit(12)
	end

	def keyboarding
		@subscriber = Subscriber.new
		@categories = Category.order('name ASC')
		@top_stores = Store.where(top_store: true).limit(12)
	end

	def classics
		@subscriber = Subscriber.new
		@categories = Category.order('name ASC')
		@top_stores = Store.where(top_store: true).limit(12)
	end
	
	def newyears
		@subscriber = Subscriber.new
		@categories = Category.order('name ASC')
		@top_stores = Store.where(top_store: true).limit(12)
	end

	def fairtrade
		@subscriber = Subscriber.new
		@categories = Category.order('name ASC')
		@top_stores = Store.where(top_store: true).limit(12)
	end

	def zoe_stauss
		@subscriber = Subscriber.new
		@categories = Category.order('name ASC')
		@top_stores = Store.where(top_store: true).limit(12)
	end

	def tyler_stauss
		@subscriber = Subscriber.new
		@categories = Category.order('name ASC')
		@top_stores = Store.where(top_store: true).limit(12)
	end
end