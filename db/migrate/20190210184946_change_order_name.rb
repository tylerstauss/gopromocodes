class ChangeOrderName < ActiveRecord::Migration[5.0]
def change
  	remove_column :promo_codes, :order
  	add_column :promo_codes, :order_id, :integer
  end
end
