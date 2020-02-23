class AddPathsToStores < ActiveRecord::Migration[5.2]
  def change
  	add_column :stores, :paths, :string
  end
end
