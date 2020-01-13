class AddWaveformToAudios < ActiveRecord::Migration[5.2]
  def change
    add_column :audios, :waveform, :json
  end
end
