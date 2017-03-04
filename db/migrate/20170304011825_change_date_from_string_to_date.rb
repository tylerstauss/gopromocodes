class ChangeDateFromStringToDate < ActiveRecord::Migration[5.0]
  def change
  	add_column :store_blogs, :pub_date, :date
  end
end
