# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)
require 'csv'

p "seeding categories"
csv_text = File.read(Rails.root.join('lib', 'seeds', 'dc_categories.csv'))
csv = CSV.parse(csv_text, :headers => false, :encoding => 'ISO-8859-1')
csv.each do |row|
  Category.create(name: row[1], description: row[6], meta_title: row[9], meta_description: row[8], meta_keywords: row[7], slug: row[3].downcase)
end

p "seeding stores"
csv_text = File.read(Rails.root.join('lib', 'seeds', 'dc_stores.csv'))
csv = CSV.parse(csv_text.gsub('/\r/', ''), :headers => false, :encoding => 'ISO-8859-1')
csv.each do |row|
	user_submit = true if row[6] == 0
	user_submit = false if row[6] == 1
	if row[8] == 'yes'
		top_store = true 
	else
		top_store = false
	end
  Store.create(name: row[0], url: row[1], description: row[2], meta_title: row[5], meta_description: row[4], meta_keywords: row[3], slug: row[7].downcase, old_slug: row[7], user_submit: user_submit, top_store: top_store, search_terms: row[9] )
end


p 'seeding codes'
csv_text = File.read(Rails.root.join('lib', 'seeds', 'dc_deals.csv'))
csv = CSV.parse(csv_text, :headers => false, :encoding => 'ISO-8859-1')
csv.each do |row|
	store = Store.find(row[-1].downcase)
  promocode = PromoCode.create(title: row[0], description: row[3], code: row[2], store_id: store.id, link: row[1])
  if row[9] != 'NULL'
		category = Category.find(row[9].downcase)
		if category
			promocode.category_id = category.id
			promocode.save
		end
	end
end