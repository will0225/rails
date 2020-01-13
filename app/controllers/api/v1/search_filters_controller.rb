class Api::V1::SearchFiltersController < Api::V1::BaseController
  skip_before_action :current_user

  def index
    @genres = Tag.where(type: 'Tags::Genre')
    @moods = Tag.where(type: 'Tags::Mood')
    @instruments = Tag.where(type: 'Tags::Instrument')
  end
end
