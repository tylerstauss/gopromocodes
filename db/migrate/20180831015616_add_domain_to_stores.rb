class AddDomainToStores < ActiveRecord::Migration[5.0]
  def change
  	add_column :stores, :domain, :string
  end
end
