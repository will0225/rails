class CreatePlaylistSongs < ActiveRecord::Migration[5.2]
  def change
    create_table :playlist_songs do |t|
      t.belongs_to :song, foreign_key: true
      t.belongs_to :playlist, foreign_key: true
      t.integer :position

      t.timestamps
    end
  end
end
