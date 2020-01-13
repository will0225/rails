class JWTService
  ENCRYPT_ALGORITHM = 'HS256'

  def self.decode_user_from_token(token)
    begin
      decoded = JWT.decode token, Rails.application.credentials.super_secret
      User.find decoded.first['id']
    rescue JWT::ExpiredSignature, JWT::DecodeError => error
      nil
    end
  end

  def self.generate_token(user)
    data = { id: user.id, exp: (Time.zone.now + Session::TIMEOUT).to_i }
    JWT.encode data, Rails.application.credentials.super_secret, ENCRYPT_ALGORITHM
  end
end
