class CreateTimeMarkers < ActiveRecord::Migration[5.2]
  def change
    create_table :time_markers do |t|
      t.string :name
      t.references :song, foreign_key: true
      t.integer :time

      t.timestamps
    end
  end
end
