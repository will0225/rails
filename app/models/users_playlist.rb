# == Schema Information
#
# Table name: users_playlists
#
#  id          :bigint           not null, primary key
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#  playlist_id :bigint
#  user_id     :bigint
#
# Indexes
#
#  index_users_playlists_on_playlist_id  (playlist_id)
#  index_users_playlists_on_user_id      (user_id)
#

class UsersPlaylist < ApplicationRecord
  belongs_to :user
  belongs_to :playlist, class_name: 'Playlists::Personal', foreign_key: :playlist_id
end
