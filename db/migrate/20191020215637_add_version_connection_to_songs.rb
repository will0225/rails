class AddVersionConnectionToSongs < ActiveRecord::Migration[5.2]
  def change
    add_reference :songs, :version_connection, foreign_key: true
  end
end
