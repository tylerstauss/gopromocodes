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
	task get_pepperjam_promotions: :environment do
		PromoCode.get_pepperjam_promotions
	end
	task get_cj_promotions: :environment do
		PromoCode.get_cj_promotions
	end
	task get_linkshare_promotions: :environment do
		PromoCode.get_linkshare_promotions
	end	
end
