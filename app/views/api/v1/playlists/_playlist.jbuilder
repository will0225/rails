json.(playlist, :id, :title, :image, :token, :type, :duration, :user_id)

json.songs do
  json.array! playlist.songs do |song|
    json.partial! "api/v1/songs/song", song: song
  end
end
