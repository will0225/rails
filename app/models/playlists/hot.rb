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

class Playlists::Hot < Playlist
end
