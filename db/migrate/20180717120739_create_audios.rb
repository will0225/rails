class CreateAudios < ActiveRecord::Migration[5.2]
  def change
    create_table :audios do |t|
      t.belongs_to :song, foreign_key: true
      t.integer :type
      t.integer :duration
      t.string :file

      t.timestamps
    end
  end
end
