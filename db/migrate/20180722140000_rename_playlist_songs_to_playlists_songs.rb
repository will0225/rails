class RenamePlaylistSongsToPlaylistsSongs < ActiveRecord::Migration[5.2]
  def change
    rename_table :playlist_songs, :playlists_songs
  end
end
