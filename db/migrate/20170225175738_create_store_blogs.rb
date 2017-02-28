class CreateStoreBlogs < ActiveRecord::Migration[5.0]
  def change
    create_table :store_blogs do |t|
    	t.belongs_to :store
    	t.string :publish_date
    	t.text :post
    	t.string :author, default: 'Tyler'
    	t.timestamps
    end
  end
end
