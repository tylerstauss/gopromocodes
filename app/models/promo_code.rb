class PromoCode < ActiveRecord::Base
	belongs_to :store
	has_many :category_promo_codes, :dependent => :destroy
	has_many :categories, through: :category_promo_codes
	validates_uniqueness_of :title, scope: [:code, :description, :store_id]
	validates_presence_of :title, :description, :link, :store_id

def self.get_pepperjam_promotions
	today = Date.today
	puts 'Updating pepperjam Promotions'
	url = "http://api.pepperjamnetwork.com/20120402/publisher/creative/coupon?apiKey=#{Figaro.env.PEPPERJAM_KEY}&format=json&startDate=#{today}"
	p url
	response = HTTParty.get(url)
	# p response
	pages = response['meta']['pagination']['total_pages']
	p pages

	while pages > 0
		url = "http://api.pepperjamnetwork.com/20120402/publisher/creative/coupon?apiKey=#{Figaro.env.PEPPERJAM_KEY}&format=json&page=#{pages}&startDate=#{today}"
		response = HTTParty.get(url)
		# p response
		links = response['data']
		links.each do |link|
			p link
			if link['end_date'] == '0000-00-00 00:00:00' || link['end_date'] > Time.now || link['end_date'] == nil || link['end_date'] == 'ongoing'
				p link['end_date']
				network = 'pepperjam'
				title = link['name']
				link_destination = FinalRedirectUrl.final_redirect_url(link['code'])
				code = link['coupon']
				store_name = link["program_name"]
				start_date = link['start_date']
				end_date = link['end_date'].to_i unless link['end_date'] == nil
				end_date = 'ongoing' if link['end_date'] == nil || link['end_date'] == "0000-00-00 00:00:00"
				description = link['description'].to_s
				pepperjam_id = link['program_id']
				slug = store_name.gsub(' ', '-').gsub('.com','').gsub('.net','').gsub('.co.uk','').downcase
				if description.downcase.include?("off") || description.downcase.include?('free') || description.downcase.include?('%') || description.downcase.include?('$') || title.downcase.include?("off") || title.downcase.include?('free') || title.downcase.include?('%') || title.downcase.include?('$')
					begin
					p link_destination
						domain = URI.parse(link_destination).host.gsub("www.","").downcase
						p "domain: #{domain}" 
							store = Store.where(domain: domain).first
							p store
							if store
								p '$' * 10
								p store.id, store.name
								store.network = 'pepperjam' if store.network == nil or store.network == ''
								store.network_id = pepperjam_id if store.network_id == nil or store.network_id = ''
								store.save
								p PromoCode.create(store_id: store.id, title: title, code: code, description: description, link: link_destination, starts: start_date, expires: end_date) if store.active
							else
								store = Store.create(name: store_name,network: 'pepperjam', network_id: pepperjam_id, domain: domain, url: "http://#{domain}", slug: slug, top_store: false)
								p store.id, store.name
								p PromoCode.create(store_id: store.id, title: title, code: code, description: description, link: link_destination, starts: start_date, expires: end_date)
							end
					rescue
					end
				end
			end
		end
		pages = pages - 1
	end
end




def self.get_cj_promotions
	today = Time.now.strftime("%m/%d/%Y")
	p today
	puts 'Updating cj Promotions'
	headers = {'authorization' => "#{Figaro.env.CJ_KEY}"}
	url = "https://linksearch.api.cj.com/v2/link-search?website-id=5329581&advertiser-ids=joined&promotion-type=coupon&link-type=Text+Link&records-per-page=100&page-number=1&promotion-start-date=#{today}" 
	p url 
	response = HTTParty.get(url, :headers => headers)
	# p response
	total = response['cj_api']['links']['total_matched'].to_i
	# p total
	pages = (total /100.to_f).ceil
	p pages

	while pages > 0
		url = "https://linksearch.api.cj.com/v2/link-search?website-id=5329581&advertiser-ids=joined&promotion-type=coupon&link-type=Text+Link&records-per-page=100&page-number=#{pages}&promotion-start-date=#{today}"
		p url
		response = HTTParty.get(url, :headers => headers)
		# p response
		links = response['cj_api']['links']['link']
		if links.is_a?(Array)
			links.each do |link|
				p link
				if link['promotion_end_date'] != nil && link['promotion_end_date'] > Time.now
					p cj_id = link["advertiser_id"]
					p store_name = link["advertiser_name"]
					p link_destination = link['destination']  unless link['destination'].match(/doubleclick.net|mediaplex.com|7eer.net/)
					p start_date = link['promotion_start_date']
					p end_date = link['promotion_end_date'] unless link['promotion_end_date'] == nil
					p 'ongoing' if link['promotion_end_date'] == nil
					p description = link['description']
					p code = link['coupon_code']
					p title = link["link_name"]
					slug = store_name.gsub(' ', '-').gsub('.com','').gsub('.net','').gsub('.co.uk','').downcase

					if description.downcase.include?("off") || description.downcase.include?('free') || description.downcase.include?('%') || description.downcase.include?('$') || title.downcase.include?("off") || title.downcase.include?('free') || title.downcase.include?('%') || title.downcase.include?('$')
						begin
							p domain = URI.parse(link['destination']).host.gsub("www.","").downcase
							store = Store.where(domain: domain).first
							if store
								p '$' * 10
								p store.id, store.name
								store.network = 'cj' if store.network == nil or store.network == ''
								store.network_id = cj_id if store.network_id == nil or store.network_id = ''
								store.save
								PromoCode.create(store_id: store.id, title: title, code: code, description: description, link: link_destination, starts: start_date, expires: end_date)
							else
								store = Store.create(name: store_name,network: 'cj', network_id: cj_id, domain: domain, url: "http://#{domain}", slug: slug, top_store: false)
								p store.id, store.name
								p PromoCode.create(store_id: store.id, title: title, code: code, description: description, link: link_destination, starts: start_date, expires: end_date)
							end
						rescue
						end
					end
				end
			end
		end
		pages = pages - 1
	end
