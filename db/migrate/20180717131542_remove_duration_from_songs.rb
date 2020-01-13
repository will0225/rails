class RemoveDurationFromSongs < ActiveRecord::Migration[5.2]
  def change
    remove_column :songs, :duration, :integer
  end
end
