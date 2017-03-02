class PromoCode < ActiveRecord::Base
	belongs_to :store
	has_many :category_promo_codes
	has_many :categories, through: :category_promo_codes
end