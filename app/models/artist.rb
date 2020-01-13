# == Schema Information
#
# Table name: artists
#
#  id         :bigint           not null, primary key
#  bio        :text
#  image      :string
#  name       :string
#  created_at :datetime         not null
#  updated_at :datetime         not null
#

class Artist < ApplicationRecord
  has_many :participants
  has_many :songs, -> { distinct }, through: :participants

  validates :name, :bio, presence: true

  mount_uploader :image, ImageUploader

  def roles
    participants.pluck(:role).uniq
  end
end
