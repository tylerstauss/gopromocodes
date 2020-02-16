class LoginsController < ApplicationController
  def new
  end

  def create
    if @user = authenticate_with_google
      session[:user_id] = @user.id
      redirect_to user_path(@user)
    else
      redirect_to new_session_url, alert: 'authentication_failed'
    end
  end

  private
    def authenticate_with_google
      if id_token = flash[:google_sign_in_token]
       user =  User.find_by google_id: GoogleSignIn::Identity.new(id_token).user_id
       if user
        p 'user found by google ID returning user'
        return user
      else
        p 'creating user'
        # @user = User.new
        user_params = {"email"=>GoogleSignIn::Identity.new(id_token).email_address, "username"=>GoogleSignIn::Identity.new(id_token).name, "google_id" => GoogleSignIn::Identity.new(id_token).user_id}
        p user_params
        user = User.create!(user_params)
        return user
      end

      elsif error = flash[:google_sign_in][:error]
        logger.error "Google authentication error: #{error}"
        nil
      end
    end
end