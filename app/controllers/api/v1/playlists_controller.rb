class Api::V1::PlaylistsController < Api::V1::BaseController
  before_action :set_playlists, only: [:index]
  before_action :set_playlist, only: [:show, :update, :destroy]

  def index; end

  def show; end

  def create
    @playlist = current_user.playlists.create(playlist_params)

    if @playlist.errors.empty?
      render 'api/v1/playlists/show'
    else
      render_error(422, 'NotValid', @playlist.errors.full_messages.join('; '))
    end

  end

  def update
    @playlist.update(playlist_params)

    if @playlist.errors.empty?
      render 'api/v1/playlists/show'
    else
      render_error(422, 'NotValid', @playlist.errors.full_messages.join('; '))
    end
  end

  def copy
    result = CopyPlaylist.call(params[:id], current_user)

    unless result[:error]
      @playlist = result[:playlist]
      render 'api/v1/playlists/show'
    else
      render_error(422, 'NotValid', result[:error])
    end
  end

  def destroy
    @playlist.destroy
    render json: { id: @playlist.id }
  end

  private

  def playlist_params
    params.permit(
      :title,
      :image
    )
  end

  def filter_params
    params.permit(
      :hot,
      :personal
    )
  end

  def set_playlist
    @playlist = current_user.playlists.find(params[:id])
  end

  def set_playlists
    if filter_params[:hot]
      @playlists = Playlists::Hot.all
    else
      @my_playlists = current_user.playlists.includes(songs: :audio)
      @shared_playlists = current_user.shared_playlists.includes(songs: :audio)
      @playlists = @my_playlists + @shared_playlists
    end
  end
end
