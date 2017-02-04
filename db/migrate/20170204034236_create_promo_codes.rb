class CreatePromoCodes < ActiveRecord::Migration[5.0]
  def change
    create_table :promo_codes do |t|
    	t.belongs_to :store
    	t.belongs_to :category
    	t.string :title
    	t.text :description
    	t.date :expirs
    	t.date :starts
    	t.text :code
    	t.string :link
    	t.boolean :homepage, default: false
    	t.boolean :free_shipping, default: false

    	t.timestamps
    end
  end
end
