RailsAdmin.config do |config|
  config.authenticate_with do
    warden.authenticate! scope: :admin
  end

  config.current_user_method(&:current_admin)

  config.show_gravatar = false

  config.actions do
    dashboard                     # mandatory
    index                         # mandatory
    new
    export
    bulk_delete
    show
    edit
    delete
    show_in_app
  end

  TAGS = ['Tags::Mood', 'Tags::Instrument', 'Tags::Genre']

  config.included_models = [
    'Users::Customer',
    'Users::Admin',
    'Artist',
    'Participant',
    'ParticipantWithoutContribution',
    'Song',
    'Audio',
    'Playlists::Hot',
    'TimeMarker',
    'VersionConnection'
  ] + TAGS

  TAGS.each do |tag|
    config.model tag do
      exclude_fields :type
    end
  end

  config.model 'Users::Customer' do
    field :username
    field :password
    field :image, :carrierwave
  end

  config.model 'Users::Admin' do
    field :username
    field :password
    field :image, :carrierwave
  end

  config.model 'Artist' do
    field :name
    field :image, :carrierwave
    field :bio
  end

  config.model 'Participant' do
    visible false
    exclude_fields :role, :song
  end

  config.model 'ParticipantWithoutContribution' do
    visible false
    exclude_fields :contribution_percentage, :role, :song
  end

  config.model 'Audio' do
    visible false
    field :file, :carrierwave
  end

  config.model 'VersionConnection' do
    field :title
    field :songs
  end

  config.model 'Song' do
    field :title
    field :image, :carrierwave
    field :position
    field :version
    field :version_connection
    field :audio
    field :bpm
    field :hot
    field :moods
    field :genres
    field :instruments
    field :producers
    field :performers
    field :additional_musicians
    field :songwriters
    field :publishers
    field :time_markers
  end

  config.model 'Playlists::Hot' do
    field :title do 
      required true
    end
    field :image do 
      required true
    end
    field :position
    field :songs do 
      required true
    end
  end

  config.model 'TimeMarker' do
    visible false
    field :name
    field :time do
      label 'Time (in seconds)'
    end
  end
end
