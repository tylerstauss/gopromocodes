class AddTopStoreToStores < ActiveRecord::Migration[5.0]
  def change
  	add_column :stores, :top_store, :boolean
  end
end
