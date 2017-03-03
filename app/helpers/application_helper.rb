module ApplicationHelper


	def current_user
    @current_user ||= User.find session[:user_id] if session[:user_id]
  end
  
  def authenticate_user!
    p 'current_user:'
    p current_user
    redirect_to signin_path unless current_user.present?
    redirect_to new_session_path unless current_user.present?
  end

  def signed_in?
  	current_user.present?
  end

  def is_admin?
    signed_in? && current_user.admin
  end

  def canonical(url)
    content_for(:canonical, tag(:link, :rel => :canonical, :href => url)) if url
  end

  def title(text)
    content_for(:title, text)
  end

  def description(text)
    content_for(:description, text)
  end

  def meta_tag(tag, text)
    content_for :"meta_#{tag}", text
  end

  def yield_meta_tag(tag, default_text='')
    content_for?(:"meta_#{tag}") ? content_for(:"meta_#{tag}") : default_text
  end
end
