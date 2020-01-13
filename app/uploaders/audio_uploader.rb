class AudioUploader < BaseUploader
  def extension_whitelist
    %w(wav mp3)
  end

  version :compressed_mp3 do
    process :compress
    process :set_content_type

    def set_content_type(*args)
      self.file.instance_variable_set(:@content_type, "audio/mp3")
    end

    def compress
      temp_path = Tempfile.new(["compressed_" + File.basename(current_path), '.mp3']).path

      `ffmpeg -i #{current_path} -b:a 96k -map a #{temp_path} -y`

      File.unlink(current_path)
      FileUtils.mv(temp_path, current_path)
    end

    def full_filename(for_file)
      "#{super.chomp(File.extname(super))}.mp3"
    end
  end

  version :mp3 do
    process :convert_to_mp3
    process :set_content_type

    def set_content_type(*args)
      self.file.instance_variable_set(:@content_type, "audio/mp3")
    end

    def convert_to_mp3
      temp_path = Tempfile.new(["original_" + File.basename(current_path), '.mp3']).path

      `ffmpeg -i #{current_path} -b:a 384k -map a #{temp_path} -y`

      File.unlink(current_path)
      FileUtils.mv(temp_path, current_path)
    end

    def full_filename(for_file)
      "#{super.chomp(File.extname(super))}.mp3"
    end
  end

  version :wav do
    process :convert_to_wav
    process :set_content_type

    def set_content_type(*args)
      self.file.instance_variable_set(:@content_type, "audio/wav")
    end

    def convert_to_wav
      unless file.extension == "wav"
        temp_path = Tempfile.new(["original_" + File.basename(current_path), '.wav']).path

        `ffmpeg -i #{current_path} -acodec pcm_s16le -ac 2 -ar 32000 -f wav #{temp_path} -y`

        File.unlink(current_path)
        FileUtils.mv(temp_path, current_path)
      end
    end

    def full_filename(for_file)
      "#{super.chomp(File.extname(super))}.wav"
    end
  end
end
