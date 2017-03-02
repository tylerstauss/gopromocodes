class RemoveForeignKeyFromPromoCode < ActiveRecord::Migration[5.0]
    def change
  	remove_column :promo_codes, :category_id
  end
end
