class Api::V1::PasswordsController < Api::V1::BaseController
  skip_before_action :current_user

  def update
    if current_user.valid_password?(params[:old_password])
      current_user.update(password: params[:new_password])
    end
    
    render json: { message: 'Password changed' }
  end
end
