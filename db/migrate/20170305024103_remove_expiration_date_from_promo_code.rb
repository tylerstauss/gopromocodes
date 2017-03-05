class RemoveExpirationDateFromPromoCode < ActiveRecord::Migration[5.0]
  def change
  	remove_column :promo_codes, :expiration_date
  end
end
