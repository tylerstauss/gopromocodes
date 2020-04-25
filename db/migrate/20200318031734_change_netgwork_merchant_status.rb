class ChangeNetgworkMerchantStatus < ActiveRecord::Migration[5.2]
  def change
  	remove_column :network_merchants, :status
  	remove_column :network_merchants, :joined
  	add_column :network_merchants, :active, :boolean
  	add_column :network_merchants, :joined, :boolean
  end
end
