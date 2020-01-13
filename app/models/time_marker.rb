# == Schema Information
#
# Table name: time_markers
#
#  id         :bigint           not null, primary key
#  name       :string
#  time       :decimal(7, 1)
#  created_at :datetime         not null
#  updated_at :datetime         not null
#  song_id    :bigint
#
# Indexes
#
#  index_time_markers_on_song_id  (song_id)
#
# Foreign Keys
#
#  fk_rails_...  (song_id => songs.id)
#

class TimeMarker < ApplicationRecord
  belongs_to :song
end
