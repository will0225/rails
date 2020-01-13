# == Schema Information
#
# Table name: participants
#
#  id                      :bigint           not null, primary key
#  contribution_percentage :float
#  role                    :integer          not null
#  created_at              :datetime         not null
#  updated_at              :datetime         not null
#  artist_id               :bigint
#  song_id                 :bigint
#
# Indexes
#
#  index_participants_on_artist_id  (artist_id)
#  index_participants_on_song_id    (song_id)
#
# Foreign Keys
#
#  fk_rails_...  (artist_id => artists.id)
#  fk_rails_...  (song_id => songs.id)
#

class Participant < ApplicationRecord
  enum role: [:performer, :producer, :songwriter, :additional_musician, :publisher]

  belongs_to :artist
  belongs_to :song, optional: true

  validates :role, presence: true
  validates :contribution_percentage, presence: true, unless: :without_contribution?

  def without_contribution?
    is_a? ParticipantWithoutContribution
  end

  def contributor?
    contribution_percentage.present? && contribution_percentage.positive?
  end
end
