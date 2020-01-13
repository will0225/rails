json.(song, :id, :title, :bpm, :hot, :image, :tag_names)
json.audio do
  json.(song.audio, :id, :type, :duration)
end

json.(song.audio.file, :url)

json.participants do
  json.array! song.participants do |participant|
    json.partial! "api/v1/participants/participant_small", participant: participant
  end
end
