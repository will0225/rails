json.array! @playlists do |playlist|
  json.partial! 'api/v1/playlists/playlist', playlist: playlist
end