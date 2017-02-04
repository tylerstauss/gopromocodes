class AddSlugToStoresAndCategories < ActiveRecord::Migration[5.0]
  def change
  	add_column :stores, :slug, :string
  	add_column :categories, :slug, :string
  end
end
