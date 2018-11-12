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
					begin
	    				Timeout.timeout(3) do
							link_destination = FinalRedirectUrl.final_redirect_url(link['code'])
						end
						code = link['coupon']
						store_name = link["program_name"]
						start_date = link['start_date']
						end_date = link['end_date'].to_i unless link['end_date'] == nil
						end_date = 'ongoing' if link['end_date'] == nil || link['end_date'] == "0000-00-00 00:00:00"
						description = link['description'].to_s
						pepperjam_id = link['program_id']
						slug = store_name.gsub(' ', '-').gsub('.com','').gsub('.net','').gsub('.','-').gsub('.co.uk','').downcase
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
					rescue
						next
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
						slug = store_name.gsub(' ', '-').gsub('.com','').gsub('.net','').gsub('.','-').gsub('.co.uk','').downcase

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
		# url = "https://api.rakutenmarketing.com/coupon/1.0?promocat=1"
		url = "https://api.rakutenmarketing.com/coupon/1.0"
		p url
		headers = {'authorization' => "#{token_type} #{access_token}"}
		response = HTTParty.get(url, :headers => headers)
		# response["couponfeed"]["network"].each do |network|
		# 	p network
		# end
		pages = response['couponfeed']['TotalPages'].to_i
		p pages

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
						begin
							link_destination = FinalRedirectUrl.final_redirect_url(link["clickurl"])
							p code = link['couponcode']
							p start_date = link['offerstartdate']
							p end_date = link['offerenddate'] unless link['offerenddate'] == nil
							p end_date = 'ongoing' if link['offerenddate'] == nil
							p title = link['offerdescription'].to_s 
							store_name = link['advertisername']
							# p description = link["advertisername"] + " - " +link['couponrestriction'].to_s if link['couponrestriction']
							slug = store_name.gsub(' ', '-').gsub('.com','').gsub('.net','').gsub('.','-').gsub('.co.uk','').downcase
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
						rescue
							next
						end
					end
				end
			end
			pages = pages - 1
			p pages
			sleep(13) if pages > 1
		end
	end

	def self.get_avantlink_promotions
		puts 'Updating Avantlink Promotions'
		url = "http://www.avantlink.com/api.php?affiliate_id=41227&module=AdSearch&output=xml&website_id=55963&ad_type=text&coupons_only=1"
		response = HTTParty.get(url)
		links = response['NewDataSet']['Table1']
		links.each do |link|
			if link['Ad_Expiration_Date'] == '' || link['Ad_Expiration_Date'] == nil || link['Ad_Expiration_Date'] == 'ongoing' || link['Ad_Expiration_Date'] > Time.now 
				p link
				store_name = link["Merchant_Name"]
				avantlink_id = link["Merchant_Id"]
				network = 'avantlink'
				affiliated_link = link['Ad_Url']
				begin
					Timeout.timeout(3) do
						link_destination = FinalRedirectUrl.final_redirect_url(affiliated_link)
					end
					title = link["Ad_Title"]
					start_date = link['Ad_Start_Date']
					end_date = link['Ad_Expiration_Date'] unless link['Ad_Expiration_Date'] == nil
					end_date = 'ongoing' if link['Ad_Expiration_Date'] == nil
					description = link['Ad_Content']
					code = link['Coupon_Code']
					slug = store_name.gsub(' ', '-').gsub('.com','').gsub('.net','').gsub('.','-').gsub('.co.uk','').downcase

					if description.downcase.include?("off") || description.downcase.include?('free') || description.downcase.include?('%') || description.downcase.include?('$') || title.downcase.include?("off") || title.downcase.include?('free') || title.downcase.include?('%') || title.downcase.include?('$')
						begin
							domain = URI.parse(link_destination).host.gsub("www.","").downcase
							p "domain: #{domain}" 
							store = Store.where(domain: domain).first
							if store
								p '$' * 10
								p store.id, store.name
								store.network = 'avantlink' if store.network == nil or store.network == ''
								store.network_id = avantlink_id if store.network_id == nil or store.network_id = ''
								store.save
								p PromoCode.create(store_id: store.id, title: title, code: code, description: description, link: link_destination, starts: start_date, expires: end_date)
							else
								store = Store.create(name: store_name,network: 'avantlink', network_id: avantlink_id, domain: domain, url: "http://#{domain}", slug: slug, top_store: false)
								p store.id, store.name
								p PromoCode.create(store_id: store.id, title: title, code: code, description: description, link: link_destination, starts: start_date, expires: end_date)
							end
						rescue
						end
					end
				rescue
					next
				end
			end
		end
	end

	def self.get_shareasale_promotions
		puts 'Updating shareasale Promotions'
		time = Time.now.utc.to_s
		time = time.split(" ")
		date = Time.now.utc
		date = date.strftime('%a, %d %b %Y')
		date = date + time[1] + " GMT"
		last_update = Time.now.strftime("%m/%d/%Y")
		authentication = "#{Figaro.env.SHAREASALE_TOKEN}:#{date}:couponDeals:#{Figaro.env.SHAREASALE_SECRET}"
		authentication_hash = Digest::SHA256.hexdigest(authentication)
		header = {'x-ShareASale-Date' => date ,'x-ShareASale-Authentication' => authentication_hash}
		url = "https://shareasale.com/x.cfm?action=couponDeals&affiliateId=389818&token=#{Figaro.env.SHAREASALE_TOKEN}&current=1&modifiedSince=#{last_update}&version=2.3&XMLFormat=1"
		response = HTTParty.get(url, :headers => header)
		# p response
		# hash = Hash.from_xml(response.gsub("\n",""))
		# p hash
		links = response['dealcouponlistreport']['dealcouponlistreportrecord']
		# p links
		links.each do |link|
			p link
			if link['enddate'] == '' || link['enddate'] == nil || link['enddate'] == 'ongoing' || link['enddate'] > Time.now 
				network_deal_id = link['dealid']
				network = 'shareasale'
				shareasale_id = link['merchantid']
				store_name = link['merchant']
				affiliated_link = link['trackingurl']
				start_date = link['startdate']
				end_date = link['enddate'] unless link['enddate'] == nil
				end_date = 'ongoing' if link['enddate'] == nil
				description = link['description']
				description = description  + link['restrictions'] unless link['restrictions'] == nil
				title = link['title']
				code = link['couponcode']
				slug = store_name.gsub(' ', '-').gsub('.com','').gsub('.net','').gsub('.','-').gsub('.co.uk','').downcase
				if description.downcase.include?("off") || description.downcase.include?('free') || description.downcase.include?('%') || description.downcase.include?('$') || title.downcase.include?("off") || title.downcase.include?('free') || title.downcase.include?('%') || title.downcase.include?('$')
					begin
					Timeout.timeout(5) do
						link_destination = FinalRedirectUrl.final_redirect_url(affiliated_link)
						domain = URI.parse(link_destination).host.gsub("www.","").downcase
						p "domain: #{domain}" 
						store = Store.where(domain: domain).first
						if store
							p '$' * 10
							p store.id, store.name
							store.network = 'shareasale' if store.network == nil or store.network == ''
							store.network_id = shareasale_id if store.network_id == nil or store.network_id = ''
							store.save
							p PromoCode.create(store_id: store.id, title: title, code: code, description: description, link: link_destination, starts: start_date, expires: end_date)
						else
							store = Store.create(name: store_name,network: 'shareasale', network_id: shareasale_id, domain: domain, url: "http://#{domain}", slug: slug, top_store: false)
							p store.id, store.name
							p PromoCode.create(store_id: store.id, title: title, code: code, description: description, link: link_destination, starts: start_date, expires: end_date)
						end
					end
				rescue
					next
				end
				end
			end
		end
	end

	def self.get_awin_promotions
		csv = HTTParty.get('https://ui.awin.com/export-promotions/271445/d13d1b14927158f027953086e3f237d7?downloadType=csv&promotionType=&categoryIds=&regionIds=20,4,1,3&advertiserIds=&membershipStatus=&promotionStatus=active')
		csv.each do |row|
			p row
			awin_promotion_id = row[0]
			store_name = row[1]
			awin_id = row[2]
			code = row[4]
			title = row[5]
			start_date = row[6]
			end_date = row[7] unless row[7] == nil
			'ongoing' if row[7] == nil
			description = title + " at #{store_name}. #{row[10]}"
			slug = store_name.gsub(' ', '-').gsub('.com','').gsub('.net','').gsub('.','-').gsub('.co.uk','').downcase
			link_destination = row[12]
			if description.downcase.include?("off") || description.downcase.include?('free') || description.downcase.include?('%') || description.downcase.include?('$') || title.downcase.include?("off") || title.downcase.include?('free') || title.downcase.include?('%') || title.downcase.include?('$')
				begin
					p domain = URI.parse(link_destination).host.gsub("www.","").downcase
					store = Store.where(domain: domain).first
					if store
						p store.id, store.name
						store.network = 'awin' if store.network == nil or store.network == ''
						store.network_id = awin_id if store.network_id == nil or store.network_id = ''
						store.save
						PromoCode.create(store_id: store.id, title: title, code: code, description: description, link: link_destination, starts: start_date, expires: end_date)
					else
						store = Store.create(name: store_name,network: 'awin', network_id: awin_id, domain: domain, url: "http://#{domain}", slug: slug, top_store: false)
						p store.id, store.name
						p PromoCode.create(store_id: store.id, title: title, code: code, description: description, link: link_destination, starts: start_date, expires: end_date)
					end
				rescue
				end
			end
		end
	end


	def self.get_commission_factory_promotions
		puts "updating commission factory promotions"
		url = ' https://dashboard.commissionfactory.com/Affiliate/Creatives/Coupons/jvjbrpjyi7vb7N652fuD-pqvjueU6pv1heeY-oT7nP62qvy_9O7djNaNCg==/'
		response = HTTParty.get(url)
		response.each do |coupon|
			p coupon
			commissionfactory_coupon_id = coupon['Id']
			commissionfactory_id = coupon['MerchantId']
			store_name = coupon['MerchantCampaignName']
			network_id = 'commission factory'
			title = coupon['Name']
			code = coupon['Code']
			affiliated_link = coupon['TargetUrl']
			description = title + " at #{store_name}."
			description = title + " at #{store_name}. " + coupon['description'] if coupon['description']
			start_date = coupon['StartDate']
			end_date = coupon['EndDate'] unless coupon['EndDate'] == nil
			'ongoing' if coupon['EndDate'] == nil
			slug = store_name.gsub(' ', '-').gsub('.com','').gsub('.net','').gsub('.','-').gsub('.com.au','').downcase
			if description.downcase.include?("off") || description.downcase.include?('free') || description.downcase.include?('%') || description.downcase.include?('$') || title.downcase.include?("off") || title.downcase.include?('free') || title.downcase.include?('%') || title.downcase.include?('$')
				begin
					Timeout.timeout(5) do
						link_destination = FinalRedirectUrl.final_redirect_url(affiliated_link)
						domain = URI.parse(link_destination).host.gsub("www.","").downcase
						p "domain: #{domain}" 
						store = Store.where(domain: domain).first
						if store
							p '$' * 10
							p store.id, store.name
							store.network = 'commissionfactory' if store.network == nil or store.network == ''
							store.network_id = commissionfactory_id if store.network_id == nil or store.network_id = ''
							store.save
							p PromoCode.create(store_id: store.id, title: title, code: code, description: description, link: link_destination, starts: start_date, expires: end_date)
						else
							store = Store.create(name: store_name,network: 'commissionfactory', network_id: commissionfactory_id, domain: domain, url: "http://#{domain}", slug: slug, top_store: false)
							p store.id, store.name
							p PromoCode.create(store_id: store.id, title: title, code: code, description: description, link: link_destination, starts: start_date, expires: end_date)
						end
					end
				rescue
					next
				end
			end
		end
	end

	def self.get_webgains_promotions
		url = "https://www.webgains.com/2.0/vouchers?key=#{Figaro.env.WEBGAINS_KEY}&campaignId=129013"
		# url = 'http://api.webgains.com/2.0/offers?key=d6e7edff59c9584fdaa4d7a35f430107&campaignId=129013&filters={"showexpired":"false","orderby":"programName","order":"asc","filterby":"ALL_PROGRAMS"}'
		response = HTTParty.get(url)
		p response
		response.each do |coupon|
			webgains_coupon_id = coupon['id']
			webgains_id = coupon['program']['id']
			store_name = coupon['program']['name']
			network_id = 'webgains'
			title = coupon['title']
			code = coupon['Code']
			link_destination = coupon['destinationURL']['destination_url']
			description = title + " at #{store_name}."
			description = title + " at #{store_name}. " + coupon['Description'] if coupon['Description']
			start_date = coupon['startdate']
			end_date = coupon['enddate'] unless coupon['enddate'] == nil
			'ongoing' if coupon['enddate'] == nil
			slug = store_name.gsub(' ', '-').gsub('.com','').gsub('.net','').gsub('.','-').gsub('.com.au','').downcase
			if description.downcase.include?("off") || description.downcase.include?('free') || description.downcase.include?('%') || description.downcase.include?('$') || title.downcase.include?("off") || title.downcase.include?('free') || title.downcase.include?('%') || title.downcase.include?('$')
				begin
					Timeout.timeout(5) do
						domain = URI.parse(link_destination).host.gsub("www.","").downcase
						p "domain: #{domain}" 
						store = Store.where(domain: domain).first
						if store
							p '$' * 10
							p store.id, store.name
							store.network = 'webgains' if store.network == nil or store.network == ''
							store.network_id = webgains_id if store.network_id == nil or store.network_id = ''
							store.save
							p PromoCode.create(store_id: store.id, title: title, code: code, description: description, link: link_destination, starts: start_date, expires: end_date)
						else
							store = Store.create(name: store_name,network: 'webgains', network_id: webgains_id, domain: domain, url: "http://#{domain}", slug: slug, top_store: false)
							p store.id, store.name
							p PromoCode.create(store_id: store.id, title: title, code: code, description: description, link: link_destination, starts: start_date, expires: end_date)
						end
					end
				rescue
					next
				end
			end
		end
	end

end	