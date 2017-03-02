class CategoryPromoCode < ActiveRecord::Base
	belongs_to :promo_code
	belongs_to :category
end