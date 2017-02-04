class AddIndexStoresAndCategories < ActiveRecord::Migration[5.0]
  def change
  	add_index :stores, [:name, :slug], :unique => true
  	add_index :categories, [:name, :slug], :unique => true
  end
end
