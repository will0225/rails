class AddVersionAndFullSongIdToSongs < ActiveRecord::Migration[5.2]
  def change
    add_column :songs, :version, :integer, default: 0
    add_reference :songs, :song, foreign_key: true
  end
end
