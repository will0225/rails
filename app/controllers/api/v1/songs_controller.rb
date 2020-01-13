  class Api::V1::SongsController < Api::V1::BaseController
  before_action :set_song, only: [:show]

  def show; end

  def index
    songs = params[:hot] ? Song.hot.with_includings : Song.all.with_includings
    @songs = songs.search(search_params).page(params[:page])
  end

  private

  def search_params
    params.permit(
      :min_tempo,
      :max_tempo,
      :hot,
      :title,
      :artist_id,
      tags_ids: [],
      versions: []
    )
  end

  def set_song
    @song = Song.find(params[:id])
  end
end
