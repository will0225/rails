class CreateSongs < ActiveRecord::Migration[5.2]
  def change
    create_table :songs do |t|
      t.string :title, null: false
      t.integer :bpm,  null: false, index: true
      t.integer :key,  index: true
      t.boolean :hot,  default: false

      t.timestamps
    end
  end
end
