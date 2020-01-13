class RenameNameToTitleInPlaylists < ActiveRecord::Migration[5.2]
  def change
    rename_column :playlists, :name, :title
  end
end
