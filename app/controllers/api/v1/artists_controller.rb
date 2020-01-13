class Api::V1::ArtistsController < Api::V1::BaseController
  before_action :set_artist, only: [:show]

  def show; end

  private

  def set_artist
    @artist = Artist.find(params[:id])
  end
end
