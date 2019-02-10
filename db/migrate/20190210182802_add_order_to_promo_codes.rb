class AddOrderToPromoCodes < ActiveRecord::Migration[5.0]
  def change
  	add_column :promo_codes, :order, :integer
  end
end
