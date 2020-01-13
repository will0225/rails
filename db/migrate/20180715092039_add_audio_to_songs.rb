class AddAudioToSongs < ActiveRecord::Migration[5.2]
  def change
    add_column :songs, :audio, :string
  end
end
