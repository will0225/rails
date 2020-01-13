# == Schema Information
#
# Table name: sessions
#
#  id           :bigint           not null, primary key
#  access_token :string
#  created_at   :datetime         not null
#  updated_at   :datetime         not null
#  user_id      :bigint
#
# Indexes
#
#  index_sessions_on_user_id  (user_id)
#
# Foreign Keys
#
#  fk_rails_...  (user_id => users.id)
#

class Session < ApplicationRecord
  TIMEOUT = 2.months

  belongs_to :user

  before_create :set_access_token

  scope :not_expired, -> { where('updated_at > ?', Time.current - TIMEOUT) }
  scope :expired, -> { where('updated_at < ?', Time.current - TIMEOUT) }

  def set_access_token
    self.access_token = JWTService.generate_token(user)
  end
end
