class Api::V1::UsersPlaylistsController < Api::V1::BaseController
  before_action :find_playlist, only: [:create, :destroy]

  def create
    if @playlist.user_id != current_user.id && !current_user.shared_playlists.include?(@playlist)
      current_user.shared_playlists << @playlist
      render 'api/v1/playlists/show'
    else
      render_error(422, 'Unprocessable Entity', 'Cannot add this playlist')
    end
  end

  def destroy
    if current_user.shared_playlists.delete(@playlist)
      render 'api/v1/playlists/show'
    else
      render_error(422, 'Unprocessable Entity', 'Cannot remove this playlist')
    end
  end

  private

  def find_playlist
    @playlist = if params[:token].present?
                  Playlist.find_by_token(params[:token])
                elsif params[:id].present?
                  Playlist.find_by_id(params[:id])
                end

    unless @playlist.present?
      render_error(404, 'Not Found', 'Cannot find this playlist')
    end
  end
end