class AddApprovedToPromoCodes < ActiveRecord::Migration[5.0]
  def change
  	add_column :promo_codes, :approved, :boolean, default: true
  end
end
