class ApplicationController < ActionController::Base
  before_action :redirect_subdomain
  protect_from_forgery with: :exception

  def redirect_subdomain
    if request.host == 'gopromocodes.com'
      redirect_to 'http://www.gopromocodes.com' + request.fullpath, :status => 301
    end
  end

  
  
  def current_user
    @current_user ||= User.find session[:user_id] if session[:user_id]
  end

  def authenticate_user!
    redirect_to signin_path unless current_user.present?
  end

  def authenticate_admin!
    p 'current_user:'
    p current_user
    if current_user
      redirect_to root_path unless current_user.admin?
    else
      redirect_to signin_path 
    end
    
  end

  def signed_in?
  	current_user.present?
  end

  def is_admin?
  	signed_in? && current_user.admin
  end
 
end
