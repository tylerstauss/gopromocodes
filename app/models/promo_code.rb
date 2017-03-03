class PromoCode < ActiveRecord::Base
	belongs_to :store
	has_many :category_promo_codes, :dependent => :destroy
	has_many :categories, through: :category_promo_codes
	validates_uniqueness_of :title, scope: [:code, :description, :store_id]
	validates_presence_of :title, :code, :description, :link, :store_id
end