class AddUserSubmitToPromoCodes < ActiveRecord::Migration[5.0]
  def change
  	add_column :promo_codes, :user_submit, :boolean
  end
end
