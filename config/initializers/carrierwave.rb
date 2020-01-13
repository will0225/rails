CarrierWave.configure do |config|
  config.fog_credentials = {
    provider:              'AWS',
    aws_access_key_id:     Rails.application.credentials.AWS_ACCESS_KEY_ID,
    aws_secret_access_key: Rails.application.credentials.AWS_SECRET_ACCESS_KEY,
    region:                Rails.application.credentials.AWS_REGION
  }
  config.fog_directory  = 'noteworthy-assets'
  Rails.env.test? || Rails.env.development? ? config.storage(:file) : config.storage(:fog)
end
