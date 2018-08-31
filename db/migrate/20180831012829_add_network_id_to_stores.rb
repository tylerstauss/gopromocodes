class AddNetworkIdToStores < ActiveRecord::Migration[5.0]
   def change
  	add_column :stores, :network_id, :string
  end
end
