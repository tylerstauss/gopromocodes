class AddOldSlugToStores < ActiveRecord::Migration[5.0]
  def change
  	add_column :stores, :old_slug, :string
  end
end
