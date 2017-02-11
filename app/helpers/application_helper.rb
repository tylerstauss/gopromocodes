module ApplicationHelper
	def canonical(url)
  	content_for(:canonical, tag(:link, :rel => :canonical, :href => url)) if url
	end

	def current_user
    @current_user ||= User.find session[:user_id] if session[:user_id]
  end
  
  def authenticate_user!
    redirect_to new_session_path unless current_user.present?
  end

  def signed_in?
  	current_user.present?
  end

  def is_admin?
    signed_in? && current_user.admin
  end
end
