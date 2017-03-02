class CategoryPromoCode < ActiveRecord::Base
	belongs_to :promo_code
	belongs_to :category
	validates :promo_code_id, uniqueness: { scope: :category_id,
    message: "a promo code can only be in a category once." }
end