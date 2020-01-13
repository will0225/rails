module ApiAuthentications
  class Base
    attr_accessor :user, :session, :errors

    BaseError = Class.new(StandardError)
    AuthentificationError = Class.new(BaseError)

    def initialize(options)
      @user_params = options[:user]
      @session_params = options[:session]
      @errors = []
    end
  end
end
