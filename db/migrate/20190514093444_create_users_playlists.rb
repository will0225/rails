class CreateUsersPlaylists < ActiveRecord::Migration[5.2]
  def change
    create_table :users_playlists do |t|
      t.belongs_to :user, index: true
      t.belongs_to :playlist, index: true
      t.timestamps
    end
  end
end
