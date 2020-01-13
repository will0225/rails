class ApiAuthentication
  attr_accessor :user, :session, :errors

  PROVIDERS = {
    email: ApiAuthentications::Email
  }.freeze

  def initialize(options, provider_name = "email")
    @provider_klass = PROVIDERS[provider_name.to_sym]
    @options = options
    @errors = []
  end

  def authenticate
    @provider = @provider_klass.new(@options)
    if @provider.authenticate
      @user = @provider.user
      @session = @provider.session
    else
      @errors = @provider.errors
    end
    @errors.empty?
  end
end
