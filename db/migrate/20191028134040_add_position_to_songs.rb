class AddPositionToSongs < ActiveRecord::Migration[5.2]
  def change
    add_column :songs, :position, :integer
  end
end
