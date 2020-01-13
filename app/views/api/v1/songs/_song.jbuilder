json.(song, :id, :title, :bpm, :hot, :image, :genres, :moods, :instruments, :version)
json.audio do
  json.partial! "api/v1/songs/audio", audio: song.audio if song.audio
end

json.time_markers do
  json.array! song.time_markers do |time_marker|
    json.partial! "api/v1/songs/time_marker", time_marker: time_marker
  end
end

json.participants do
  json.array! song.participants do |participant|
    json.partial! "api/v1/participants/participant_small", participant: participant
  end
end

json.versions do
  json.array! song.related_versions do |song|
    json.partial! 'api/v1/songs/song_version', song: song
  end
end