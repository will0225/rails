class AddDurationToPlaylists < ActiveRecord::Migration[5.2]
  def change
    add_column :playlists, :duration, :integer
  end
end
