class UpdateUserSubmitToPromoCodes < ActiveRecord::Migration[5.0]
  def change
  	remove_column :promo_codes, :user_submit
  	add_column :promo_codes, :user_submit, :boolean, default: false
  end
end
