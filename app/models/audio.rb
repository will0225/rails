# == Schema Information
#
# Table name: audios
#
#  id         :bigint           not null, primary key
#  duration   :integer
#  file       :string
#  type       :integer
#  waveform   :json
#  created_at :datetime         not null
#  updated_at :datetime         not null
#  song_id    :bigint
#
# Indexes
#
#  index_audios_on_song_id  (song_id)
#
# Foreign Keys
#
#  fk_rails_...  (song_id => songs.id)
#

class Audio < ApplicationRecord
  self.inheritance_column = nil

  belongs_to :song, optional: true

  after_commit :set_duration, on: [:create, :update]
  after_save :set_waveform, on: :create
  after_save :set_waveform, if: :file_dirty?, on: :update

  mount_uploader :file, AudioUploader

  private

  def set_duration
    Audio::SetDuration.call(self)
  end

  def set_waveform
    waveform = JsonWaveform.generate(
      File.join(Dir.pwd, 'public', file.wav.url),
      samples: 200,
      method: :rms,
      amplitude: 70
    )
    update_column(:waveform, waveform)
  end

  def file_dirty?
    file.cached?.present?
  end
end
