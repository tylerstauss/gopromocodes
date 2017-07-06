class StaticController < ApplicationController
	
	def index
		@subscriber = Subscriber.new
		@promo_codes = PromoCode.where(homepage: true, approved: true)
		@categories = Category.order('name ASC')
		@top_stores = Store.where(top_store: true).limit(12)
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
				redirect_to("http://redirect.viglink.com?key=76ca2df55a3062ee24f47c4456dc8a75&type=CO&u=#{CGI::escape(@all_offers.first[:url])}")
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
			['microwave', 10]
		]
		keyword = keywords.sample
		keyword = keyword[0]
		cpc = keyword[1]
		cpc = params["cpc"]
		if keyword && cpc
			url = "https://mysterious-spire-38481.herokuapp.com/offers-api.json?keyword=#{keyword}&cpc=#{cpc}&format=json"
			response = HTTParty.get(url)
			@all_offers = JSON.parse(response.body)
			p @all_offers.count
			@offer = @all_offers.sample
			p @offer
			@viglink_redirect = "http://redirect.viglink.com?key=76ca2df55a3062ee24f47c4456dc8a75"
			@redirect_url = CGI::escape(@offer['url'])
			@cuid = @offer['cpc']
			redirect_to("http://redirect.viglink.com?key=76ca2df55a3062ee24f47c4456dc8a75&type=CO&cuid=#{@offer['cpc']}&u=#{CGI::escape(@offer['url'])}")
		elsif keyword
			p url = "https://mysterious-spire-38481.herokuapp.com/offers-api.json?keyword=#{keyword}&format=json"
			response = HTTParty.get(url)
			@all_offers = JSON.parse(response.body)
			p @all_offers
			p @all_offers.count
			p '$' * 50
		else
			p "hello"
		end
	end

	def about
		@subscriber = Subscriber.new
		@categories = Category.order('name ASC')
		@top_stores = Store.where(top_store: true).limit(12)
	end

	def search
		@subscriber = Subscriber.new
		@search_term = params[:search_term]
		p @search_term
		@stores = Store.where("name like ? or description like ? or slug like ? or search_terms like ?", "%"+@search_term+"%", "%"+@search_term+"%", "%"+@search_term+"%", "%"+@search_term+"%")
		@promo_codes = PromoCode.where("title like ? or description like ?", "%"+@search_term+"%", "%"+@search_term+"%")
		@categories = Category.order('name ASC')
		@top_stores = Store.where(top_store: true).limit(12)
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