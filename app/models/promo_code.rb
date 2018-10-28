class PromoCode < ActiveRecord::Base
	belongs_to :store
	has_many :category_promo_codes, :dependent => :destroy
	has_many :categories, through: :category_promo_codes
	validates_uniqueness_of :title, scope: [:code, :description, :store_id]
	validates_presence_of :title, :description, :link, :store_id

def self.get_pepperjam_promotions
		puts 'Updating pepperjam Promotions'
		url = "http://api.pepperjamnetwork.com/20120402/publisher/creative/coupon?apiKey=#{Figaro.env.PEPPERJAM_KEY}&format=json"
		# p url
		response = HTTParty.get(url)
		# p response
		pages = response['meta']['pagination']['total_pages']
		p pages

		while pages > 0
			url = "http://api.pepperjamnetwork.com/20120402/publisher/creative/coupon?apiKey=#{Figaro.env.PEPPERJAM_KEY}&format=json&page=#{pages}"
			response = HTTParty.get(url)
			# p response
			links = response['data']
			links.each do |link|
				p link
				# if link['end_date'] == '0000-00-00 00:00:00' || link['end_date'] > Time.now || link['end_date'] == nil || link['end_date'] == 'ongoing'
				# 	new_link = Promotion.where(advertiser: link['program_name'], network_id: link['program_id'], link_id: link['id']).first_or_create
				# 	new_link.network = 'pepperjam'
				# 	new_link.affiliated_link = link['code']
				# 	new_link.promo_code = link['coupon']
				# 	new_link.start_date = link['start_date']
				# 	new_link.end_date = link['end_date'].to_i unless link['end_date'] == nil
				# 	new_link.end_date = 'ongoing' if link['end_date'] == nil || link['end_date'] == '0000-00-00 00:00:00'
				# 	new_link.description = link['description'].to_s
				# 	merchant = Merchant.where('network = ? and network_id = ?', 'pepperjam', link['program_id'].to_s).first
				# 	merchant.promotions << new_link if merchant
				# 	new_link.tld = merchant.url if merchant
				# 	new_link.viglink_merchant_id = merchant.viglink_id if merchant
				# 	# p merchant.viglink_id if merchant
				# 	# p new_link.viglink_merchant_id
				# 	new_link.save
				# end
			end
			pages = pages - 1
		end
	end




def self.get_cj_promotions
	puts 'Updating cj Promotions'
	headers = {'authorization' => "#{Figaro.env.CJ_KEY}"}
	url = "https://linksearch.api.cj.com/v2/link-search?website-id=5329581&advertiser-ids=joined&promotion-type=coupon&link-type=Text+Link&records-per-page=100&page-number=1"  
	response = HTTParty.get(url, :headers => headers)
	# p response
	total = response['cj_api']['links']['total_matched'].to_i
	# p total
	pages = (total /100.to_f).ceil
	# p pages

	while pages > 0
		url = "https://linksearch.api.cj.com/v2/link-search?website-id=5329581&advertiser-ids=joined&promotion-type=coupon&link-type=Text+Link&records-per-page=100&page-number=#{pages}"
		response = HTTParty.get(url, :headers => headers)
		# p response
		links = response['cj_api']['links']['link']
		if links.is_a?(Array)
			links.each do |link|
				p link
				if link['promotion_end_date'] != nil && link['promotion_end_date'] > Time.now
					p cj_id = link["advertiser_id"]
					p merchant_name = link["advertiser_name"]
					p link_destination = link['destination']  unless link['destination'].match(/doubleclick.net|mediaplex.com|7eer.net/)
					p start_date = link['promotion_start_date']
					p end_date = link['promotion_end_date'] unless link['promotion_end_date'] == nil
					p 'ongoing' if link['promotion_end_date'] == nil
					p description = link['description']
					p code = link['coupon_code']
					p title = link["link_name"]
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
						end
					rescue
					end
				end
			end
		end
		pages = pages - 1
	end
end

	def self.get_linkshare_promotions
		puts 'Updating linkshare Promotions'
		sleep(20)

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
				if link['offerenddate'] == 'ongoing' || link['offerenddate'] > Time.now || link['offerenddate'] == nil 
					p link
					# new_link = Promotion.where(advertiser: link['advertisername'], network_id: link['advertiserid'], affiliated_link: link['clickurl']).first_or_create
					# new_link.network = 'linkshare'
					# new_link.promo_code = link['couponcode']
					# new_link.start_date = link['offerstartdate']
					# new_link.end_date = link['offerenddate'] unless link['offerenddate'] == nil
					# new_link.end_date = 'ongoing' if link['offerenddate'] == nil
					# new_link.description = link['offerdescription'].to_s + link['couponrestriction'].to_s
					# merchant = Merchant.where('network = ? and network_id = ?', 'linkshare', link['advertiserid'].to_s).first
					# merchant.promotions << new_link if merchant
					# new_link.viglink_merchant_id = merchant.viglink_id if merchant
					# # p merchant.viglink_id if merchant
					# # p new_link.viglink_merchant_id
					# new_link.save
				end
			end

			pages = pages - 1
			sleep(13) if pages > 1
		end
	end

end	