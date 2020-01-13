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

class Playlists::Personal < Playlist
  belongs_to :user
  has_many :users_playlists, dependent: :destroy
  has_many :listeners, through: :users_playlists, source: :user, dependent: :destroy

  before_create :generate_token

  private

  def generate_token
    self.token = Digest::SHA1.hexdigest([Time.now, rand].join)[0..6]
  end
end
