class StoreBlog < ActiveRecord::Base
	belongs_to :store
	has_one_attached :image

end