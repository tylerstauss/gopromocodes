class ChangeExpiresOnPromoCodes < ActiveRecord::Migration[5.0]
  def change
  	remove_column :promo_codes, :expirs
  	add_column :promo_codes, :expires, :date
  end
end
