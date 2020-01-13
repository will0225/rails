class AddTokenToPlaylists < ActiveRecord::Migration[5.2]
  def change
    add_column :playlists, :token, :string, index: true
  end
end
