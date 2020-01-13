json.(participant, :id, :role)
json.contribution_percentage participant.contribution_percentage if participant.contributor?

json.artist do
  json.partial! 'api/v1/artists/artist', artist: participant.artist
end
