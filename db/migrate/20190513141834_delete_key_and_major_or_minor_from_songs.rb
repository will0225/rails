class DeleteKeyAndMajorOrMinorFromSongs < ActiveRecord::Migration[5.2]
  def change
    remove_column :songs, :key
    remove_column :songs, :major_or_minor
  end
end
