class AddExpirationDateToPromoCode < ActiveRecord::Migration[5.0]
  def change
  	add_column :promo_codes, :expiration_date, :string
  end
end
