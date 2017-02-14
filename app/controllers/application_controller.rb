class ApplicationController < ActionController::Base
  protect_from_forgery with: :exception
  
  def current_user
    p session
    @current_user ||= User.find session[:user_id] if session[:user_id]
  end

  def authenticate_user!
    redirect_to signin_path unless current_user.present?
  end

  def authenticate_admin!
    redirect_to root_path unless current_user.admin?
  end

  def signed_in?
  	current_user.present?
  end

  def is_admin?
  	signed_in? && current_user.admin
  end
 
end
