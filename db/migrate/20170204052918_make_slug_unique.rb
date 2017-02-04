class MakeSlugUnique < ActiveRecord::Migration[5.0]
  def change
  	remove_column :stores, :slug
		remove_column :categories, :slug
  	add_column :stores, :slug, :string, :unique => true
  	add_column :categories, :slug, :string, :unique => true
  end
end
