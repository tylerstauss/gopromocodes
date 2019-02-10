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

  task reset_order: :environment do
    codes = PromoCode.all
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
end
