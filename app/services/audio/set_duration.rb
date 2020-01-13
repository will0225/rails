class Audio::SetDuration
  include Concerns::Service

  attr_reader :audio_model
  attr_reader :audio_path

  def initialize(audio_model)
    @audio_model = audio_model
  end

  def call
    if audio_model.file.mp3._storage == CarrierWave::Storage::File
      @audio_path = File.join(Rails.root, "public", audio_model.file.compressed_mp3.url)

      calculate_duration
    else
      local_resource = LocalResource.new(URI.parse(audio_model.file.compressed_mp3.url))
      local_copy_of_audio = local_resource.file
      @audio_path = local_copy_of_audio.path

      calculate_duration

      local_copy_of_audio.close
      local_copy_of_audio.unlink
    end

  rescue OpenURI::HTTPError => e
    Rails.logger.debug "Error occurs during fetching remote file."
  end

  private

  def calculate_duration
    ::TagLib::FileRef.open(audio_path) do |audio|
      audio_model.update_column(:duration, audio.audio_properties.length) unless audio.null?
    end
  end
end
