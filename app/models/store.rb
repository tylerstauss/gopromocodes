class Store < ActiveRecord::Base
	has_many :promo_codes
  has_many :store_blogs
  has_one_attached :logo
  validates_presence_of :name, :url, :slug
  validates_uniqueness_of :name

	def self.find(input)
   input.to_i == 0 ? find_by_slug(input) : super
   p input
   p find_by_slug(input)
  end

  def to_param
   slug
  end

  def self.search(term, page)
    if term
      where('name LIKE ?', "%#{term}%").paginate(page: page, per_page: 50).order('name ASC')
    else
      paginate(page: page, per_page: 50).order('name ASC') 
    end
  end
end