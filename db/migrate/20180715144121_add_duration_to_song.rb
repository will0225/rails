class AddDurationToSong < ActiveRecord::Migration[5.2]
  def change
    add_column :songs, :duration, :integer, null: false, default: 0
  end
end
