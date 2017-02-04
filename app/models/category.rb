class Category < ActiveRecord::Base
	has_many :stores
	has_many :promo_codes
end