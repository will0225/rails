class AudioFilesController < ActionController::Base
  def show
    file = Audio.find_by_id(params[:audio_id]).file
    url = params[:version] == 'mp3' ? file.mp3.url : file.wav.url

    bucket = url.split('/')[2].split('.')[0]
    key    = url.split('/')[3..-1].join('/')

    resource = Aws::S3::Resource.new(
      region:            Rails.application.credentials.AWS_REGION,
      access_key_id:     Rails.application.credentials.AWS_ACCESS_KEY_ID,
      secret_access_key: Rails.application.credentials.AWS_SECRET_ACCESS_KEY
    )
    url_options = {
      expires_in:                   5.minutes.to_i,
      response_content_disposition: "attachment"
    }
    object = resource.bucket(bucket).object(key)
    download_link = object.presigned_url(:get, url_options)

    redirect_to download_link
  end
end
