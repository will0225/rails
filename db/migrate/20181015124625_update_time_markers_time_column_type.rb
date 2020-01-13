class UpdateTimeMarkersTimeColumnType < ActiveRecord::Migration[5.2]
  def self.up
    change_column :time_markers, :time, :decimal, precision: 7, scale: 1
  end

  def self.down
    change_column :time_markers, :time, :integer
  end
end
