class AddImageToPlaylist < ActiveRecord::Migration[5.2]
  def change
    add_column :playlists, :image, :string
  end
end
