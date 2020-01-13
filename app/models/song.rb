# == Schema Information
#
# Table name: songs
#
#  id                    :bigint           not null, primary key
#  bpm                   :integer          not null
#  hot                   :boolean          default(FALSE)
#  image                 :string
#  title                 :string           not null
#  version               :integer          default("full")
#  created_at            :datetime         not null
#  updated_at            :datetime         not null
#  song_id               :bigint
#  version_connection_id :bigint
#
# Indexes
#
#  index_songs_on_bpm                    (bpm)
#  index_songs_on_song_id                (song_id)
#  index_songs_on_version_connection_id  (version_connection_id)
#
# Foreign Keys
#
#  fk_rails_...  (song_id => songs.id)
#  fk_rails_...  (version_connection_id => version_connections.id)
#

require 'taglib'

class Song < ApplicationRecord
  include Taggable

  MIN_TEMPO = 50
  MAX_TEMPO = 200
  enum version: [:full, :acapella, :instrumental]

  belongs_to :version_connection, class_name: 'VersionConnection', optional: true
  has_many :time_markers, dependent: :destroy
  has_many :versions, ->(record) { where.not(id: record.id) }, class_name: 'Song', through: :version_connection, source: :songs

  has_and_belongs_to_many :playlists, dependent: :destroy

  has_many :moods,       source: :tag, through: :taggings, class_name: 'Tags::Mood', dependent: :destroy
  has_many :genres,      source: :tag, through: :taggings, class_name: 'Tags::Genre', dependent: :destroy
  has_many :instruments, source: :tag, through: :taggings, class_name: 'Tags::Instrument', dependent: :destroy

  has_one :audio, class_name: 'Audio', required: true, dependent: :destroy

  has_many :participants, dependent: :destroy
  has_many :additional_musicians, -> { additional_musician }, class_name: 'ParticipantWithoutContribution', dependent: :destroy
  has_many :performers,           -> { performer },           class_name: 'ParticipantWithoutContribution', dependent: :destroy
  has_many :producers,            -> { producer },            class_name: 'ParticipantWithoutContribution', dependent: :destroy
  has_many :songwriters,          -> { songwriter },          class_name: 'Participant', dependent: :destroy
  has_many :publishers,           -> { publisher },           class_name: 'Participant', dependent: :destroy

  accepts_nested_attributes_for :audio,                allow_destroy: true
  accepts_nested_attributes_for :producers,            allow_destroy: true
  accepts_nested_attributes_for :publishers,           allow_destroy: true
  accepts_nested_attributes_for :performers,           allow_destroy: true
  accepts_nested_attributes_for :songwriters,          allow_destroy: true
  accepts_nested_attributes_for :time_markers,         allow_destroy: true
  accepts_nested_attributes_for :additional_musicians, allow_destroy: true

  validate  :contribution_percentage
  validates :title, :bpm, :version, presence: true
  validates :bpm, numericality: { only_integer: true, greater_than: MIN_TEMPO - 1, less_than: MAX_TEMPO + 1 }

  mount_uploader :image, ImageUploader

  default_scope { order(position: :asc) }

  scope :hot,               -> { where(hot: true) }
  scope :with_title,        -> (title) { where("LOWER(title) LIKE ?", "%#{title.downcase}%") if title }
  scope :with_taggings,     -> (tags_ids) { joins(:taggings).where(taggings: {tag_id: tags_ids}) if tags_ids }
  scope :with_participants, -> (artist_id) { joins(:participants).where(participants: { artist_id: artist_id }) if artist_id }
  scope :with_versions,     -> (versions) do
    if versions.present?
      left_outer_joins(:audio).
      where(version: (versions & Song.versions.keys).map(&:to_sym)).
      distinct
    end
  end
  scope :with_bpm,          -> (params) do
    where(
      bpm: (
        (params[:min_tempo].try(:to_d) || MIN_TEMPO)..(params[:max_tempo].try(:to_d) || MAX_TEMPO)
        )
      )
  end
  scope :search,            -> (params) do
    includes(participants: {artist: {participants: :song}}).
    with_bpm(params).
    with_title(params[:title]).
    with_taggings(params[:tags_ids]).
    with_participants(params[:artist_id]).
    with_versions(params[:versions]).
    distinct
  end
  scope :with_includings, -> { includes(:audio, :time_markers, :genres, :moods, :instruments, taggings: :tag) }

  def contribution_percentage
    [:songwriters, :publishers].each do |participants|
      percentage_sum = send(participants).map(&:contribution_percentage).compact.reduce(&:+)
      if percentage_sum.present? && percentage_sum.to_i != 50
        errors.add(participants, 'contribution_percentage sum should be equal to 50%')
      end
    end
  end

  def related_versions(requesting_version = '')
    if requesting_version.present?
      versions.to_a.delete_if{ |song| song.version == requesting_version }.push(self)
    else
      versions
    end
  end
end
