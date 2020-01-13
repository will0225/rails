class CreateParticipants < ActiveRecord::Migration[5.2]
  def change
    create_table :participants do |t|
      t.references :artist, foreign_key: true
      t.references :song, foreign_key: true
      t.integer :role, null: false
      t.integer :contribution_percentage

      t.timestamps
    end
  end
end
