class ChangePercentageType < ActiveRecord::Migration[5.2]
  def change
    change_column :participants, :contribution_percentage, :float
  end
end
