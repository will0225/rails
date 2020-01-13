class ImageUploader < BaseUploader
  include CarrierWave::RMagick

  def extension_whitelist
    %w(jpg jpeg gif png)
  end

  version :medium do
    process :resize_to_limit => [266, 266]
  end

  version :small do
    process :resize_to_limit => [80, 80]
  end
end
