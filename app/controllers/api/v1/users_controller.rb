class Api::V1::UsersController < Api::V1::BaseController
  skip_before_action :current_user

  def show; end

  def update
    current_user.update(user_params)
    render :show
  end

  private

  def user_params
    params.permit(
      :username,
      :password,
      :email,
      :image
    )
  end
end
