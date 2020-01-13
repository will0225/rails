json.(audio, :id, :type, :file, :duration, :waveform)

json.download_mp3 audio_file_url(audio_id: audio.id, version: :mp3)
json.download_wav audio_file_url(audio_id: audio.id, version: :wav)