end

	def self.get_linkshare_promotions
		puts 'Updating linkshare Promotions'
		

		token_url = 'https://api.rakutenmarketing.com/token/'
		token_payload = "grant_type=password&username=#{Figaro.env.LINKSHARE_USERNAME}&password=#{Figaro.env.LINKSHARE_PASSWORD}&scope=2454844"
		token_header = {'authorization' => "Basic #{Figaro.env.LINKSHARE_BASIC_AUTH}"}
		response = HTTParty.post(token_url, :headers => token_header, :body => token_payload )
		token_type = response['token_type'].capitalize
		refresh_token = response['refresh_token']
		access_token = response['access_token']
		expires_in = response['expires_in']
		url = "https://api.rakutenmarketing.com/coupon/1.0"
		headers = {'authorization' => "#{token_type} #{access_token}"}
		response = HTTParty.get(url, :headers => headers)

		pages = response['couponfeed']['TotalPages'].to_i

		while pages > 0
			token_url = 'https://api.rakutenmarketing.com/token/'
			token_payload = "grant_type=password&username=#{Figaro.env.LINKSHARE_USERNAME}&password=#{Figaro.env.LINKSHARE_PASSWORD}&scope=2454844"
			token_header = {'authorization' => "Basic #{Figaro.env.LINKSHARE_BASIC_AUTH}"}
			response = HTTParty.post(token_url, :headers => token_header, :body => token_payload )
			token_type = response['token_type'].capitalize
			refresh_token = response['refresh_token']
			access_token = response['access_token']
			expires_in = response['expires_in']
			url = "https://api.rakutenmarketing.com/coupon/1.0?pagenumber=#{pages}&resultsperpage=500"
			headers = {'authorization' => "#{token_type} #{access_token}"}
			response = HTTParty.get(url, :headers => headers)
			links = response['couponfeed']['link']
			links.each do |link|
				unless link["advertisername"] == "LinkShare"
				if link['offerenddate'] == 'ongoing' || link['offerenddate'] > Time.now || link['offerenddate'] == nil 
					p link
					link_destination = FinalRedirectUrl.final_redirect_url(link["clickurl"])
					p code = link['couponcode']
					p start_date = link['offerstartdate']
					p end_date = link['offerenddate'] unless link['offerenddate'] == nil
					p end_date = 'ongoing' if link['offerenddate'] == nil
					p title = link['offerdescription'].to_s 
					store_name = link['advertisername']
					# p description = link["advertisername"] + " - " +link['couponrestriction'].to_s if link['couponrestriction']
					slug = store_name.gsub(' ', '-').gsub('.com','').gsub('.net','').gsub('.co.uk','').downcase
					description = title + " at #{link['advertisername']}."
					p description = description + " " +link['couponrestriction'].to_s if link['couponrestriction']
					p link_destination
					p linkshare_id = link['advertiserid']
					if description.downcase.include?("off") || description.downcase.include?('free') || description.downcase.include?('%') || description.downcase.include?('$') || title.downcase.include?("off") || title.downcase.include?('free') || title.downcase.include?('%') || title.downcase.include?('$')
						begin
						domain = URI.parse(link_destination).host.gsub("www.","").downcase
						p "domain: #{domain}" 
							store = Store.where(domain: domain).first
							if store
								p '$' * 10
								p store.id, store.name
								store.network = 'linkshare' if store.network == nil or store.network == ''
								store.network_id = linkshare_id if store.network_id == nil or store.network_id = ''
								store.save
								p PromoCode.create(store_id: store.id, title: title, code: code, description: description, link: link_destination, starts: start_date, expires: end_date)
							else
								store = Store.create(name: store_name,network: 'linkshare', network_id: linkshare_id, domain: domain, url: "http://#{domain}", slug: slug, top_store: false)
								p store.id, store.name
								p PromoCode.create(store_id: store.id, title: title, code: code, description: description, link: link_destination, starts: start_date, expires: end_date)
							end
						rescue
						end
					end
					end
				end
			end

			pages = pages - 1
			sleep(13) if pages > 1
		end
	end

end	