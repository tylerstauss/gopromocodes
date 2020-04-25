class AddLinkIdToNetworkMerchant < ActiveRecord::Migration[5.2]
  def change
  	  add_column :network_merchants, :link_id, :string
  end
end
