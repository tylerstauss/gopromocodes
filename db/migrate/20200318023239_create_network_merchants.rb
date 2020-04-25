class CreateNetworkMerchants < ActiveRecord::Migration[5.2]
  def change
    create_table :network_merchants do |t|
    	t.string :network
    	t.string :website_id
    	t.string :name
    	t.string :network_id
    	t.string :status
    	t.string :joined
    	t.string :url
    	t.string :domain
    end
  end
end
