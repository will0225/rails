json.songs do
  json.array! @songs do |song|
    #json.partial! "api/v1/songs/song_small", song: song
    json.partial! "api/v1/songs/song", song: song
  end
end

json.pagination do
  json.partial! 'api/v1/shared/pagination', collection: @songs
end