class CreateCategoryPromoCodes < ActiveRecord::Migration[5.0]
  def change
    create_table :category_promo_codes do |t|
    	t.belongs_to :promo_code
    	t.belongs_to :category
    	t.timestamps
    end
  end
end
