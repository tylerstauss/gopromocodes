namespace :oneoff do
  
  desc "TODO"
  task populate_domain: :environment do
  	stores = Store.all
  	stores.each do |store|
  		domain = URI.parse(store.url).host
  		store.domain = domain.gsub("www.","").downcase
  		store.save
  	end
  end

  task send_codes_to_viglink: :environment do
    today = Date.today
    promo_codes = PromoCode.where(approved: true).where("promo_codes.expires >= '#{today}' or expires is null").joins(:store).select("promo_codes.title","promo_codes.description","promo_codes.link as url","promo_codes.starts as startDate","promo_codes.expires as endDate","stores.viglink_id as merchantId","promo_codes.code as promocode").where("viglink_id is not null").limit(3000).to_json
    # p promo_codes
    HTTParty.post(
      "https://qa.viglink.io/coupons", 
      :body => promo_codes,
      :headers => {'Content-Type' => 'application/json', 'Authorization' => 'secret 344446ed9d19590b32df9f2721f222ade6fa8e03'})
  end

  task tag_free_shipping: :environment do
    codes = PromoCode.where(created_at >= Date.yesterday)
    codes.each do |code|
      if code.description.downcase.include?('shipping')
        code.free_shipping = true
        code.save
      end
    end
  end

  task reset_order: :environment do
    codes = PromoCode.where(order_id: nil)
    codes.each do |code|
      code.order_id = code.id
      code.save
    end
  end

  	task cleanup_promotions: :environment do 
  		codes = PromoCode.where(approved: true)
  		codes.each do |code|
  			if code.description.downcase.include?("off") || code.description.downcase.include?('free') || code.description.downcase.include?('%') || code.title.downcase.include?("off") || code.title.downcase.include?('free') || code.title.downcase.include?('%') || code.description.downcase.include?("$") || code.title.downcase.include?("off")
  				p 'code contains desirable info'
  			else
  				code.approved = false
  				code.save
  			end
  		end
  	end
	task get_all_promotions: :environment do
		PromoCode.get_pepperjam_promotions
		PromoCode.get_cj_promotions
		PromoCode.get_linkshare_promotions
    PromoCode.get_avantlink_promotions
  	end
	task get_pepperjam_promotions: :environment do
		PromoCode.get_pepperjam_promotions
	end
	task get_cj_promotions: :environment do
		PromoCode.get_cj_promotions
	end
	task get_linkshare_promotions: :environment do
		PromoCode.get_linkshare_promotions
	end
  task get_avantlink_promotions: :environment do
    PromoCode.get_avantlink_promotions
  end 	
  task get_shareasale_promotions: :environment do
    PromoCode.get_shareasale_promotions
  end
  task get_awin_promotions: :environment do
    PromoCode.get_awin_promotions
  end  
  task get_commission_factory_promotions: :environment do
    PromoCode.get_commission_factory_promotions
  end 
  task get_webgains_promotions: :environment do
    PromoCode.get_webgains_promotions
  end
    task get_impact_promotions: :environment do
    PromoCode.get_impact_promotions
  end 

  task get_admitad_promotions: :environment do
    PromoCode.get_admitad_promotions
  end   

  task populate_viglink_data: :environment do 
    csv_text = File.read('viglink.csv')
    csv = CSV.parse(csv_text, :headers => true)
    csv.each do |row|
      if row['network_id'] == '2'
        store = Store.where(network: 'cj', network_id: row["code"])
        if store
            store.each do |s|
            s.viglink_id = row['id']
            s.viglink_group_id = row['group_id']
            s.viglink_name = row['name']
            s.save
          end
        end
      end
      if row['network_id'] == '9'
        store = Store.where(network: 'webgains', network_id: row["code"])
        if store
            store.each do |s|
            s.viglink_id = row['id']
            s.viglink_group_id = row['group_id']
            s.viglink_name = row['name']
            s.save
          end
        end
      end
      if row['network_id'] == '6'
        store = Store.where(network: 'awin', network_id: row["code"])
        if store
            store.each do |s|
            s.viglink_id = row['id']
            s.viglink_group_id = row['group_id']
            s.viglink_name = row['name']
            s.save
          end
        end
      end
      if row['network_id'] == '57'
        store = Store.where(network: 'impact', network_id: row["code"])
        if store
            store.each do |s|
            s.viglink_id = row['id']
            s.viglink_group_id = row['group_id']
            s.viglink_name = row['name']
            s.save
          end
        end
      end
      if row['network_id'] == '28'
        store = Store.where(network: 'avantlink', network_id: row["code"])
        if store
            store.each do |s|
            s.viglink_id = row['id']
            s.viglink_group_id = row['group_id']
            s.viglink_name = row['name']
            s.save
          end
        end
      end
      if row['network_id'] == '10'
        store = Store.where(network: 'shareasale', network_id: row["code"])
        if store
            store.each do |s|
            s.viglink_id = row['id']
            s.viglink_group_id = row['group_id']
            s.viglink_name = row['name']
            s.save
          end
        end
      end
      if row['network_id'] == '132'
        store = Store.where(network: 'admitad', network_id: row["code"])
        if store
            store.each do |s|
            s.viglink_id = row['id']
            s.viglink_group_id = row['group_id']
            s.viglink_name = row['name']
            s.save
          end
        end
      end
      if row['network_id'] == '8'
        store = Store.where(network: 'pepperjam', network_id: row["code"])
        if store
            store.each do |s|
            s.viglink_id = row['id']
            s.viglink_group_id = row['group_id']
            s.viglink_name = row['name']
            s.save
          end
        end
      end
      if row['network_id'] == '3'
        store = Store.where(network: 'linkshare', network_id: row["code"])
        if store
            store.each do |s|
            s.viglink_id = row['id']
            s.viglink_group_id = row['group_id']
            s.viglink_name = row['name']
            s.save
          end
        end
      end
      if row['network_id'] == '77'
        store = Store.where(network: 'commissionfactory', network_id: row["code"])
        if store
            store.each do |s|
            s.viglink_id = row['id']
            s.viglink_group_id = row['group_id']
            s.viglink_name = row['name']
            s.save
          end
        end
      end
    end
  end


end
