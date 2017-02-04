class Category < ActiveRecord::Base
	has_many :stores
	has_many :promo_codes

	def self.find(input)
   input.to_i == 0 ? find_by_slug(input) : super
  end

  def to_param
   slug
  end
end