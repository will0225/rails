class AddMajorOrMinorToSong < ActiveRecord::Migration[5.2]
  def change
    add_column :songs, :major_or_minor, :integer
  end
end
