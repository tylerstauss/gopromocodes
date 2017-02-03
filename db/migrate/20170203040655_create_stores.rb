class CreateStores < ActiveRecord::Migration[5.0]
  def change
    create_table :stores do |t|
    	t.string :name
    	t.string :url
    	t.text :description
    	t.boolean :active, :default => true
    	t.boolean :user_submit, :default => true
    	t.string :meta_keywords
    	t.string :meta_title
    	t.string :meta_description
    	t.belongs_to :category
    end
  end
end
