class AddAudiosVersionsToSongs < ActiveRecord::Migration[5.2]
  def change
    remove_column :songs, :audio, :string
  end
end
