# == Schema Information
#
# Table name: version_connections
#
#  id         :bigint           not null, primary key
#  title      :string
#  created_at :datetime         not null
#  updated_at :datetime         not null
#

class VersionConnection < ApplicationRecord
  has_many :songs
end
