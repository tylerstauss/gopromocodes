class CreateCategories < ActiveRecord::Migration[5.0]
  def change
    create_table :categories do |t|
    	t.string :name
    	t.text :description
    	t.string :meta_keywords
    	t.string :meta_title
    	t.string :meta_description
    end
  end
end
