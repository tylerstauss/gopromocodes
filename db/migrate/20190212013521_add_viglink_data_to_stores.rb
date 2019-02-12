class AddViglinkDataToStores < ActiveRecord::Migration[5.0]
  def change
  	add_column :stores, :viglink_id, :integer
  	add_column :stores, :viglink_group_id, :integer
  	add_column :stores, :viglink_name, :string
  end
end
