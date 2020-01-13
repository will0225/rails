# == Schema Information
#
# Table name: playlists
#
#  id         :bigint           not null, primary key
#  duration   :integer
#  image      :string
#  title      :string
#  token      :string
#  type       :string
#  created_at :datetime         not null
#  updated_at :datetime         not null
#  user_id    :bigint
#
# Indexes
#
#  index_playlists_on_user_id  (user_id)
#
# Foreign Keys
#
#  fk_rails_...  (user_id => users.id)
#

class Playlist < ApplicationRecord
  has_many :playlists_songs, -> { order(position: :asc) }, dependent: :destroy
  has_many :songs, through: :playlists_songs

  validates :title, presence: true

  mount_uploader :image, ImageUploader

  default_scope { order(position: :asc) }
end
