namespace :oneoff do
  desc "TODO"
  task populate_domain: :environment do
  	stores = Store.all
  	stores.each do |store|
  		domain = URI.parse(store.url).host
  		store.domain = domain.gsub("www.","")
  		store.save
  	end
  end

end
