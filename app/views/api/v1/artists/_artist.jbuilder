json.(artist, :id, :name, :image, :bio, :roles)
json.songs do
  json.array! artist.songs do |song|
    json.partial! "api/v1/songs/song_medium", song: song
  end
end
