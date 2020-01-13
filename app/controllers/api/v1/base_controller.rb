class Api::V1::BaseController < ApplicationController
  SessionError = Class.new(StandardError)
  rescue_from SessionError,                       with: :render_unauthorized
  rescue_from ActiveRecord::RecordNotFound,       with: :render_not_found
  rescue_from ActionController::ParameterMissing, with: :render_parameter_missing

  before_action :current_user
  respond_to :json

  def set_locale
    I18n.locale = params[:locale] || I18n.default_locale
  end

  def current_user
    @current_user ||= current_session.try(:user)
  end

  protected

  def current_session
    @current_session ||= get_session
  end

  def get_session
    session = Session.not_expired.find_by(access_token: request.headers['Access-Token'])
    raise SessionError unless session

    set_access_token_to_header(session) if session.touch
    session
  end

  def set_access_token_to_header(session)
    response.headers['Access-Token'] = session.access_token
  end

  def render_forbidden(message)
    render_error(403, 'Forbidden', message)
  end

  def render_not_found(error)
    render_error(404, 'NotFound', error.message.sub(/ with.*/, ''))
  end

  def render_unauthorized()
    render_error(401, 'Unauthorized', I18n.t('controllers.base.session_expired'))
  end

  def render_parameter_missing(error)
    render_error(422, 'ParameterMissing', error.message)
  end

  def render_error(status, type, message)
    json = { type: type, message: message }
    render json: json, status: status
  end

  def render_success(message)
    json = { message: message }
    render json: json, status: 200
  end
end
