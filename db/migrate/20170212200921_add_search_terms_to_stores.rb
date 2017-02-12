class AddSearchTermsToStores < ActiveRecord::Migration[5.0]
  def change
  	add_column :stores, :search_terms, :string
  end
end
