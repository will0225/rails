class Api::V1::SessionsController < Api::V1::BaseController
  skip_before_action :current_user

  def create
    authentication = ApiAuthentication.new(authentication_params)
    if authentication.authenticate
      @current_session = authentication.session
      @current_user = authentication.user
      set_access_token_to_header(@current_session)
      render 'api/v1/users/show'
    else
      render_error(422, 'NotValid', authentication.errors.join('; '))
    end
  end

  def destroy
    current_session.destroy
    render_success(I18n.t('controllers.sessions.destroyed'))
  end

  private

  def authentication_params
    {
      user: user_params,
      session: {},
    }
  end

  def user_params
    params.require(:user).permit(
      :username,
      :password
    )
  end
end
