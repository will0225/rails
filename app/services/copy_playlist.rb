class CopyPlaylist
  include Concerns::Service
  
  attr_reader :original_playlist, :copied_playlist, :user

  def initialize(original_playlist_id, user)
    @original_playlist = Playlist.find(original_playlist_id)
    @copied_playlist   = user.playlists.build(
      duration: @original_playlist.duration,
      image:    @original_playlist.image,
      title:    @original_playlist.title,
      token:    @original_playlist.token
    )
  end

  def call
    build_copied_playlist

    if copied_playlist.save
      { playlist: copied_playlist }
    else
      { error: copied_playlist.errors.full_messages.join(", ") }
    end
  end

  def build_copied_playlist
    original_playlist.playlists_songs.each do |playlist_song|
      copied_playlist.playlists_songs.build(
        position: playlist_song.position,
        song_id:  playlist_song.song_id
      )
    end
  end
end
