class CreateVersionConnections < ActiveRecord::Migration[5.2]
  def change
    create_table :version_connections do |t|
      t.string :title

      t.timestamps
    end
  end
end
