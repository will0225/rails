module ApiAuthentications
  class Email < Base
    def authenticate
      @user = User.find_by_username(@user_params[:username])
      if @user && @user.valid_password?(@user_params[:password])
        @session = @user.sessions.build(@session_params)
        @user.save
      else
        @errors << 'Username/Password combination is incorrect'
      end
      @errors.empty?
    end
  end
end
