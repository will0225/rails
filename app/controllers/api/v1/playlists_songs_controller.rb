class Api::V1::PlaylistsSongsController < Api::V1::BaseController
  before_action :find_playlist, only: [:create, :destroy]

  def create
    @playlists_song = PlaylistsSong.create(playlists_song_params)

    if @playlists_song.errors.empty?
      render 'api/v1/playlists/show'
    else
      render_error(422, 'NotValid', @playlists_song.errors.full_messages.join('; '))
    end

  end

  def destroy
    @playlists_song = current_user.playlists_songs.where(playlists_song_params).first
    if @playlists_song && @playlists_song.destroy
      render 'api/v1/playlists/show'
    else
      render_error(422, 'NotDestroyed', 'The song was not found in this playlist.')
    end
  end

  private

  def playlists_song_params
    params.require(:playlists_song).permit(
      :playlist_id,
      :song_id
    )
  end

  def find_playlist
    @playlist = Playlists::Personal.find_by_id(params[:playlists_song][:playlist_id])
  end
end
