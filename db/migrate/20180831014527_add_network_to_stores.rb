class AddNetworkToStores < ActiveRecord::Migration[5.0]
   def change
  	add_column :stores, :network, :string
  end
end
