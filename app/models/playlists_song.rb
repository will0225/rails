# == Schema Information
#
# Table name: playlists_songs
#
#  id          :bigint           not null, primary key
#  position    :integer
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#  playlist_id :bigint
#  song_id     :bigint
#
# Indexes
#
#  index_playlists_songs_on_playlist_id  (playlist_id)
#  index_playlists_songs_on_song_id      (song_id)
#
# Foreign Keys
#
#  fk_rails_...  (playlist_id => playlists.id)
#  fk_rails_...  (song_id => songs.id)
#

class PlaylistsSong < ApplicationRecord
  belongs_to :song, optional: true
  belongs_to :playlist, optional: true

  validates :song_id, uniqueness: { scope: :playlist_id }

  acts_as_list scope: :playlist

  after_create :update_playlist_duration

  private

  def update_playlist_duration
    playlist.increment!(:duration, song.audio.duration) if song.audio.present?
  end
end
