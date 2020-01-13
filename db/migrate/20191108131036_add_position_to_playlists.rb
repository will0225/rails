class AddPositionToPlaylists < ActiveRecord::Migration[5.2]
  def change
    add_column :playlists, :position, :integer
  end
end
