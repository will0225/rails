# == Schema Information
#
# Table name: users
#
#  id                 :bigint           not null, primary key
#  email              :string
#  encrypted_password :string           default(""), not null
#  image              :string
#  type               :string           default(""), not null
#  username           :string           default(""), not null
#  created_at         :datetime         not null
#  updated_at         :datetime         not null
#
# Indexes
#
#  index_users_on_email     (email) UNIQUE
#  index_users_on_username  (username) UNIQUE
#

class User < ApplicationRecord
  has_many :sessions, dependent: :destroy
  has_many :playlists, class_name: 'Playlists::Personal', dependent: :destroy
  has_many :playlists_songs, through: :playlists, dependent: :destroy
  has_many :songs, -> { distinct }, through: :playlists
  has_many :users_playlists, dependent: :destroy
  has_many :shared_playlists, through: :users_playlists, source: :playlist, dependent: :destroy

  validates :username, presence: true, uniqueness: true
  validates :email, uniqueness: true, allow_nil: true

  devise :database_authenticatable, :validatable

  mount_uploader :image, ImageUploader

  def email_required?
    false
  end

  def email_changed?
    false
  end
end
